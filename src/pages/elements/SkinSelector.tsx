import { useState } from 'react';
import type UserManager from '../../UserManager';
import { getErrorMessage } from "../../utils";

import styles from './SkinSelector.module.scss';

export interface SkinSelectorProps {
    userManager: UserManager;
};

export default function SkinSelector({userManager}: SkinSelectorProps) {
    const [loading, setLoading] = useState(false);

    const uploadSkin = function(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files?.length !== 1) {
            return;
        }
        setLoading(true);
        userManager.uploadSkin(e.currentTarget.files[0])
            .catch(e => alert(getErrorMessage(e)))
            .finally(() => setLoading(false));
    }

    const selectSkin = function(e: React.MouseEvent<HTMLDivElement>) {
        const currentId = userManager.selectedSkin?.id ?? '';
        const newId = e.currentTarget.dataset.skin;
        if (currentId == newId) {
            return;
        }
        setLoading(true);
        userManager.selectSkin(newId)
            .catch(e => alert(getErrorMessage(e)))
            .finally(() => setLoading(false));
    }

    const buttons: React.ReactNode[] = [];
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
        <div className={styles.selector + (loading ? ' loading-overlay' : '')} inert={loading}>
            {buttons}
            <label className={styles.button} htmlFor="skin-upload">
                <div className={styles.add}>+</div>
                <input type="file" id="skin-upload" accept=".png" onChange={uploadSkin} style={{display: 'none'}} />
            </label>
        </div>
    );
}
