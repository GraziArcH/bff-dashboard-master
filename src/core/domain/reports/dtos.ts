export interface GetReportRegistrationResponseDto {
  reportTemplateId: number;
  reportName: string;
  title: string;
  description: string;
  numberOfLines: number;
  userId: number;
  dataPurgePeriod: string;
  cachePurgePeriod: string;
  version: string;
  active: boolean;
  path?: string;
}

export interface GetReportTypesResponseDto {
  reportTypeId: number;
  typeName: string;
  description: string;
  icon: string;
}

export interface ReportTemplate {
  id: number;
  label: string;
  path: string;
}

export interface GetReportTypeResponse {
  id: number;
  label: string;
  path?: string;
  iconName?: string;
  description: string;
  children?: ReportTemplate[];
}
