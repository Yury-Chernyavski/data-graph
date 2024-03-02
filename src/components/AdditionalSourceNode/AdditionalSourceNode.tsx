import { Handle, Position } from "reactflow";
import { Node } from "@/theme";

export const AdditionalSourceNode = ({
	data,
}: {
	data: { label: string };
}): JSX.Element => {
	return (
		<Node className="additionalSource">
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
