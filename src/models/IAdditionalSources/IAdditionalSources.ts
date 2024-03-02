import { IGeneralData } from '@/models';

export interface IAdditionalSources {
	additionalSources: IAdditionalSource[]
	__typename: string
}

export interface IAdditionalSource extends IGeneralData {
	mappingField: string
	mappingFields: string[]
}
