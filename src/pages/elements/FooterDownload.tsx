import styles from './FooterDownload.module.scss';

export default function FooterDownload() {
    return (
        <div className={styles.footerDownload}>
            <a href="/launcher/ultramc.exe">
                <i className="far fa-circle-down" /> Лаунчер
            </a>
            <a href="/launcher/ultramc-creator-tools.jar">
                <i className="far fa-circle-down" /> Конструктор модпаков
            </a>
        </div>
    );
};
