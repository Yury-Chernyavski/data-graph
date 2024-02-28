import { IGeneralData } from '@/models';
// import { IGeneralData, TGeneralType } from "@/models";

// interface IAdditionalSource extends IGeneralData {
// 	mappingField: string,
// 	mappingFields: unknown[] | []
// }

// export interface IAdditionalSources extends Pick<TGeneralType, "__typename"> {
// 	additionalSources: IAdditionalSource[];
// }


export interface IAdditionalSources {
	additionalSources: IAdditionalSource[]
	__typename: string
}

export interface IAdditionalSource extends IGeneralData {
	mappingField: string
	mappingFields: string[]
}
