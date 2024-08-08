import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Interoperabilita',
    Svg: require('@site/static/img/undraw_connected_world.svg').default,
    description: (
      <>
        DigiMedic FHIR Backend zajišťuje bezproblémovou výměnu zdravotnických dat
        mezi různými systémy pomocí standardu HL7 FHIR.
      </>
    ),
  },
  {
    title: 'Bezpečnost',
    Svg: require('@site/static/img/undraw_security.svg').default,
    description: (
      <>
        Implementujeme nejmodernější bezpečnostní opatření včetně šifrování AES-256
        a OAuth 2.0 pro ochranu citlivých zdravotnických dat.
      </>
    ),
  },
  {
    title: 'České zdravotnictví',
    Svg: require('@site/static/img/undraw_medical_care.svg').default,
    description: (
      <>
        Plně přizpůsobeno požadavkům českého zdravotnictví s integrací na národní
        registry a systémy jako eRecept a ISIN.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
