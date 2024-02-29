import { IGeneralData } from '@/models';

export interface ICampaignSettings {
	campaignSettings: ICampaignSetting[]
	__typename: string
}

export interface ICampaignSetting extends IGeneralData {
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
	adwordsSetting: IAdwordsSetting
	sklikSetting: null
	bingSetting: null
	keywordSettings: IKeywordSetting[]
	baseAdtexts: IBaseAdtext[]
	bidRules: IBidRule[]
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
