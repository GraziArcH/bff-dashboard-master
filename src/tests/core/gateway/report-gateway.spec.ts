import { ReportGateway } from '@/core/gateway/report-gateway'
import axios from 'axios'

jest.mock('axios')

describe('ReportGateway', () => {
  const mockReportRegistrationResponse: any[] = [
    {
      reportTemplateId: 1,
      reportName: 'Report 1',
      title: 'Title 1',
      description: 'Description 1',
      numberOfLines: 10,
      userId: 1,
      dataPurgePeriod: 'daily',
      cachePurgePeriod: 'weekly',
      version: '1.0',
      active: true,
      path: '/path/to/report/1'
    }
  ]

  const mockReportTypesResponse: any[] = [
    {
      reportTypeId: 1,
      typeName: 'Type 1',
      description: 'Description 1',
      icon: 'icon-1'
    }
  ]

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findByType', () => {
    it('should fetch report registration by type', async () => {
      const reportTypeId = 1
      const mockedAxiosResponse = {
        data: { data: mockReportRegistrationResponse }
      };
      (axios.get as jest.Mock).mockResolvedValue(mockedAxiosResponse)

      const reportGateway = new ReportGateway()
      const result = await reportGateway.findByType(reportTypeId)

      expect(result).toEqual(mockReportRegistrationResponse)
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/report-templates/${reportTypeId}`)
      )
    })

    it('should throw error if fetching report registration fails', async () => {
      const reportTypeId = 1
      const mockedAxiosError = new Error('Erro ao obter relatório por tipo');
      (axios.get as jest.Mock).mockRejectedValue(mockedAxiosError)

      const reportGateway = new ReportGateway()

      await expect(reportGateway.findByType(reportTypeId)).rejects.toThrow(mockedAxiosError)
    })
  })

  describe('listReportTypes', () => {
    it('should fetch list of report types', async () => {
      const mockedAxiosResponse = {
        data: { data: mockReportTypesResponse }
      };
      (axios.get as jest.Mock).mockResolvedValue(mockedAxiosResponse)

      const reportGateway = new ReportGateway()
      const result = await reportGateway.listReportTypes()

      expect(result).toEqual(mockReportTypesResponse)
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/report-types')
      )
    })

    it('should throw error if fetching list of report types fails', async () => {
      const mockedAxiosError = new Error('Erro ao obter tipos de relatório');
      (axios.get as jest.Mock).mockRejectedValue(mockedAxiosError)

      const reportGateway = new ReportGateway()

      await expect(reportGateway.listReportTypes()).rejects.toThrow(mockedAxiosError)
    })
  })
})
