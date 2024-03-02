import {
	IAdditionalSource,
	IBaseAdtext,
	IBidRule,
	ICampaignSetting,
	IFeedExport,
	IKeywordSetting,
	IVariable
} from '@/models';

export type TUnionOfInterface = IVariable |
	IAdditionalSource |
	IFeedExport |
	ICampaignSetting |
	IKeywordSetting |
	IBaseAdtext |
	IBidRule;

