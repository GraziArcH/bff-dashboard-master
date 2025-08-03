import { GetReportTypesUseCase } from '@/core/domain/reports/get-report-types.usecase';
import { type Request, type Response } from 'express';
import { ArchFramework } from 'versatus-arch-framework/arch-framework';

const logInstance = ArchFramework.getLogInstance();

/**
 * Controlador responsável por lidar com as requisições relacionadas aos relatórios.
 */
export class ReportsController {
  private readonly getReportTypesUseCase: GetReportTypesUseCase;

  constructor() {
    this.getReportTypesUseCase = new GetReportTypesUseCase();
  }

  /**
   * Obtém relatórios por tipo de relatório.
   * @param {Request} req - O objeto de solicitação HTTP.
   * @param {Response} res - O objeto de resposta HTTP.
   * @returns {Promise<Response>} - Uma promessa que resolve para uma resposta HTTP.
   */
  public async getReportByType(req: Request, res: Response): Promise<Response> {
    try {
      // Chama o caso de uso para obter todos os relatórios por tipo
      const reports = await this.getReportTypesUseCase.getAll();

      // Verifica se os relatórios foram encontrados
      if (!reports) {
        // Retorna uma resposta 404 se nenhum relatório for encontrado
        return res.status(404).json({
          success: false,
          message: 'Não foram encontrados relatórios para esse tipo'
        });
      }

      // retorna uma resposta 200 com os relatórios
      return res.status(200).json({ success: true, message: { reports } });
    } catch (error) {
      // Loga o erro e retorna uma resposta 500 se ocorrer um problema ao buscar o report pelo tipo
      logInstance.setError(error, 'Erro ao obter tipos de relatório');

      console.error('Erro ao obter tipos de relatório:', error);
      return res.status(500).json({
        success: false,
        message: 'Erro ao obter tipos de relatório',
        error: error.message
      });
    }
  }
}
