import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router";
import UserManager, { useUserManager } from "./UserManager"
import { getErrorMessage } from "./utils";

import Error from "./pages/Error"
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Loading from "./pages/Loading";
import Password from "./pages/Password";
import Mojang from "./pages/Mojang";

export default function App() {
    const userManager = useUserManager();
    const [error, setError] = useState<string>();

    userManager.init()
        .catch(e => setError(getErrorMessage(e)));

    if (error) {
        return <Error message={error} />;
    }
    if (userManager.isLoading) {
        return <Loading />;
    }

    if (userManager.isLoggedIn) {
        if (userManager.userData.passwordResetRequired) {
            return (
                <HashRouter><Password userManager={userManager} forceChange /></HashRouter>
            );
        }
        return <Main userManager={userManager} />;
    }
    return <Login userManager={userManager} />;
}

function Main({userManager}: {userManager: UserManager}) {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<Profile userManager={userManager} />} />
                <Route path="/password" element={<Password userManager={userManager} forceChange={false} />} />
                <Route path="/mojang" element={<Mojang userManager={userManager} />} />
            </Routes>
        </HashRouter>
    );
}
