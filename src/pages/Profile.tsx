import loc from '../loc';
import { useState } from 'react';
import type UserManager from "../UserManager";
import Window from "../components/Window";
import Input from "../components/Input";
import SkinPreview from "./elements/SkinPreview";

import styles from "./Profile.module.scss";
import SkinSelector from "./elements/SkinSelector";
import FooterDownload from "./elements/FooterDownload";
import MojangProfile from "./elements/MojangProfile";

export default function Profile({userManager}: {userManager: UserManager}) {
    const [loading, setLoading] = useState(false);

    const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        userManager.logout()
            .catch(() => alert(loc`Error logging out`))
            .finally(() => setLoading(false));
    };

    return (
        <Window cssMaxWidth="800px" activeTab="account" footer={<FooterDownload />} className={loading ? 'loading-overlay' : undefined}>
            <Window.Tab id="account" header={loc`Account`} className={styles.tabAccount}>
                <div>{loc`Hello, ${{name: userManager.userData.name}}!`}</div>
                {userManager.userData.mojangUUID ? <MojangProfile uuid={userManager.userData.mojangUUID} /> : null}
                <Input type="route" name={userManager.userData.mojangUUID ? loc`Change license` : loc`Link license`} value="/mojang" style={{maxWidth: '100%'}} />
                <Input type="route" name={loc`Change password`} value="/password" style={{maxWidth: '100%'}} />
                <form onSubmit={handleLogout} inert={loading}>
                    <Input type="submit" name="logout" value={loc`Logout`} style={{maxWidth: '100%'}} />
                </form>
            </Window.Tab>
            <Window.Tab id="skin" header={loc`Skin`} className={styles.tabSkin}>
                <div className={styles.panel} style={{flexShrink: 0}}>
                    <SkinPreview skinUrl={userManager.selectedSkin?.url} />
                </div>
                <div className={styles.panel} style={{flexShrink: 1}}>
                    <SkinSelector userManager={userManager} />
                </div>
            </Window.Tab>
        </Window>
    );
}
