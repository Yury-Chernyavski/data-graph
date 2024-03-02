import { TUnionOfInterface } from "@/models";
import { Node, XYPosition } from "reactflow";

export const createNode = <T extends TUnionOfInterface>(
	item: T,
	position: XYPosition,
	targetId: string,
	type: string
): Node => {
	return {
		id: targetId,
		data: { label: item.name },
		position,
		type
	}
};
