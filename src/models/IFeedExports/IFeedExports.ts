import { IGeneralData } from '@/models';
export interface IFeedExports {
	feedExports: IFeedExport[]
	__typename: string
}

export interface IFeedExport extends IGeneralData {
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
}
