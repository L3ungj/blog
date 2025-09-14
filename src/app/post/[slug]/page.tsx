import { getAllSlugs, getPost } from '@/lib/posts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import LorenzAttractor from '@/components/lorenz';

function customParagraph(label: React.ReactNode) {
  if (typeof label !== 'string') {
    return <p className="my-4">{label}</p>;
  }
  switch (label) {
    case '[LorenzAttractor]':
      return (
        <div className="w-full h-[50vh] -z-10">
          <LorenzAttractor />
        </div>
      );
    default:
      return <p className="my-4">{label}</p>;
  }
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <article>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-6">{post.date}</p>
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold my-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-bold my-3" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-lg font-bold my-2" {...props} />,
            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
            a: ({ node, ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
            li: ({ node, ...props }) => <li className="list-disc list-inside ml-4 my-1" {...props} />,
            p: ({ node, children }) => customParagraph(children),
          }}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map(slug => ({ slug }));
}