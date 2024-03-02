export interface IVariables {
	variables: IVariable[]
	__typename: string
}

export interface IVariable {
	id: string
	name: string
	placeholderName: string
	showValueType: string
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
	imageGen: IImageGen | null
	additionalSource: IAdditionalSourceVar | null
	__typename: string
}

export interface IImageGen {
	getPlaceholdersWithoutConditions: string[]
	getConditionsPlaceholders: string[]
	__typename: string
}

export interface IAdditionalSourceVar{
	id: number
	__typename: string
}
