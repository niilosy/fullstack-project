import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-4xl text-gray-900 font-bold mb-4">Niilos financial dashboard</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your dashboard for managing invoices
      </p>
      <Link
        href="/login"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </main>
  );
}

