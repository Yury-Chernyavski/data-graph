import { IGeneralData } from '@/models';
// import { IGeneralData, IPlaceholders, TGeneralType } from "@/models";

// type IFeedExport = IGeneralData & IPlaceholders;

// export interface IFeedExports extends Pick<TGeneralType, "__typename"> {
// 	feedExports: IFeedExport[];
// }

export interface IFeedExports {
	feedExports: IFeedExport[]
	__typename: string
}

export interface IFeedExport extends IGeneralData {
	// id: number
	// icon: string
	// name: string
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
	// __typename: string
}
