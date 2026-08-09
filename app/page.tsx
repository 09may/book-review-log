import Link from "next/link";
import { books } from "@/data/books";

const Home = () => {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-2xl font-semibold">Book Review Log</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {books.map((book) => (
          <li key={book.slug}>
            <Link
              href={`/books/${book.slug}`}
              className="block rounded-lg border border-zinc-200 p-4 hover:border-zinc-400"
            >
              <p className="font-medium">{book.title}</p>
              <p className="text-sm text-zinc-600">{book.author}</p>
              <p className="text-sm text-zinc-600">⭐ {book.rating}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
