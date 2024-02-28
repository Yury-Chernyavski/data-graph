import { IAdditionalSources, ICampaignSettings, IFeedExports, IVariables } from "@/models";

export interface IData {
	feedExports: IFeedExports,
	additionalSources: IAdditionalSources,
	campaignSettings: ICampaignSettings,
	variables: IVariables
}
