import { GetReportTypesUseCase } from '@/core/domain/reports/get-report-types.usecase';
import { Request, Response } from 'express';
import { jest } from '@jest/globals';
import { GetReportTypeResponse } from '@/core/domain/reports/dtos';
import { ReportsController } from '@/service/reports.controller';

describe('ReportsController', () => {
  let reportsController: ReportsController;
  let mockGetReportTypesUseCase: jest.Mocked<GetReportTypesUseCase>;

  beforeEach(() => {
    mockGetReportTypesUseCase = {
      getAll: jest.fn()
    } as unknown as jest.Mocked<GetReportTypesUseCase>;

    reportsController = new ReportsController();
    // @ts-ignore
    reportsController['getReportTypesUseCase'] = mockGetReportTypesUseCase;
  });

  describe('getReportByType', () => {
    it('should return 200 with reports when reports are found', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      const reports: GetReportTypeResponse[] = [
        {
          id: 1,
          label: 'Report1',
          description: 'Description1',
          iconName: 'icon1',
          children: [
            {
              id: 1,
              label: 'ChildReport1',
              path: '/path1'
            }
          ]
        }
      ];
      mockGetReportTypesUseCase.getAll.mockResolvedValue(reports);

      await reportsController.getReportByType(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: { reports } });
    });

    it('should return 404 when no reports are found', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      mockGetReportTypesUseCase.getAll.mockResolvedValue(undefined);

      await reportsController.getReportByType(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Não foram encontrados relatórios para esse tipo'
      });
    });

    it('should return 500 when an error occurs', async () => {
      const req = {} as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;

      const error = new Error('Some error');
      mockGetReportTypesUseCase.getAll.mockRejectedValue(error);

      await reportsController.getReportByType(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Erro ao obter tipos de relatório',
        error: 'Some error'
      });
    });
  });
});
