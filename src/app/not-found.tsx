import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <div className="text-center">
        <h1 className="mb-4 font-heading text-9xl font-bold text-blue-600">
          404
        </h1>
        <h2 className="mb-4 font-heading text-3xl font-semibold text-gray-900 md:text-4xl">
          Page Not Found
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="rounded-full border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
