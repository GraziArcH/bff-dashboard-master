import {
  type GetReportRegistrationResponseDto,
  type GetReportTypeResponse
} from './dtos';
import { ReportGateway } from '@/core/gateway/report-gateway';
import GlobalError from '@/errors';

/**
 * Caso de uso responsável por obter tipos de relatórios.
 */
export class GetReportTypesUseCase {
  private readonly reportGateway: ReportGateway;

  constructor() {
    this.reportGateway = new ReportGateway();
  }

  /**
   * Obtém todos os tipos de relatórios disponíveis.
   * @returns {Promise<GetReportTypeResponse[] | undefined>} - Uma promessa que resolve para uma lista de tipos de relatórios ou undefined.
   * @throws {GlobalError} - Lança um erro global se a obtenção dos relatórios falhar.
   */
  public async getAll(): Promise<GetReportTypeResponse[] | undefined> {
    try {
      // Inicializa o array para armazenar os relatórios do dashboard
      const dashboardReports: GetReportTypeResponse[] = [];

      // Obtém os tipos de relatórios do gateway
      const reportTypes = await this.reportGateway.listReportTypes();

      // Verifica se não há tipos de relatórios para retornar
      if (!reportTypes) {
        throw new GlobalError('Não há tipos de relatórios para retornar', 404);
      }

      // Itera sobre cada tipo de relatório para obter os relatórios associados
      for (let i = 0; i < reportTypes.length; i++) {
        const type = reportTypes[i];

        // Obtém os relatórios para o tipo atual
        const reports: GetReportRegistrationResponseDto[] =
          await this.reportGateway.findByType(type.reportTypeId);

        // Adiciona o tipo de relatório e seus relatórios associados ao array dashboardReports
        dashboardReports.push({
          id: type.reportTypeId,
          label: type.typeName,
          description: type.description,
          iconName: type.icon,
          children: reports
            ? reports.map((report) => {
                return {
                  id: report.reportTemplateId,
                  label: report.reportName,
                  path: report.path ?? '/'
                };
              })
            : undefined
        });
      }

      // Retorna a lista de relatórios do dashboard
      return dashboardReports;
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao obter os relatórios do serviço
      throw new GlobalError('Erro ao obter relatórios do serviço', 500, error);
    }
  }
}
