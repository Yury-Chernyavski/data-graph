import {
	IAdditionalSource,
	IBaseAdtext,
	IBidRule,
	ICampaignSetting,
	IData,
	IFeedExport,
	IKeywordSetting,
	IVariable
} from "@/models";
import { Edge, Node, XYPosition } from "reactflow";
import { createNode } from "./createNode";

interface ISubAdditionalSource {
	id: number;
	__typename: string
}

const addEdge = (elemOrArrElems: string[] | ISubAdditionalSource, edges: Edge[], targetId: string): void => {
	if (Array.isArray(elemOrArrElems)) {
		elemOrArrElems.forEach((placeholder: string) => {
			const nodeId = placeholder;
			edges.push({ id: `${nodeId}-${targetId}`, source: nodeId, target: targetId });
		});
	} else {
		edges.push({ id: `${elemOrArrElems.id}-${targetId}`, source: String(elemOrArrElems.id), target: targetId })
	}
};


export const convertToNode = (data: IData): { nodes: Node[], edges: Edge[] } => {
	const nodes: Node[] = [];
	const edges: Edge[] = [];
	const dateFieldVariables = data.variables.variables.filter((item) => item.id.includes("DataField"));
	const modifierVariables = data.variables.variables.filter((item) => item.id.includes("Modifier"));
	const modifierWithPlaceholder = modifierVariables.filter(item => item.getPlaceholdersWithoutConditions.length && !item.imageGen);
	const modifierWithoutPlaceholderAndImageGen = modifierVariables.filter(item => !item.getPlaceholdersWithoutConditions.length && !item.imageGen);
	const modifierWithImageGen = modifierVariables.filter(item => !item.getPlaceholdersWithoutConditions.length && item.imageGen);
	const modifierWithRef = modifierWithPlaceholder.filter(vItem => {
		const arr = vItem.getPlaceholdersWithoutConditions;
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < modifierWithPlaceholder.length; j++) {
				if (modifierWithPlaceholder[j].placeholderName === arr[i]) {
					return modifierWithPlaceholder.splice(i, 1);
				}
			}
		}
	});

	dateFieldVariables.forEach((item: IVariable, vIndex: number) => {
		const targetId: string = item.placeholderName;
		const position: XYPosition = item.additionalSource ?
			{ x: 400, y: vIndex * 100 + 200 } :
			{ x: 0, y: vIndex * 100 - 0 };
		const type: string = "DataField";

		nodes.push(createNode<IVariable>(item, position, targetId, type));
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
		item.additionalSource && addEdge(item.additionalSource, edges, targetId);
	});

	data.additionalSources.additionalSources.forEach((item: IAdditionalSource) => {
		const targetId: string = String(item.id);
		const position: XYPosition = { x: 200, y: nodes.length * 100 - 300 };
		const type: string = item.__typename;

		nodes.push(createNode<IAdditionalSource>(item, position, targetId, type));
		addEdge([item.mappingField], edges, targetId);
	});

	modifierWithoutPlaceholderAndImageGen.forEach((item: IVariable) => {
		const targetId: string = item.placeholderName;
		const position: XYPosition = { x: 600, y: nodes.length * 100 };
		const type: string = "Modifier";


		nodes.push(createNode<IVariable>(item, position, targetId, type));
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
	});

	modifierWithPlaceholder.forEach((item: IVariable) => {
		const targetId: string = item.placeholderName;
		const position: XYPosition = { x: 800, y: nodes.length * 100 };
		const type: string = "Modifier";

		nodes.push(createNode<IVariable>(item, position, targetId, type));
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
	});


	modifierWithRef.forEach((item: IVariable) => {
		const targetId: string = item.placeholderName;
		const position: XYPosition = { x: 1000, y: nodes.length * 100 };
		const type: string = "Modifier";

		nodes.push(createNode<IVariable>(item, position, targetId, type));
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
	});

	modifierWithImageGen.forEach((item: IVariable) => {
		const targetId: string = item.placeholderName;
		const position: XYPosition = { x: 1200, y: nodes.length * 100 };
		const type: string = "Modifier";

		nodes.push(createNode<IVariable>(item, position, targetId, type));
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
		item.imageGen && addEdge(item.imageGen.getPlaceholdersWithoutConditions, edges, targetId);
	});

	data.feedExports.feedExports.forEach((item: IFeedExport, index: number) => {
		const targetId: string = String(item.id);
		const position: XYPosition = { x: 1400, y: index * 100 };
		const type: string = item.__typename;

		nodes.push(createNode<IFeedExport>(item, position, targetId, type));
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
	});

	data.campaignSettings.campaignSettings.forEach((item: ICampaignSetting) => {
		let uniqValueArr: string[] = [];
		const sortBaseAsText = item.baseAdtexts.sort((a, b) => (
			(a.id > b.id) ? 1 : -1
		));

		const targetId: string = String(item.id);
		const position: XYPosition = { x: 800, y: 500 };
		const type: string = item.__typename;
		

		item.keywordSettings.forEach((kItem: IKeywordSetting, index: number) => {
			const targetId: string = String(kItem.id);
			const position: XYPosition = { x: 1400, y: index * 100 + 400 };
			const type: string = kItem.__typename;
			

			nodes.push(createNode<IKeywordSetting>(kItem, position, targetId, type));
			addEdge(kItem.getPlaceholdersWithoutConditions, edges, targetId);
			addEdge([String(item.id)], edges, targetId);
		});

		
		sortBaseAsText.forEach((bItem: IBaseAdtext, index: number) => {
			const targetId: string = String(bItem.id);
			const position: XYPosition = { x: index * 120 + 1400, y: index * 150 + 700 };
			const type: string = index === sortBaseAsText.length - 1 ? item.__typename : bItem.__typename;
			

			nodes.push(createNode<IBaseAdtext>(
				bItem,
				position,
				targetId,
				type
			));
			addEdge(bItem.getPlaceholdersWithoutConditions, edges, targetId);
			addEdge([String(bItem.parentId)], edges, targetId);
			addEdge([String(item.id)], edges, targetId);
		});

		item.bidRules.forEach((bidItem: IBidRule, index: number) => {
			const targetId: string = String(bidItem.id);
			const position: XYPosition = { x: 1400, y: index * 150 + 1200 };
			const type: string = bidItem.__typename;

			nodes.push(createNode<IBidRule>(bidItem, position, targetId, type));
			addEdge(bidItem.getConditionsPlaceholders, edges, targetId);
			addEdge([String(item.id)], edges, targetId);
		});

		nodes.push(createNode<ICampaignSetting>(item, position, targetId, type));

		uniqValueArr = [...new Set([
			...item.getConditionsPlaceholders, 
			...item.getPlaceholdersWithoutConditions
		])];
		
		addEdge(uniqValueArr, edges, targetId);
	});

	return { nodes, edges }
}
