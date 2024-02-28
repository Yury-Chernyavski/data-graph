import { convertToNode } from "@/features/convertToNode";
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
import data from "../../../example.json";
import "./App.css";

const App: FC = () => {
	// const [data, setData] = useState<IData | null>(null);
	// const [elements, setElements] = useState<{nodes: Node[], edges: Edge[]}>({nodes: [], edges: []})
	const [nodes, setNodes] = useState<Node[] | []>([]);
	const [edges, setEdges] = useState<Edge[] | []>([]);

	// useEffect(() => {
	// 	const getData = async () => {
	// 		try {
	// 			const res = await fetchData<IData>();

	// 			if (res) {
	// 				console.log(res.data);
					
	// 				setNodes(convertToNode(res.data).nodes)
	// 			}
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};

	// 	getData();
	// }, []);

	useEffect(() => {
		setNodes(convertToNode(data.data).nodes);
		setEdges(convertToNode(data.data).edges);
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
		(params: Edge | Connection) =>
			setEdges(oldEdges => addEdge(params, oldEdges)),
		[setEdges],
	);


	console.log(nodes, edges);
	
	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}>
				<Background
					color="white"
					gap={16}
				/>
			</ReactFlow>
		</div>
	);
};

export default App;
