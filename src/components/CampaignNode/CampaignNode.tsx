import { Handle, Position } from "reactflow";
import { Node } from "@/theme/";

export const CampaignNode = ({
	data,
}: {
	data: { label: string };
}): JSX.Element => {
	return (
		<Node className="campaign">
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
