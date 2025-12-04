import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { init } = usePuterStore();

  useEffect(() => {
    init()
  }, [init]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script src="https://js.puter.com/v2/"></script>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const navigate = useNavigate();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  let is404 = false;

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404;
    message = is404 ? "404" : `Error ${error.status}`;
    details = is404
      ? "The page you're looking for doesn't exist."
      : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className={`${is404 ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-red-500 to-pink-600'} p-8 text-white`}>
            <div className="flex items-center justify-center mb-4">
              {is404 ? (
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <h1 className="text-5xl font-bold text-center mb-2">{message}</h1>
            <p className="text-xl text-center text-white/90">{details}</p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                ← Go Back
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200"
              >
                🏠 Home
              </button>
            </div>

            {/* Helpful Links */}
            {is404 && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3">Here are some helpful links:</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center">
                      <span className="mr-2">→</span> Return to homepage
                    </a>
                  </li>
                  <li>
                    <button onClick={() => window.location.reload()} className="text-blue-600 hover:text-blue-700 hover:underline flex items-center">
                      <span className="mr-2">→</span> Refresh the page
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Stack Trace (Dev Only) */}
            {stack && (
              <details className="mt-6 group">
                <summary className="cursor-pointer bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                  <span className="inline-block transform group-open:rotate-90 transition-transform mr-2">▶</span>
                  View Technical Details
                </summary>
                <div className="mt-3 bg-gray-900 rounded-lg overflow-hidden">
                  <pre className="p-4 overflow-x-auto text-sm text-green-400 font-mono">
                    <code>{stack}</code>
                  </pre>
                </div>
              </details>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          If this problem persists, please contact support
        </p>
      </div>
    </div>
  );
}