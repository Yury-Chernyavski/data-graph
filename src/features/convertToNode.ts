import { createEdge } from "@/features/addEdge";
import { createNode } from "@/features/createNode";
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

// TODO: unify the function

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
		item.getPlaceholdersWithoutConditions.forEach(el => {
			edges.push(createEdge(el, targetId));
		});
		item.additionalSource && edges.push(createEdge(String(item.additionalSource.id), targetId));
	});

	data.additionalSources.additionalSources.forEach((item: IAdditionalSource) => {
		const targetId: string = String(item.id);
		const position: XYPosition = { x: 200, y: nodes.length * 100 - 300 };
		const type: string = item.__typename;

		nodes.push(createNode<IAdditionalSource>(item, position, targetId, type));
		edges.push(createEdge(item.mappingField, targetId));
	});

	modifierWithoutPlaceholderAndImageGen.forEach((item: IVariable) => {
		const targetId: string = item.placeholderName;
		const position: XYPosition = { x: 600, y: nodes.length * 100 };
		const type: string = "Modifier";


		nodes.push(createNode<IVariable>(item, position, targetId, type));
		item.getConditionsPlaceholders.forEach(el => {
			edges.push(createEdge(el, targetId));
		})
	});

	modifierWithPlaceholder.forEach((item: IVariable) => {
		const targetId: string = item.placeholderName;
		const position: XYPosition = { x: 800, y: nodes.length * 100 };
		const type: string = "Modifier";

		nodes.push(createNode<IVariable>(item, position, targetId, type));
		item.getPlaceholdersWithoutConditions.forEach(el => {
			edges.push(createEdge(el, targetId));
		})
	});


	modifierWithRef.forEach((item: IVariable) => {
		const targetId: string = item.placeholderName;
		const position: XYPosition = { x: 1000, y: nodes.length * 100 };
		const type: string = "Modifier";

		nodes.push(createNode<IVariable>(item, position, targetId, type));
		item.getPlaceholdersWithoutConditions.forEach(el => {
			edges.push(createEdge(el, targetId));
		});
	});

	modifierWithImageGen.forEach((item: IVariable) => {
		const targetId: string = item.placeholderName;
		const position: XYPosition = { x: 1200, y: nodes.length * 100 };
		const type: string = "Modifier";

		nodes.push(createNode<IVariable>(item, position, targetId, type));
		item.getPlaceholdersWithoutConditions.forEach(el => {
			edges.push(createEdge(el, targetId));
		});
		item.imageGen && item.imageGen.getPlaceholdersWithoutConditions.forEach(el => {
			edges.push(createEdge(el, targetId));
		})
	});

	data.feedExports.feedExports.forEach((item: IFeedExport, index: number) => {
		const targetId: string = String(item.id);
		const position: XYPosition = { x: 1400, y: index * 100 };
		const type: string = item.__typename;

		nodes.push(createNode<IFeedExport>(item, position, targetId, type));
		item.getPlaceholdersWithoutConditions.forEach(el => {
			edges.push(createEdge(el, targetId));
		});
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
			kItem.getPlaceholdersWithoutConditions.forEach(el => {
				edges.push(createEdge(el, targetId));
			});
			edges.push(createEdge(String(item.id), targetId));
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
			bItem.getPlaceholdersWithoutConditions.forEach(el => {
				edges.push(createEdge(el, targetId));
			})
			edges.push(createEdge(String(bItem.parentId), targetId));
			edges.push(createEdge(String(item.id), targetId));
		});

		item.bidRules.forEach((bidItem: IBidRule, index: number) => {
			const targetId: string = String(bidItem.id);
			const position: XYPosition = { x: 1400, y: index * 150 + 1200 };
			const type: string = bidItem.__typename;

			nodes.push(createNode<IBidRule>(bidItem, position, targetId, type));
			bidItem.getConditionsPlaceholders.forEach(el => {
				edges.push(createEdge(el, targetId));
			});
			edges.push(createEdge(String(item.id), targetId));
		});

		nodes.push(createNode<ICampaignSetting>(item, position, targetId, type));

		uniqValueArr = [...new Set([
			...item.getConditionsPlaceholders,
			...item.getPlaceholdersWithoutConditions
		])];

		uniqValueArr.forEach(el => {
			edges.push(createEdge(el, targetId));
		});
	});

	return { nodes, edges }
}
