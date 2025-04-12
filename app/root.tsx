import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { useEffect, useState } from "react";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import SearchProvider from "./Contexts/SearchContext";
import AppLayout from "./Layouts/AppLayout";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-screen h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    const hideSplashLoader = () => {
      if (
        window.Capacitor &&
        window.Capacitor.Plugins &&
        window.Capacitor.Plugins.SplashScreen
      ) {
        window.Capacitor.Plugins.SplashScreen.hide();
      }

      if (window?.Capacitor?.Plugins?.LiveUpdate) {
        window.Capacitor.Plugins.LiveUpdate.checkForUpdate().then((result) => {
          if (result.available) {
            window.Capacitor.Plugins.LiveUpdate.downloadUpdate().then(() => {
              window.Capacitor.Plugins.LiveUpdate.extractUpdate().then(() => {
                window.Capacitor.Plugins.LiveUpdate.reload();
              });
            });
          }
        });
      }
    };
    hideSplashLoader();
    document.addEventListener("DOMContentLoaded", hideSplashLoader);
    return () =>
      document.removeEventListener("DOMContentLoaded", hideSplashLoader);
  }, []);
  const [search, setSearch] = useState("");

  return (
    <AppLayout>
      <SearchProvider value={{ search, setSearch }}>
        <Outlet />
      </SearchProvider>
    </AppLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
