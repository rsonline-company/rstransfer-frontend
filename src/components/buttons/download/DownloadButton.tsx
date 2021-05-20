import React from 'react';
import { ApiUrl } from '../../../constans/ApiUrl';
import styles from './DownloadButton.module.scss';

const DownloadButton: React.FC<{ fileName: string }> = ({ fileName }) => {
    return <button className={styles.button}>
        <a href={ApiUrl + 'download/' + fileName} className="text-white">Pobierz</a>
    </button>
}
export default DownloadButton;