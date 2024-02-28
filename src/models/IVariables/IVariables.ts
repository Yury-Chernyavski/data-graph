// import { IPlaceholders, TGeneralType } from '@/models';

// export interface IVariables extends Pick<TGeneralType, "__typename"> {
// 	variables: IVariable[];
// }

// export interface IVariable extends IPlaceholders {
// 	id: string
// 	name: string
// 	placeholderName: string,
// 	showValueType: string,
// 	imageGen?: TImageGen,
// 	additionalSource?: Omit<TGeneralType, "name">
// 	__typename: string
// }


// type TImageGen = IPlaceholders & Pick<TGeneralType, "__typename">


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
