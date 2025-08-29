import type { GraphNode, GraphEdge } from 'reagraph';

export interface Post {
  title: string;
  date: string;
  content: string;
  slug: string;
  tags: string[];
};

export interface PostsNetworkProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
};