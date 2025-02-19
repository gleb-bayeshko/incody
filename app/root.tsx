import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import "./assets/styles/index.css";
import Navbar from "./components/widgets/Navbar";
import Footer from "./components/widgets/Footer";
import Wrapper from "./components/ui/Wrapper";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
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
  let message = "Что-то пошло не так";
  let details = "Произошла ошибка";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Что-то пошло не так";
    details =
      error.status === 404
        ? "Запрашиваемая страница не найдена"
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
  }

  return (
    <main>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Navbar />
        <Wrapper>
          <div className="flex justify-center items-center h-full">
            <div>
              <h1 className="text-[100px] text-center">{message}</h1>
              <p className="text-center">{details}</p>
              <Link to="/" className="flex justify-center">
                <button className="btn btn-outline mt-6">
                  Вернуться на главную
                </button>
              </Link>
            </div>
          </div>
        </Wrapper>
        <Footer />
      </div>
    </main>
  );
}
