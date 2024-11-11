import { Injectable } from '@nestjs/common';
import { UpdateStudentStatusPortFactory } from '../ports/update-studant-status.port.factory';
import { UpdateStudentStatusUseCase } from '../../../domain/usecases/update-student-status/update-student-status.usecase';

@Injectable()
export class UpdateStudentStatusUsecaseFactory {
  constructor(private readonly updateStudentStatusPortFactory: UpdateStudentStatusPortFactory) {}

  getInstance(): UpdateStudentStatusUseCase {
    return new UpdateStudentStatusUseCase(this.updateStudentStatusPortFactory.getInstance());
  }
}
