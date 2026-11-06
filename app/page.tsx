import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-center text-4xl font-semibold
      text-zinc-950 sm:text-5xl">
        Welcome to my blog.
      </h1>
      <Link href="/postes" className="underline">
        View Posts
      </Link>
    </main>
  );
}
