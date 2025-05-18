import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

import { App as CapacitorApp } from "@capacitor/app";
import { useEffect } from "react";
import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import useAttachBackBtn from "./hooks/useAttachBackBtn";
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
      <body className="h-screen w-screen">
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
    };
    hideSplashLoader();
    document.addEventListener("DOMContentLoaded", hideSplashLoader);
    return () =>
      document.removeEventListener("DOMContentLoaded", hideSplashLoader);
  }, []);

  const navigate = useNavigate();

  useAttachBackBtn(({ canGoBack }) => {
    const body = document.body;

    const isPopoverOpen =
      !!body.querySelector("span[data-radix-focus-guard]") ||
      body.getAttribute("data-scroll-locked") === "1";

    if (isPopoverOpen) return;
    if (canGoBack) navigate(-1);
    else {
      CapacitorApp.minimizeApp();
    }
  }, []);

  return (
    <AppLayout>
      <Outlet />
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
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
