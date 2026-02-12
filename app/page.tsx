import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import SnippetForm from "@/components/snippetForm";

export default async function Home() {
  const user = await currentUser();
  if (!user) return <div className="flex justify-center">Sign in to post</div>;

  const snippets = await prisma.snippet.findMany({
    where: { author: { clerkId: user.id } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-2xl mx-auto p-4">
      <SnippetForm />
      <div className="mt-8">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="p-4 border border-zinc-800 rounded mt-4"
          >
            <h2 className="font-bold">{snippet.title}</h2>
            <p className="mt-2">{snippet.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
