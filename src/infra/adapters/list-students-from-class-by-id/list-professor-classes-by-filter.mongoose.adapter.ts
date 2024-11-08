import { Model } from 'mongoose';
import {
  ListStudentsFromClassByIdPort,
  ListStudentsFromClassByIdPortInput,
  ListStudentsFromClassByIdPortResult,
} from '../../../domain/ports/list-students-from-class-by-id.port';
import { StudentDocument } from '../../schemas/student.shema';

export class ListStudentsFromClassByIdMongooseAdapter implements ListStudentsFromClassByIdPort {
  constructor(private readonly StudentModel: Model<StudentDocument>) {}

  async execute({ classId }: ListStudentsFromClassByIdPortInput): Promise<ListStudentsFromClassByIdPortResult> {
    const students = (await this.StudentModel.find<StudentDocument>({ classCodeList: { $in: [classId] } })
      .lean()
      .exec()) as StudentDocument[];
    return this.mapStudentsToModel(students);
  }

  private mapStudentsToModel(studentDocumentList: StudentDocument[]): ListStudentsFromClassByIdPortResult {
    console.log('studentDocumentList', studentDocumentList);
    return studentDocumentList;
  }
}
