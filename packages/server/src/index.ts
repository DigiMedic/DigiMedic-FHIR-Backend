/**
 * DigiMedic FHIR Backend Server
 * 
 * Hlavní entry point pro DigiMedic FHIR server, který rozšiřuje Medplum server
 * o české FHIR profily, integrace, lokalizaci, a další specifické funkcionality
 * pro české zdravotnictví.
 * 
 * @copyright DigiMedic 2025
 * @license Apache-2.0
 */

import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { pino } from 'pino';
import { MedplumServerConfig, initApp, initServer } from '@medplum/core';
import { Pool } from 'pg';
import { createClient } from 'redis';
import { readFileSync } from 'fs';
import { join } from 'path';
import { createServer } from 'http';
import * as CzProfiles from '@digimedic/cz-profiles';
import * as CzIntegrations from '@digimedic/cz-integrations';
import { getTranslation } from '@digimedic/cz-i18n';

// Inicializace loggeru
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

// Konfigurace serveru
const config: MedplumServerConfig = {
  port: parseInt(process.env.PORT || '8103', 10),
  baseUrl: process.env.MEDPLUM_BASE_URL || 'http://localhost:8103/',
  issuer: process.env.MEDPLUM_ISSUER || 'https://auth.digimedic.cz/',
  audience: process.env.MEDPLUM_AUDIENCE || 'https://api.digimedic.cz/',
  
  // Databázové připojení
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    database: process.env.POSTGRES_DATABASE || 'medplum',
    username: process.env.POSTGRES_USERNAME || 'medplum',
    password: process.env.POSTGRES_PASSWORD || 'medplum',
    ssl: process.env.POSTGRES_SSL === 'true',
    poolSize: parseInt(process.env.POSTGRES_POOL_SIZE || '10', 10),
  },
  
  // Redis cache
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
  },
  
  // Podpora pro české certifikáty
  tlsOptions: process.env.TLS_CERT_PATH ? {
    cert: readFileSync(process.env.TLS_CERT_PATH),
    key: readFileSync(process.env.TLS_KEY_PATH || ''),
    passphrase: process.env.TLS_KEY_PASSPHRASE,
    ca: process.env.TLS_CA_PATH ? readFileSync(process.env.TLS_CA_PATH) : undefined,
  } : undefined,
  
  // Konfigurace emailů
  email: {
    fromAddress: process.env.EMAIL_FROM || 'no-reply@digimedic.cz',
    fromName: process.env.EMAIL_FROM_NAME || 'DigiMedic',
    apiKey: process.env.EMAIL_API_KEY,
    region: process.env.EMAIL_REGION || 'eu-central-1',
  },
  
  // Konfigurace úložiště
  storage: {
    binary: {
      driver: 's3',
      bucket: process.env.STORAGE_BUCKET || 'digimedic-fhir-storage',
      region: process.env.STORAGE_REGION || 'eu-central-1',
    },
  },
  
  // Konfigurace podpory pro české FHIR profily
  fhir: {
    // Přidání českých profilů do validátoru
    profileResources: Object.values(CzProfiles.profiles),
    
    // Přidání českých extensions do validátoru
    extensionResources: Object.values(CzProfiles.extensions),
    
    // Podpora pro české kódovníky
    supportedCodeSystems: [
      'http://www.sukl.cz/sukl-list-of-medicinal-products',
      'https://hl7.cz/fhir/sid/cz/rcis',
      'https://hl7.cz/fhir/sid/cz/cip',
      'https://hl7.cz/fhir/sid/cz/ico',
      'https://hl7.cz/fhir/sid/cz/uzis',
    ],
  },
  
  // Konfigurace logování
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    destination: process.env.LOG_DESTINATION || 'stdout',
  },
};

// Inicializace databázového poolu
let pool: Pool | undefined;
async function initDatabase(): Promise<Pool> {
  if (!pool) {
    pool = new Pool({
      host: config.database.host,
      port: config.database.port,
      database: config.database.database,
      user: config.database.username,
      password: config.database.password,
      ssl: config.database.ssl ? {
        rejectUnauthorized: false,
      } : undefined,
      max: config.database.poolSize,
    });
    
    // Test připojení
    try {
      const client = await pool.connect();
      logger.info('Databázové připojení úspěšně navázáno');
      client.release();
    } catch (err) {
      logger.error('Chyba při připojení k databázi', err);
      throw err;
    }
  }
  
  return pool;
}

// Inicializace Redis klienta
let redisClient: any;
async function initRedis(): Promise<any> {
  if (!redisClient) {
    redisClient = createClient({
      url: `redis://${config.redis.password ? `:${config.redis.password}@` : ''}${config.redis.host}:${config.redis.port}`,
    });
    
    redisClient.on('error', (err: Error) => {
      logger.error('Redis chyba', err);
    });
    
    redisClient.on('connect', () => {
      logger.info('Redis připojení úspěšně navázáno');
    });
    
    await redisClient.connect();
  }
  
  return redisClient;
}

// Inicializace českých integrací
async function initCzechIntegrations(): Promise<void> {
  // Inicializace eRecept klienta
  if (process.env.EERECEPT_CERT_PATH) {
    try {
      const eReceptClient = new CzIntegrations.EreceptClient({
        environment: (process.env.EERECEPT_ENV || 'test') as 'production' | 'test',
        certPath: process.env.EERECEPT_CERT_PATH,
        certPassword: process.env.EERECEPT_CERT_PASSWORD || '',
        keyPath: process.env.EERECEPT_KEY_PATH || process.env.EERECEPT_CERT_PATH,
        keyPassword: process.env.EERECEPT_KEY_PASSWORD || process.env.EERECEPT_CERT_PASSWORD || '',
        doctorId: process.env.EERECEPT_DOCTOR_ID || '',
        doctorPassword: process.env.EERECEPT_DOCTOR_PASSWORD || '',
        facilityId: process.env.EERECEPT_FACILITY_ID || '',
        caCertPath: process.env.EERECEPT_CA_CERT_PATH,
        timeout: parseInt(process.env.EERECEPT_TIMEOUT || '30000', 10),
        proxy: process.env.EERECEPT_PROXY,
      });
      
      logger.info('eRecept klient úspěšně inicializován');
      
      // Globální přístup k eRecept klientovi
      (global as any).eReceptClient = eReceptClient;
    } catch (err) {
      logger.error('Chyba při inicializaci eRecept klienta', err);
    }
  }
  
  // Inicializace ISIN klienta (TODO)
  
  // Inicializace NZIS klienta (TODO)
  
  // Inicializace NCPeH klienta (TODO)
}

// Vytvoření Express aplikace
async function createApp(): Promise<Express> {
  // Inicializace databáze a Redis
  await initDatabase();
  await initRedis();
  
  // Inicializace českých integrací
  await initCzechIntegrations();
  
  // Vytvoření Express aplikace
  const app = express();
  
  // Základní middleware
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  
  // Middleware pro české lokalizace
  app.use((req: Request, res: Response, next: NextFunction) => {
    const lang = req.headers['accept-language'] || 'cs';
    res.locals.t = (key: string, options?: any) => getTranslation(key, lang, options);
    next();
  });
  
  // Middleware pro české certifikáty a mTLS
  if (process.env.REQUIRE_CLIENT_CERTS === 'true') {
    app.use((req: Request, res: Response, next: NextFunction) => {
      const clientCert = (req as any).connection.getPeerCertificate();
      if (!clientCert || Object.keys(clientCert).length === 0) {
        res.status(403).send('Klientský certifikát je vyžadován');
        return;
      }
      next();
    });
  }
  
  // Middleware pro české specifické hlavičky
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-DigiMedic-Version', process.env.npm_package_version || '0.1.0');
    next();
  });
  
  // Healthcheck endpoint
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.json({
      ok: true,
      version: process.env.npm_package_version || '0.1.0',
      postgres: !!pool,
      redis: redisClient?.isReady || false,
    });
  });
  
  // Inicializace Medplum aplikace
  const medplumApp = await initApp(config);
  app.use(medplumApp);
  
  // Rozšíření o české API endpoints
  app.use('/api/erecept', require('./api/erecept').default);
  app.use('/api/isin', require('./api/isin').default);
  app.use('/api/nzis', require('./api/nzis').default);
  
  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error('Server error', err);
    res.status(500).json({
      error: err.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
  });
  
  return app;
}

// Spuštění serveru
async function startServer(): Promise<Server> {
  const app = await createApp();
  const server = createServer(app);
  
  return new Promise((resolve) => {
    server.listen(config.port, () => {
      logger.info(`DigiMedic FHIR Backend běží na portu ${config.port}`);
      resolve(server);
    });
  });
}

// Spuštění serveru při přímém spuštění souboru
if (require.main === module) {
  startServer().catch((err) => {
    logger.error('Chyba při spuštění serveru', err);
    process.exit(1);
  });
}

// Export pro testování a importování
export { config, createApp, startServer, initDatabase, initRedis, initCzechIntegrations };
export default startServer;
