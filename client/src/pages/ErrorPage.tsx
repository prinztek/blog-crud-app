import { Link } from "react-router-dom";

const ErrorPage = ({ statusCode = 404, message = "Page Not Found" }) => {
  return (
    <main className="flex flex-col items-center justify-center mx-auto my-auto p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {statusCode} - {message}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you're looking for does not exist.
      </p>
      <Link
        to="/"
        className="text-blue-500 hover:text-blue-700 text-lg font-medium"
      >
        Go back to Home
      </Link>
    </main>
  );
};

export default ErrorPage;
