import loc from '../../loc';
import styles from './FooterDownload.module.scss';

export default function FooterDownload() {
    return (
        <div className={styles.footerDownload}>
            <a href="/launcher/ultramc.exe">
                <i className="far fa-circle-down" /> {loc`Launcher`}
            </a>
            <a href="/launcher/ultramc-creator-tools.jar">
                <i className="far fa-circle-down" /> {loc`Creator tools`}
            </a>
        </div>
    );
};
