import { Controller, Post, Body, Param, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { UpdateStudentStatusRequestBody, UpdateStudentStatusResponseBody } from './update-student-status.types';
import { UpdateStudentStatusUsecaseFactory } from '../../../../infra/factories/usecases/update-student-status.usecase.factory';
import { UpdateStudentStatusPortResult } from '../../../../domain/ports/update-student-status.port';

@Controller()
export class UpdateStudentStatusController {
  constructor(private readonly usecaseFactory: UpdateStudentStatusUsecaseFactory) {}

  @Post('/students/:id/evaluation')
  @HttpCode(HttpStatus.OK)
  @Header('access-control-allow-origin', '*')
  async execute(
    @Param('id') studentId: string,
    @Body() body: UpdateStudentStatusRequestBody,
  ): Promise<UpdateStudentStatusResponseBody> {
    const usecase = this.usecaseFactory.getInstance();

    const updatedStudent = await usecase.execute({
      studentId,
      aulasLecionadas: body.aulas_lecionadas,
      aulasAtendidas: body.aulas_atendidas,
      notaP1: body.nota_p1,
      notaP2: body.nota_p2,
    });

    return this.mapToResponseBody(updatedStudent);
  }

  private mapToResponseBody(student: UpdateStudentStatusPortResult): UpdateStudentStatusResponseBody {
    return {
      id: student.id,
      name: student.name,
      status: student.status,
    };
  }
}
