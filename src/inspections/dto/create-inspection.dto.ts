import { IsEnum, IsString } from 'class-validator';
import { InspectionStatus } from '../interfaces/inspection.interface';

export class CreateInspectionDto {
  @IsString()
  name: string;

  @IsEnum(InspectionStatus)
  status: InspectionStatus;
}