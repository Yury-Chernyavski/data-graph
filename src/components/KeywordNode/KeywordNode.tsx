import { Handle, Position } from "reactflow";
import { Node } from "@/theme/";

export const KeywordNode = ({
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
				<label>KW: {data.label}</label>
			</div>
		</Node>
	);
};
