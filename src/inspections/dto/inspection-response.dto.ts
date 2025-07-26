import { ApiProperty } from '@nestjs/swagger';
import { InspectionStatus } from '../interfaces/inspection.interface';

export class InspectionResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the inspection item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the inspection item',
    example: 'Safety Equipment Check',
  })
  name: string;

  @ApiProperty({
    description: 'Status of the inspection item',
    enum: InspectionStatus,
    example: InspectionStatus.PENDING,
  })
  status: InspectionStatus;
}