import type UserManager from '../../UserManager';
import { getErrorMessage } from "../../utils";

import styles from './SkinSelector.module.scss';

export default function SkinSelector({userManager}: {userManager: UserManager}) {
    const buttons: React.ReactNode[] = [];

    const uploadSkin = function(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files?.length !== 1) {
            return;
        }
        userManager.uploadSkin(e.currentTarget.files[0])
            .catch(e => alert(getErrorMessage(e)));
    }

    const selectSkin = function(e: React.MouseEvent<HTMLDivElement>) {
        const currentId = userManager.selectedSkin?.id ?? '';
        const newId = e.currentTarget.dataset.skin;
        if (currentId == newId) {
            return;
        }
        userManager.selectSkin(newId)
            .catch(e => alert(getErrorMessage(e)));
    }

    let hasSelected = false;
    for (const skin of userManager.userData.skins) {
        if (skin.selected) {
            hasSelected = true;
        }
        const className = styles.button + (skin.selected ? ` ${styles.active}` : '');
        buttons.push(
            <div key={'skin' + skin.id} className={className} data-skin={skin.id} onClick={selectSkin}>
                <div className={styles.face} style={{backgroundImage: 'url(' + skin.url + ')'}} />
            </div>
        );
    }
    const className = styles.button + (hasSelected ? '' : ` ${styles.active}`);
    buttons.push(
        <div key="skin-default" className={className} data-skin="" onClick={selectSkin}>
            <div className={styles.face} style={{backgroundImage: 'url(/default_skin.png)'}} />
        </div>
    );

    return (
        <div className={styles.selector}>
            {buttons}
            <label className={styles.button} htmlFor="skin-upload">
                <div className={styles.add}>+</div>
                <input type="file" id="skin-upload" accept=".png" onChange={uploadSkin} style={{display: 'none'}} />
            </label>
        </div>
    );
}
