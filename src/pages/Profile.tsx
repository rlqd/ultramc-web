import type UserManager from "../UserManager";
import Window from "../components/Window";
import Input from "../components/Input";
import SkinPreview from "./elements/SkinPreview";

import styles from "./Profile.module.scss";
import SkinSelector from "./elements/SkinSelector";
import FooterDownload from "./elements/FooterDownload";

export default function Profile({userManager}: {userManager: UserManager}) {
    const activeTab = userManager.userData.passwordResetRequired ? 'account' : 'skin';

    const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        userManager.logout().catch(() => alert('Ошибка при выходе'));
    };

    return (
        <Window cssMaxWidth="800px" activeTab={activeTab} footer={<FooterDownload />}>
            <Window.Tab id="account" header="Аккаунт" className={styles.tabAccount}>
                <div>Привет, {userManager.userData.name}!</div>
                <form onSubmit={handleLogout}>
                    <Input type="submit" name="logout" value="Выйти" style={{maxWidth: '100%'}} />
                </form>
            </Window.Tab>
            <Window.Tab id="skin" header="Скин" className={styles.tabSkin}>
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
