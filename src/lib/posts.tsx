import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import type { Post } from "@/lib/interfaces";
import type { Graph } from "reagraph";

const postsDir = join(process.cwd(), "posts");

export function getAllSlugs() {
  const slugs = fs.readdirSync(postsDir).map(file => file.replace(/\.md$/, ""));
  return slugs;
}

export function getPost(slug: string) {
  const fullPath = join(postsDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { ...data, content, slug } as Post;
}

function getAllPosts() {
  return getAllSlugs().map(slug => getPost(slug));
}

function getAllUniqueTags() {
  const posts = getAllPosts();
  const tags = posts.flatMap(post => post.tags);
  return Array.from(new Set(tags));
}

export function getNodesAndEdges() {
  const postNodes = getAllPosts().map(post => ({
    id: post.slug,
    label: post.title,
    data: { type: 'post' }
  }));
  const tagNodes = getAllUniqueTags().map(tag => ({
    id: tag,
    label: tag,
    fill: "blue",
    size: 8,
    data: { type: 'tag' }
  }));
  const nodes = [...postNodes, ...tagNodes];
  const edges = getAllPosts().flatMap(post => 
    post.tags.map(tag => ({
      source: tag,
      target: post.slug,
      id: `${tag}->${post.slug}`,
    }))
  );
  return { nodes, edges } as Graph;
}