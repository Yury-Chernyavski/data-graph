import { Handle, Position } from "reactflow";
import { Node } from "@/theme/";

export const BaseAdNode = ({
	data,
}: {
	data: { label: string };
}): JSX.Element => {
	return (
		<Node className="pinkBorder">
			<Handle
				type="target"
				position={Position.Left}
			/>
			<div>
				<label>AD: {data.label}</label>
			</div>
			<Handle
				type="source"
				position={Position.Bottom}
			/>
		</Node>
	);
};
