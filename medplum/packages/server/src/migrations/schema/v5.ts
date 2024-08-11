/*
 * Generated by @medplum/generator
 * Do not edit manually.
 */

import { PoolClient } from 'pg';

export async function run(client: PoolClient): Promise<void> {
  await client.query('ALTER TABLE "Account" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ActivityDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "AdverseEvent" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "AllergyIntolerance" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Appointment" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "AppointmentResponse" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "AuditEvent" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Basic" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Binary" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "BiologicallyDerivedProduct" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "BodyStructure" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Bundle" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "CapabilityStatement" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "CarePlan" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "CareTeam" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "CatalogEntry" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ChargeItem" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ChargeItemDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Claim" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ClaimResponse" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ClinicalImpression" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "CodeSystem" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Communication" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "CommunicationRequest" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "CompartmentDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Composition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ConceptMap" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Condition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Consent" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Contract" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Coverage" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "CoverageEligibilityRequest" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "CoverageEligibilityResponse" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "DetectedIssue" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Device" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "DeviceDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "DeviceMetric" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "DeviceRequest" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "DeviceUseStatement" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "DiagnosticReport" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "DocumentManifest" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "DocumentReference" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "EffectEvidenceSynthesis" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Encounter" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Endpoint" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "EnrollmentRequest" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "EnrollmentResponse" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "EpisodeOfCare" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "EventDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Evidence" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "EvidenceVariable" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ExampleScenario" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ExplanationOfBenefit" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "FamilyMemberHistory" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Flag" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Goal" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "GraphDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Group" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "GuidanceResponse" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "HealthcareService" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ImagingStudy" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Immunization" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ImmunizationEvaluation" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ImmunizationRecommendation" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ImplementationGuide" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "InsurancePlan" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Invoice" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Library" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Linkage" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "List" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Location" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Measure" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MeasureReport" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Media" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Medication" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MedicationAdministration" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MedicationDispense" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MedicationKnowledge" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MedicationRequest" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MedicationStatement" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MedicinalProduct" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MedicinalProductAuthorization" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query(
    'ALTER TABLE "MedicinalProductContraindication" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE'
  );
  await client.query('ALTER TABLE "MedicinalProductIndication" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MedicinalProductIngredient" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MedicinalProductInteraction" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MedicinalProductManufactured" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MedicinalProductPackaged" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query(
    'ALTER TABLE "MedicinalProductPharmaceutical" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE'
  );
  await client.query(
    'ALTER TABLE "MedicinalProductUndesirableEffect" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE'
  );
  await client.query('ALTER TABLE "MessageDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MessageHeader" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "MolecularSequence" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "NamingSystem" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "NutritionOrder" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Observation" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ObservationDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "OperationDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "OperationOutcome" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Organization" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "OrganizationAffiliation" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Parameters" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Patient" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "PaymentNotice" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "PaymentReconciliation" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Person" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "PlanDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Practitioner" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "PractitionerRole" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Procedure" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Provenance" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Questionnaire" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "QuestionnaireResponse" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "RelatedPerson" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "RequestGroup" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ResearchDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ResearchElementDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ResearchStudy" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ResearchSubject" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "RiskAssessment" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "RiskEvidenceSynthesis" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Schedule" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "SearchParameter" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ServiceRequest" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Slot" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Specimen" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "SpecimenDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "StructureDefinition" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "StructureMap" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Subscription" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Substance" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "SubstanceNucleicAcid" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "SubstancePolymer" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "SubstanceProtein" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "SubstanceReferenceInformation" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "SubstanceSourceMaterial" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "SubstanceSpecification" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "SupplyDelivery" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "SupplyRequest" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Task" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "TerminologyCapabilities" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "TestReport" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "TestScript" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ValueSet" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "VerificationResult" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "VisionPrescription" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Project" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ClientApplication" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "User" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "ProjectMembership" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Bot" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "Login" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "PasswordChangeRequest" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
  await client.query('ALTER TABLE "JsonWebKey" ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT FALSE');
}
