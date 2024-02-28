import { IAdditionalSource, IData, IFeedExport, IVariable } from "@/models";
import { Edge, Node, Position } from "reactflow";


export const convertToNode = (data: IData): { nodes: Node[], edges: Edge[] } => {
	const nodes: Node[] = [];
	const edges: Edge[] = [];

	data.variables.variables.forEach((item: IVariable, vIndex: number) => {
		// const nodeId = item.id.match(/-?\d+(\.\d+)?/g) as string[];
		const nodeId = item.name
		
		if (item.id.includes("DataField")) {
			nodes.push({
				id: nodeId,
				data: { label: item.name },
				position: item.additionalSource ?
					{ x: 400, y: vIndex * 100 - 400 } :
					{ x: 0, y: vIndex * 100 - 600 },
				style: { backgroundColor: "#448edc" },
				targetPosition: Position.Left,
				sourcePosition: Position.Right,
			});
		} else {
			// if ()
			nodes.push({
				id: nodeId,
				data: { label: item.name },
				position: item.getPlaceholdersWithoutConditions.length ?
					{ x: 800, y: 800 - (vIndex * -1 * 100) } :
					{ x: 600, y: 800 - (vIndex * -1 * 100) },
				style: { backgroundColor: "#9bcc63" },
				targetPosition: Position.Left,
				sourcePosition: Position.Right,
			});
		}

		item.getPlaceholdersWithoutConditions.forEach((placeholder: string) => {
			const targetId = placeholder;
			edges.push({ id: `${targetId}-${nodeId}`, source: targetId, target: nodeId })
		});

		item.imageGen?.getPlaceholdersWithoutConditions.forEach((placeholder: string) => {
			const targetId = placeholder;
			edges.push({ id: `${targetId}-${nodeId}`, source: targetId, target: nodeId })
		});
	});

	data.feedExports.feedExports.forEach((item: IFeedExport, index: number) => {
		const nodeId = String(item.name);
		nodes.push({
			id: nodeId,
			data: { label: item.name },
			position: { x: 1000, y: index * 100 + 500 },
			style: {
				backgroundColor: "#f1f1f1",
				borderColor: "#fe689d"
			},
			targetPosition: Position.Left,
			sourcePosition: Position.Right,
		});

		item.getPlaceholdersWithoutConditions.forEach((placeholder: string) => {
			const targetId = placeholder;
			edges.push({ id: `${targetId}-${nodeId}`, source: targetId, target: nodeId })
		});
	});

	data.additionalSources.additionalSources.forEach((item: IAdditionalSource, index: number) => {
		const nodeId = String(item.name);
		nodes.push({
			id: nodeId,
			data: { label: item.name },
			position: { x: 200, y: index * 100 + 1000 },
			targetPosition: Position.Left,
			sourcePosition: Position.Right,
			style: {
				backgroundColor: "#ffdaaa",
			},
		});
	});

	return { nodes, edges }
}
