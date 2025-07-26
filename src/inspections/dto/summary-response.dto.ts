import { ApiProperty } from '@nestjs/swagger';

export class SummaryResponseDto {
  @ApiProperty({
    description: 'Number of inspections with passed status',
    example: 3,
  })
  passed: number;

  @ApiProperty({
    description: 'Number of inspections with failed status',
    example: 1,
  })
  failed: number;

  @ApiProperty({
    description: 'Number of inspections with N/A status',
    example: 1,
  })
  na: number;

  @ApiProperty({
    description: 'Number of inspections with pending status',
    example: 0,
  })
  pending: number;

  @ApiProperty({
    description: 'Total number of inspections',
    example: 5,
  })
  total: number;
}