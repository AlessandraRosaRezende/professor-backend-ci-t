import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ListProfessorClassesByFilterPortFactory } from './factories/ports/list-professor-classes-by-filter.port.factory';
import { ListProfessorClassesByFilterUsecaseFactory } from './factories/usecases/list-professor-classes-by-filter.usecase.factory';
import { Class, ClassSchema } from './schemas/class.schema';
import { environment, root, runtime } from './setup/configs';
import { SeedModule } from './seed.module';
import { Student, StudentSchema } from './schemas/student.shema';
import { ListStudentsFromClassByIdUsecaseFactory } from './factories/usecases/list-students-from-class-by-id.usecase.factory';
import { ListStudentsFromClassByIdPortFactory } from './factories/ports/list-students-from-class-by-id.port.factory';
import { UpdateStudentStatusPortFactory } from './factories/ports/update-studant-status.port.factory';
import { CheckClassStatusUsecaseFactory } from './factories/usecases/check-class-status.usecase.factory';
import { UpdateStudentStatusUsecaseFactory } from './factories/usecases/update-student-status.usecase.factory';

@Module({
  exports: [
    ListProfessorClassesByFilterUsecaseFactory,
    ListStudentsFromClassByIdUsecaseFactory,
    CheckClassStatusUsecaseFactory,
    UpdateStudentStatusUsecaseFactory,
  ],
  providers: [
    // Usecases
    ListProfessorClassesByFilterUsecaseFactory,
    ListStudentsFromClassByIdUsecaseFactory,
    CheckClassStatusUsecaseFactory,
    UpdateStudentStatusUsecaseFactory,

    // Ports
    ListProfessorClassesByFilterPortFactory,
    ListStudentsFromClassByIdPortFactory,
    UpdateStudentStatusPortFactory,
  ],
  imports: [
    HttpModule,
    SeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [root('envs/docker'), environment('envs/docker'), runtime],
    }),
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const base_connection_string = configService.get<string>('MONGODB_CONNECTION_STRING');
        const dbName = configService.get<string>('MONGODB_DATABASE_NAME');

        const uri = `${base_connection_string}`;

        console.info({ message: 'database name do mongodb: ', dbName });
        console.info({ message: 'uri do mongodb: ', uri });

        return {
          uri,
          dbName,
        };
      },
    }),
  ],
})
export class InfraModule {}
