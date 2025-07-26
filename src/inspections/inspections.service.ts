import { Injectable, Logger } from '@nestjs/common';
import { InspectionResponseDto } from './dto/inspection-response.dto';
import { SummaryResponseDto } from './dto/summary-response.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { Inspection, InspectionStatus } from './interfaces/inspection.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InspectionsService {
  private readonly logger = new Logger(InspectionsService.name);
  private inspections: Inspection[] = [
    { id: uuidv4(), name: 'Safety Equipment Check', status: InspectionStatus.PENDING },
    { id: uuidv4(), name: 'Site Perimeter Security', status: InspectionStatus.PENDING },
    { id: uuidv4(), name: 'Equipment Maintenance', status: InspectionStatus.PENDING },
    { id: uuidv4(), name: 'Worker PPE Compliance', status: InspectionStatus.NA },
    { id: uuidv4(), name: 'Fire Safety Measures', status: InspectionStatus.PENDING },
    { id: uuidv4(), name: 'Scaffold Stability Check', status: InspectionStatus.PENDING },
    { id: uuidv4(), name: 'Electrical System Safety', status: InspectionStatus.PENDING },
    { id: uuidv4(), name: 'Hazardous Material Storage', status: InspectionStatus.PENDING },
    { id: uuidv4(), name: 'Worker Safety Training Verification', status: InspectionStatus.PENDING },
    { id: uuidv4(), name: 'Environmental Compliance Check', status: InspectionStatus.FAILED },
  ];

  findAll(): InspectionResponseDto[] {
    this.logger.log('Fetching all inspection items');
    return this.inspections;
  }

  update(id: string, updateInspectionDto: UpdateInspectionDto): InspectionResponseDto | null {
    this.logger.log(`Updating inspection item ${id} with status ${updateInspectionDto.status}`);
    const inspection = this.inspections.find((item) => item.id === id);
    if (!inspection) {
      return null;
    }
    inspection.status = updateInspectionDto.status;
    return inspection;
  }

  reset(): InspectionResponseDto[] {
    this.logger.log('Resetting all inspection items to pending');
    this.inspections = this.inspections.map((item) => ({
      ...item,
      status: InspectionStatus.PENDING,
    }));
    return this.inspections;
  }

  getSummary(): SummaryResponseDto {
    this.logger.log('Generating inspection summary');
    const summary: SummaryResponseDto = {
      passed: 0,
      failed: 0,
      na: 0,
      pending: 0,
      total: this.inspections.length,
    };

    this.inspections.forEach((item) => {
      switch (item.status) {
        case InspectionStatus.PASSED:
          summary.passed++;
          break;
        case InspectionStatus.FAILED:
          summary.failed++;
          break;
        case InspectionStatus.NA:
          summary.na++;
          break;
        case InspectionStatus.PENDING:
          summary.pending++;
          break;
      }
    });

    return summary;
  }
}