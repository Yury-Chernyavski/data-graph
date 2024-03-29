import { fetchData } from "@/api";
import {
	AdditionalSourceNode,
	BaseAdNode,
	BidRuleNode,
	CampaignNode,
	DataField,
	FeedExportNode,
	KeywordNode,
	ModifierNode,
} from "@/components";
import { convertToNode } from "@/features/convertToNode";
import { IData } from "@/models";
import { FC, useCallback, useEffect, useState } from "react";
import ReactFlow, {
	Background,
	Connection,
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";

const nodeTypes = {
	DataField: DataField,
	Modifier: ModifierNode,
	AdditionalSource: AdditionalSourceNode,
	FeedExport: FeedExportNode,
	CampaignSetting: CampaignNode,
	KeywordSetting: KeywordNode,
	BaseAdtext: BaseAdNode,
	BidRule: BidRuleNode,
};

const App: FC = () => {
	const [nodes, setNodes] = useState<Node[] | []>([]);
	const [edges, setEdges] = useState<Edge[] | []>([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await fetchData<IData>();

				if (res) {
					const data = convertToNode(res.data);
					// const data2 = convertToNode2(res.data);
					
					setNodes(data.nodes);
					setEdges(data.edges);
				}
			} catch (err) {
				console.log(err);
			}
		};

		getData();
	}, []);

	const onNodesChange = useCallback(
		(changes: NodeChange[]) =>
			setNodes(oldNodes => applyNodeChanges(changes, oldNodes)),
		[],
	);

	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) =>
			setEdges(oldEdges => applyEdgeChanges(changes, oldEdges)),
		[],
	);

	const onConnect = useCallback(
		(params: Edge | Connection) => {
			setEdges(oldEdges => addEdge(params, oldEdges));
		},
		[setEdges],
	);

	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}>
				<Background
					color="white"
					gap={16}
				/>
			</ReactFlow>
		</div>
	);
};

export default App;
