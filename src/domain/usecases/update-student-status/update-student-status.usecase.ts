import {
  UpdateStudentStatusPortInput,
  UpdateStudentStatusPortResult,
} from '../../../domain/ports/update-student-status.port';
import { UpdateStudentStatusPort } from '../../../domain/ports/update-student-status.port';

export class UpdateStudentStatusUseCase {
  constructor(
    private readonly updateStudentStatusPort: UpdateStudentStatusPort, // Adaptar para usar o port correto
  ) {}

  async execute(input: UpdateStudentStatusPortInput): Promise<UpdateStudentStatusPortResult> {
    try {
      const { aulasLecionadas, aulasAtendidas, notaP1, notaP2 } = input;

      // Cálculo da média das notas
      const mediaNotas = (notaP1 + notaP2) / 2;

      // Cálculo da taxa de frequência
      const taxaFrequencia = (aulasAtendidas / aulasLecionadas) * 100;

      // Lógica para determinar o status do aluno
      let status: string;

      if (notaP1 === 0 && notaP2 === 0) {
        status = 'NAO_AVALIADO'; // Nenhuma nota foi lançada
      } else if (mediaNotas >= 7 && taxaFrequencia >= 75) {
        status = 'APROVADO';
      } else if ((mediaNotas >= 5 && mediaNotas < 7) || taxaFrequencia < 75) {
        status = 'EM_EXAME';
      } else {
        status = 'REPROVADO';
      }

      // Atualiza a situação do aluno no banco de dados
      return await this.updateStudentStatusPort.execute({ ...input, status });
    } catch (error) {
      throw new Error(`Error updating student status: ${error.message}`);
    }
  }
}
