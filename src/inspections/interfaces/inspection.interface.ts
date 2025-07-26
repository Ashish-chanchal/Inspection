export enum InspectionStatus {
  PENDING = 'pending',
  PASSED = 'passed',
  FAILED = 'failed',
  NA = 'na',
}

export interface Inspection {
  id: string;
  name: string;
  status: InspectionStatus;
}