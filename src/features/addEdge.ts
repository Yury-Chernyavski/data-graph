import { Edge } from "reactflow";

export const createEdge = (
	source: string,
	target: string
): Edge => {
	return { id: `${source}-${target}`, source, target }
};
