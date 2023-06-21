import {
    useRouteError,
    isRouteErrorResponse
} from "react-router-dom"

function ErrorComponent() {

    let error = useRouteError();
    console.log(error);

    if (isRouteErrorResponse(error) && error.status === 401) {
        // the response json is automatically parsed to
        // `error.data`, you also have access to the status
        return (
            <div>
                <h1>{error.status}</h1>
                <h2>{error.data.sorry}</h2>
                <p>
                    Go ahead and email {error.data.hrEmail} if you
                    feel like this is a mistake.
                </p>
            </div>
        )
    }
}

export default ErrorComponent