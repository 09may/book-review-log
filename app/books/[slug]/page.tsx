import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { books } from "@/data/books";

export const generateStaticParams = () => {
  return books.map((book) => ({ slug: book.slug }));
};

export const generateMetadata = async ({
  params,
}: PageProps<"/books/[slug]">): Promise<Metadata> => {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);

  if (!book) {
    return {};
  }

  return {
    title: book.title,
    description: `${book.review.slice(0, 50)}...`,
  };
};

const BookDetailPage = async ({ params }: PageProps<"/books/[slug]">) => {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);

  if (!book) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm text-zinc-600 hover:underline">
        ← 홈으로
      </Link>

      <h1 className="mt-4 text-2xl font-semibold">{book.title}</h1>
      <p className="mt-1 text-zinc-600">{book.author}</p>
      <p className="mt-1 text-zinc-600">⭐ {book.rating}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {book.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600"
          >
            {tag}
          </li>
        ))}
      </ul>

      <p className="mt-6 leading-relaxed whitespace-pre-line">{book.review}</p>
    </main>
  );
};

export default BookDetailPage;
