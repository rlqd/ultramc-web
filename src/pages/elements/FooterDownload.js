import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'

import './FooterDownload.scss';

export default function FooterDownload() {
    return (
        <div className="footer-download">
            <a href="/launcher/ultramc.exe">
                <FontAwesomeIcon icon={regular('circle-down')} bounce /> Лаунчер
            </a>
            <a href="/launcher/ultramc-creator-tools.jar">
                <FontAwesomeIcon icon={regular('circle-down')} bounce /> Конструктор модпаков
            </a>
        </div>
    );
};
