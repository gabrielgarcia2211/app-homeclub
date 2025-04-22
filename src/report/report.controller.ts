import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('reporte')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async getReport(@Query() params: any) {
    const parsedParams = params ?? {};
    return this.reportService.generateReport(parsedParams);
  }
}
