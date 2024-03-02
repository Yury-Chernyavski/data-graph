import { Handle, Position } from "reactflow";
import { Node } from "@/theme/";

export const ModifierNode = ({
	data,
}: {
	data: { label: string };
}): JSX.Element => {
	return (
		<Node className="modifier">
			<Handle
				type="target"
				position={Position.Left}
			/>
			<div>
				<label>{data.label}</label>
			</div>
			<Handle
				type="source"
				position={Position.Right}
			/>
		</Node>
	);
};
