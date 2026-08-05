import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    window.location.reload();
    window.location.href = "/";
  }, []);

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {/* 404 */}
        <h1 className="text-8xl font-extrabold tracking-tight text-purple-600">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist, may have been moved, or the
          URL might be incorrect.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
