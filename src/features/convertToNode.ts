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
import { Edge, Node, Position, XYPosition } from "reactflow";

type TGeneralTypes = IVariable |
	IAdditionalSource |
	IFeedExport |
	ICampaignSetting |
	IKeywordSetting |
	IBaseAdtext |
	IBidRule;

interface ISubAdditionalSource {
	id: number;
	__typename: string
}

const createNode = <T extends TGeneralTypes>(
	item: T,
	style: {
		backgroundColor: string,
		borderColor?: string,
		height?: number
	},
	position: XYPosition,
	targetId: string,
	sourcePosition: Position = Position.Right,
	targetPosition: Position = Position.Left
): Node => {
	return {
		id: targetId,
		data: { label: item.name },
		position,
		style,
		sourcePosition,
		targetPosition
	}
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
					modifierWithPlaceholder.splice(i, 1);
					return arr[i];
				}
			}
		}
	});

	dateFieldVariables.forEach((item: IVariable, vIndex: number) => {
		const targetId = item.placeholderName;
		const position = item.additionalSource ?
			{ x: 400, y: vIndex * 100 + 200 } :
			{ x: 0, y: vIndex * 100 - 0 };
		const style = { backgroundColor: "#448edc" };
		const elem = createNode<IVariable>(item, style, position, targetId);

		nodes.push(elem);
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
		item.additionalSource && addEdge(item.additionalSource, edges, targetId);
	});

	data.additionalSources.additionalSources.forEach((item: IAdditionalSource) => {
		const targetId = String(item.id);
		const position = { x: 200, y: nodes.length * 100 - 300 };
		const style = { backgroundColor: "#ffdaaa" };

		nodes.push(createNode<IAdditionalSource>(item, style, position, targetId));
		addEdge([item.mappingField], edges, targetId);
	});

	modifierWithoutPlaceholderAndImageGen.forEach((item: IVariable) => {
		const targetId = item.placeholderName;
		const position = { x: 600, y: nodes.length * 100 };
		const style = { backgroundColor: "#9bcc63" };


		nodes.push(createNode<IVariable>(item, style, position, targetId));
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
	});

	modifierWithPlaceholder.forEach((item: IVariable) => {
		const targetId = item.placeholderName;
		const position = { x: 800, y: nodes.length * 100 }
		const style = { backgroundColor: "#9bcc63" };


		nodes.push(createNode<IVariable>(item, style, position, targetId));
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
	});


	modifierWithRef.forEach((item: IVariable) => {
		const targetId = item.placeholderName;

		const position = { x: 1000, y: nodes.length * 100 };
		const style = { backgroundColor: "#9bcc63" };


		nodes.push(createNode<IVariable>(item, style, position, targetId));
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
	});

	modifierWithImageGen.forEach((item: IVariable) => {
		const targetId = item.placeholderName;

		const position = { x: 1200, y: nodes.length * 100 };
		const style = { backgroundColor: "#9bcc63" };


		nodes.push(createNode<IVariable>(item, style, position, targetId));
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
		item.imageGen && addEdge(item.imageGen.getPlaceholdersWithoutConditions, edges, targetId);
	});

	data.feedExports.feedExports.forEach((item: IFeedExport, index: number) => {
		const targetId = String(item.id);
		const position = { x: 1400, y: index * 100 };
		const style = {
			backgroundColor: "#f1f1f1",
			borderColor: "#fe689d",
			height: 70,
		};

		nodes.push(createNode<IFeedExport>(item, style, position, targetId));
		addEdge(item.getPlaceholdersWithoutConditions, edges, targetId);
	});

	data.campaignSettings.campaignSettings.forEach((item: ICampaignSetting) => {
		let uniqValueArr: string[] = [];
		const sortBaseAsText = item.baseAdtexts.sort((a, b) => (
			(a.id > b.id) ? 1 : -1
		));

		const targetId = String(item.id);
		const position = { x: 800, y: 500 };
		const style = {
			backgroundColor: "#f1f1f1",
			height: 70,
		};

		item.keywordSettings.forEach((kItem: IKeywordSetting, index: number) => {
			const targetId = String(kItem.id);
			const position = { x: 1400, y: index * 100 + 400 };
			const style = {
				backgroundColor: "#f1f1f1",
				borderColor: "#fe689d",
				height: 70,
			};

			nodes.push(createNode<IKeywordSetting>(kItem, style, position, targetId));
			addEdge(kItem.getPlaceholdersWithoutConditions, edges, targetId);
			addEdge([String(item.id)], edges, targetId);
		});

		
		sortBaseAsText.forEach((bItem: IBaseAdtext, index: number) => {
			const targetId = String(bItem.id);
			const position = { x: index * 100 + 1400, y: index * 100 + 700 };
			const style = {
				backgroundColor: "#f1f1f1",
				borderColor: "#fe689d",
				height: 70,
			};

			nodes.push(createNode<IBaseAdtext>(
				bItem,
				style,
				position,
				targetId,
				Position.Bottom,
				Position.Left,
			));
			addEdge(bItem.getPlaceholdersWithoutConditions, edges, targetId);
			addEdge([String(bItem.parentId)], edges, targetId);
			addEdge([String(item.id)], edges, targetId);
		});

		item.bidRules.forEach((kItem: IBidRule, index: number) => {
			const targetId = String(kItem.id);
			const position = { x: 1400, y: index * 100 + 1100 };
			const style = {
				backgroundColor: "#f1f1f1",
				borderColor: "#fe689d",
				height: 70,
			};

			nodes.push(createNode<IBidRule>(kItem, style, position, targetId));
			addEdge(kItem.getConditionsPlaceholders, edges, targetId);
			addEdge([String(item.id)], edges, targetId);
		});

		nodes.push(createNode<ICampaignSetting>(item, style, position, targetId));

		uniqValueArr = [...new Set([
			...item.getConditionsPlaceholders, 
			...item.getPlaceholdersWithoutConditions
		])];
		
		addEdge(uniqValueArr, edges, targetId);
	});

	return { nodes, edges }
}
