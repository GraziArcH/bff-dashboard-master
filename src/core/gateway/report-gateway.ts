import axios, { type AxiosResponse } from 'axios';
import {
  type GetReportRegistrationResponseDto,
  type GetReportTypesResponseDto
} from '../domain/reports/dtos';
import { config } from '../infrastructure/config';
import GlobalError from '@/errors'; // Adicionando a importação de GlobalError para tratamento de erros

/**
 * Gateway de dados responsável por obter relatórios e tipos de relatórios.
 */
export class ReportGateway {
  private readonly MS_REPORT_REGISTRATION_URL =
    config.MS_REPORT_REGISTRATION_URL;

  /**
   * Obtém relatórios pelo tipo de relatório.
   * @param {number} reportTypeId - O ID do tipo de relatório.
   * @returns {Promise<GetReportRegistrationResponseDto[] | undefined>} - Uma promessa que resolve para uma lista de relatórios ou undefined.
   * @throws {GlobalError} - Lança um erro global se a obtenção dos relatórios falhar.
   */
  public async findByType(
    reportTypeId: number
  ): Promise<GetReportRegistrationResponseDto[] | undefined> {
    try {
      // Envia uma requisição GET para obter relatórios pelo tipo de relatório
      console.log("Fetching report by typeId on gateway")
      const response: AxiosResponse = await axios.get(
        `${this.MS_REPORT_REGISTRATION_URL}/report-templates/${reportTypeId}`
      );
      return response.data.data;
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao obter os relatórios pelo tipo
      throw new GlobalError('Erro ao obter relatório por tipo', 500, error);
    }
  }

  /**
   * Lista todos os tipos de relatórios disponíveis.
   * @returns {Promise<GetReportTypesResponseDto[] | undefined>} - Uma promessa que resolve para uma lista de tipos de relatórios ou undefined.
   * @throws {GlobalError} - Lança um erro global se a obtenção dos tipos de relatórios falhar.
   */
  public async listReportTypes(): Promise<
    GetReportTypesResponseDto[] | undefined
  > {
    try {
      // Envia uma requisição GET para listar todos os tipos de relatórios
      console.log("Fetching all report types on gateway")
      const response: AxiosResponse = await axios.get(
        `${this.MS_REPORT_REGISTRATION_URL}/report-types`
      );
      return response.data.data;
    } catch (error) {
      // Lança um erro global se ocorrer um problema ao listar os tipos de relatórios
      throw new GlobalError('Erro ao obter tipos de relatório', 500, error);
    }
  }
}
