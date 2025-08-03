import { GetReportRegistrationResponseDto, GetReportTypeResponse } from '@/core/domain/reports/dtos';
import { GetReportTypesUseCase } from '@/core/domain/reports/get-report-types.usecase';
import { ReportGateway } from '@/core/gateway/report-gateway';
import GlobalError from '@/errors';
import { jest } from '@jest/globals';

describe('GetReportTypesUseCase', () => {
    let getReportTypesUseCase: GetReportTypesUseCase;
    let mockReportGateway: jest.Mocked<ReportGateway>;

    beforeEach(() => {
        mockReportGateway = {
            listReportTypes: jest.fn(),
            findByType: jest.fn()
        } as unknown as jest.Mocked<ReportGateway>;

        getReportTypesUseCase = new GetReportTypesUseCase();
        // @ts-ignore
        getReportTypesUseCase['reportGateway'] = mockReportGateway;
    });

    describe('getAll', () => {
        it('should return all report types with associated reports', async () => {
            const reportTypes = [
                { reportTypeId: 1, typeName: 'Type1', description: 'Desc1', icon: 'icon1' },
                { reportTypeId: 2, typeName: 'Type2', description: 'Desc2', icon: 'icon2' }
            ];

            const reportRegistrations: GetReportRegistrationResponseDto[] = [
                {
                    reportTemplateId: 1,
                    reportName: 'Report1',
                    title: 'Title1',
                    description: 'Desc1',
                    numberOfLines: 10,
                    userId: 1,
                    dataPurgePeriod: '30 days',
                    cachePurgePeriod: '10 days',
                    version: 'v1',
                    active: true,
                    path: '/report1'
                }
            ];

            mockReportGateway.listReportTypes.mockResolvedValue(reportTypes);
            mockReportGateway.findByType.mockResolvedValueOnce(reportRegistrations);
            mockReportGateway.findByType.mockResolvedValueOnce([]);

            const expectedResponse: GetReportTypeResponse[] = [
                {
                    id: 1,
                    label: 'Type1',
                    description: 'Desc1',
                    iconName: 'icon1',
                    children: [
                        {
                            id: 1,
                            label: 'Report1',
                            path: '/report1'
                        }
                    ]
                },
                {
                    id: 2,
                    label: 'Type2',
                    description: 'Desc2',
                    iconName: 'icon2',
                    children: []
                }
            ];

            const result = await getReportTypesUseCase.getAll();

            expect(result).toEqual(expectedResponse);
            expect(mockReportGateway.listReportTypes).toHaveBeenCalledTimes(1);
            expect(mockReportGateway.findByType).toHaveBeenCalledTimes(2);
        });

        it('should return an empty array for children when no reports are found for a type', async () => {
            const reportTypes = [
                { reportTypeId: 1, typeName: 'Type1', description: 'Desc1', icon: 'icon1' }
            ];

            mockReportGateway.listReportTypes.mockResolvedValue(reportTypes);
            mockReportGateway.findByType.mockResolvedValue([]);

            const expectedResponse: GetReportTypeResponse[] = [
                {
                    id: 1,
                    label: 'Type1',
                    description: 'Desc1',
                    iconName: 'icon1',
                    children: []
                }
            ];

            const result = await getReportTypesUseCase.getAll();

            expect(result).toEqual(expectedResponse);
            expect(mockReportGateway.listReportTypes).toHaveBeenCalledTimes(1);
            expect(mockReportGateway.findByType).toHaveBeenCalledTimes(1);
        });

        it('should throw GlobalError when no report types are returned', async () => {
            mockReportGateway.listReportTypes.mockResolvedValue(undefined);

            await expect(getReportTypesUseCase.getAll()).rejects.toThrow(GlobalError);
            await expect(getReportTypesUseCase.getAll()).rejects.toThrow('Erro ao obter relatórios do serviço');

            expect(mockReportGateway.listReportTypes).toHaveBeenCalledTimes(2);
        });

        it('should throw GlobalError when fetching reports fails', async () => {
            const error = new Error('Gateway error');
            mockReportGateway.listReportTypes.mockRejectedValue(error);

            await expect(getReportTypesUseCase.getAll()).rejects.toThrow(GlobalError);
            await expect(getReportTypesUseCase.getAll()).rejects.toThrow('Erro ao obter relatórios do serviço');

            expect(mockReportGateway.listReportTypes).toHaveBeenCalledTimes(2);
        });
    });
});
