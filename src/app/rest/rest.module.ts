import { Module } from '@nestjs/common';
import { ListProfessorClassesByFilterController } from './controllers/list-professor-classes-by-filter/list-professor-classes-by-filter.controller';
import { InfraModule } from '../../infra/infra.module';
import { ListStudentsFromClassByIdController } from './controllers/list-students-from-class-by-id/list-students-from-class-by-id.controller';
import { CheckClassStatusController } from './controllers/check-class-status/check-class-status.controller';
import { UpdateStudentStatusController } from './controllers/update-student-status/update-student-status.controller';

@Module({
  controllers: [
    ListProfessorClassesByFilterController,
    ListStudentsFromClassByIdController,
    CheckClassStatusController,
    UpdateStudentStatusController,
  ],
  imports: [InfraModule],
})
export class RestModule {}
