import { ListStudentsFromClassByIdPort } from '../../../domain/ports/list-students-from-class-by-id.port';
import { CheckClassStatusInput } from './check-class-status.types';

export class CheckClassStatusUsecase {
  constructor(private readonly listStudentsFromClassByIdPort: ListStudentsFromClassByIdPort) {}

  async execute({ classId }: CheckClassStatusInput): Promise<string> {
    const students = await this.listStudentsFromClassByIdPort.execute({ classId });

    const statuses = students.map((student) => student.status || 'NAO_AVALIADO');

    const allNotEvaluated = statuses.every((status) => status === 'NAO_AVALIADO');
    const someNotEvaluated = statuses.some((status) => status === 'NAO_AVALIADO');

    if (allNotEvaluated) {
      return 'ABERTA';
    } else if (someNotEvaluated) {
      return 'EM_FECHAMENTO';
    } else {
      return 'FECHADA';
    }
  }
}
