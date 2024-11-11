import { Model } from 'mongoose';
import {
  UpdateStudentStatusPort,
  UpdateStudentStatusPortInput,
  UpdateStudentStatusPortResult,
} from '../../../domain/ports/update-student-status.port';
import { StudentDocument } from '../../../infra/schemas/student.shema';

export class UpdateStudentStatusMongooseAdapter implements UpdateStudentStatusPort {
  constructor(private readonly StudentModel: Model<StudentDocument>) {}

  async execute({ studentId, status }: UpdateStudentStatusPortInput): Promise<UpdateStudentStatusPortResult> {
    // Atualiza o status do aluno no banco de dados
    const updatedStudent = await this.StudentModel.findOneAndUpdate(
      { id: studentId },
      { status },
      { new: true },
    ).exec();

    if (!updatedStudent) {
      throw new Error('Student not found');
    }

    return {
      id: updatedStudent.id,
      name: updatedStudent.name,
      status: updatedStudent.status,
    };
  }
}
