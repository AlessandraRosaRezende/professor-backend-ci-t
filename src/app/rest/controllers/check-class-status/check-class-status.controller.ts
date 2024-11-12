import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { CheckClassStatusUsecaseFactory } from '../../../../infra/factories/usecases/check-class-status.usecase.factory';

@Controller('/class')
export class CheckClassStatusController {
  constructor(private readonly usecaseFactory: CheckClassStatusUsecaseFactory) {}

  @Get(':id/status')
  @HttpCode(HttpStatus.OK)
  async getClassStatus(@Param('id') classId: string): Promise<{ status: string }> {
    const usecase = this.usecaseFactory.getInstance();
    const status = await usecase.execute({ classId });
    return { status };
  }
}
