import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText: string;
  message: string;
}

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  function isRouteError(obj: any): obj is RouteError {
    return (
      typeof obj === "object" &&
      obj !== null &&
      ("statusText" in obj || "message" in obj)
    );
  }

  if (!isRouteError(error)) {
    return <div>Error Occured!</div>;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
