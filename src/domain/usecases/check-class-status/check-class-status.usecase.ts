import { ListStudentsFromClassByIdPort } from '../../../domain/ports/list-students-from-class-by-id.port';
import { CheckClassStatusInput } from './check-class-status.types';

export class CheckClassStatusUsecase {
  constructor(private readonly listStudentsFromClassByIdPort: ListStudentsFromClassByIdPort) {}

  async execute({ classId }: CheckClassStatusInput): Promise<string> {
    const teste = await this.listStudentsFromClassByIdPort.execute({
      classId,
    });
    console.log(teste);
    return '';
  }
}
