import { useState } from "react";
import { useUserManager } from "./UserManager"
import { getErrorMessage } from "./utils";

import Error from "./pages/Error"
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Loading from "./pages/Loading";

export default function App() {
    const userManager = useUserManager();
    const [error, setError] = useState<string>();

    userManager.init()
        .catch(e => setError(getErrorMessage(e)));

    if (error) {
        return <Error message={error} />;
    }
    if (userManager.isLoading) {
        return <Loading />
    }

    if (userManager.isLoggedIn) {
        return <Profile userManager={userManager} />
    }
    return <Login userManager={userManager} />;
}
