import { Controller, Get, Put, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { InspectionResponseDto } from './dto/inspection-response.dto';
import { SummaryResponseDto } from './dto/summary-response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { InspectionStatus } from './interfaces/inspection.interface';

@ApiTags('inspections')
@Controller('inspections')
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all inspection items for the day',
    description: 'Retrieves a list of all inspection items for the current day with their current statuses.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of inspection items',
    type: [InspectionResponseDto],
  })
  async findAll(): Promise<InspectionResponseDto[]> {
    return this.inspectionsService.findAll();
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update inspection item status',
    description: 'Updates the status of a specific inspection item identified by its ID. The status must be one of: pending, passed, failed, na.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the inspection item',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    description: 'New status for the inspection item. Select from the available options.',
    type: UpdateInspectionDto,
    examples: {
      pending: {
        summary: 'Set status to pending',
        value: { status: InspectionStatus.PENDING },
      },
      passed: {
        summary: 'Set status to passed',
        value: { status: InspectionStatus.PASSED },
      },
      failed: {
        summary: 'Set status to failed',
        value: { status: InspectionStatus.FAILED },
      },
      na: {
        summary: 'Set status to N/A',
        value: { status: InspectionStatus.NA },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Updated inspection item',
    type: InspectionResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Inspection item not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid status provided',
  })
  async update(
    @Param('id') id: string,
    @Body() updateInspectionDto: UpdateInspectionDto,
  ): Promise<InspectionResponseDto> {
    const updatedInspection = await this.inspectionsService.update(id, updateInspectionDto);
    if (!updatedInspection) {
      throw new HttpException('Inspection item not found', HttpStatus.NOT_FOUND);
    }
    return updatedInspection;
  }

  @Post('reset')
  @ApiOperation({
    summary: 'Reset all inspection items to pending',
    description: 'Resets the status of all inspection items to pending for a new day.',
  })
  @ApiResponse({
    status: 200,
    description: 'All inspections reset to pending',
    type: [InspectionResponseDto],
  })
  async reset(): Promise<InspectionResponseDto[]> {
    return this.inspectionsService.reset();
  }

  @Get('summary')
  @ApiOperation({
    summary: 'Get inspection status summary',
    description: 'Returns a summary of inspection statuses, including counts for each status and the total.',
  })
  @ApiResponse({
    status: 200,
    description: 'Inspection status summary',
    type: SummaryResponseDto,
  })
  async getSummary(): Promise<SummaryResponseDto> {
    return this.inspectionsService.getSummary();
  }
}