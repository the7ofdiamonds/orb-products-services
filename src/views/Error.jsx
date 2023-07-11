import { useRouteError } from 'react-router-dom';

function ErrorComponent() {
  const error = useRouteError();
  console.log(error);

  if (error && error.status === 401) {
    // Customize the error component for status 401
    return (
      <div>
        <h1>{error.status}</h1>
        <h2>{error.data.sorry}</h2>
        <p>
          Go ahead and email {error.data.hrEmail} if you
          feel like this is a mistake.
        </p>
      </div>
    );
  }

  // Default error component for other error cases
  return <div>Oops! Something went wrong.</div>;
}

export default ErrorComponent;