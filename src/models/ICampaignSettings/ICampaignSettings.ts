import { IGeneralData } from '@/models';
// import { IGeneralData, IPlaceholders, TGeneralType } from "@/models";

// export interface ICampaignSettings extends Pick<TGeneralType, "__typename"> {
// 	campaignSettings: ICampaignSetting[];
// }

// interface ICampaignSetting extends IGeneralData, IPlaceholders {
// 	adwordsSetting: TAdwordsSetting,
// 	sklikSetting?: null,
// 	bingSetting?: null,
// 	keywordSettings: TKeywordSetting[],
// 	baseAdtexts: TBaseAdtext[],
// 	bidRules: TBidRule[],
// }


// type TAdwordsSetting = Omit<TGeneralType, "name"> &
// 	Pick<IPlaceholders, "getPlaceholdersWithoutConditions">

// type TKeywordSetting = TGeneralType & IPlaceholders;

// interface TBaseAdtext extends TGeneralType, IPlaceholders {
// 	type: string,
// 	parentId: number
// }

// type TBidRule = Omit<TKeywordSetting, "getPlaceholdersWithoutConditions">


export interface ICampaignSettings {
	campaignSettings: ICampaignSetting[]
	__typename: string
}

export interface ICampaignSetting extends IGeneralData {
	// id: number
	// icon: string
	// name: string
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
	adwordsSetting: IAdwordsSetting
	sklikSetting: null
	bingSetting: null
	keywordSettings: IKeywordSetting[]
	baseAdtexts: IBaseAdtext[]
	bidRules: IBidRule[]
	// __typename: string
}

export interface IAdwordsSetting {
	id: number
	getPlaceholdersWithoutConditions: string[]
	__typename: string
}

export interface IKeywordSetting {
	id: number
	name: string
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: unknown[]
	__typename: string
}

export interface IBaseAdtext {
	id: number
	type: string
	parentId: number
	name: string
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
	__typename: string
}

export interface IBidRule {
	id: number
	name: string
	getConditionsPlaceholders: string[]
	__typename: string
}
