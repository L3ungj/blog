import PostsNetwork from "@/components/PostsNetwork";
import { getNodesAndEdges } from "@/lib/posts";

export default function Posts() {
  const { nodes, edges } = getNodesAndEdges();

  return (
    <div className="w-screen h-[80vh]">
      <PostsNetwork
        nodes={nodes}
        edges={edges}
      />
    </div>
  );
}
