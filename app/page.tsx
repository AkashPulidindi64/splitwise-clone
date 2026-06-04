import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">
        Splitwise Clone
      </h1>

      <p className="text-gray-600 mb-8">
        Expense Sharing Application
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="bg-white border border-black px-6 py-3 rounded-lg"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}