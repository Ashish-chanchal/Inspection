import { IsEnum } from 'class-validator';
import { InspectionStatus } from '../interfaces/inspection.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInspectionDto {
  @ApiProperty({
    description: 'Status of the inspection item',
    enum: InspectionStatus,
    enumName: 'InspectionStatus',
    example: InspectionStatus.PENDING,
    type: String,
  })
  @IsEnum(InspectionStatus, { message: 'Status must be one of: pending, passed, failed, na' })
  status: InspectionStatus;
}