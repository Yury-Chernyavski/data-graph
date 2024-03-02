import { Handle, Position } from "reactflow";
import { Node } from "@/theme/";

export const FeedExportNode = ({
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
				<label>{data.label}</label>
			</div>
		</Node>
	);
};
