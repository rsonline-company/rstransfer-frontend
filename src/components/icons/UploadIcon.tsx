import React from 'react';
import styles from './UploadIcon.module.scss';

const UploadIcon: React.FC = () => (
    <div className={styles.container}>
        <div className={styles.arrow}></div>
        <div className={styles.stick}></div>
    </div>
);
export default UploadIcon;