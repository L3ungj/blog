"use client";

import dynamic from 'next/dynamic';
import { darkTheme, GraphCanvasProps } from 'reagraph';
import { useRouter } from 'next/navigation';

const GraphCanvas = dynamic(
  () => import('reagraph').then((mod) => mod.GraphCanvas),
  { ssr: false }
);

export default function PostsNetwork({ nodes, edges }: GraphCanvasProps) {
  const router = useRouter();
  return (
    <div className="h-full w-full relative">
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        theme={darkTheme}
        onNodeClick={({ id, data }) => {
          if (data.type === 'post') {
            router.push(`/post/${id}`);
          }
        }}
      />
    </div>
  );
}