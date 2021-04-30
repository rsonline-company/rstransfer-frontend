import React from 'react';
import UploadIcon from '../../icons/UploadIcon';
import styles from './FileInput.module.scss';

interface Props {
    label: string;
    onChange: (files: any) => void;
}

const FileInput: React.FC<Props> = ({ label, onChange }) => {
    return (
        <label className={styles.container}>
            <UploadIcon />
            <input type="file" className={styles.input} onChange={(e) => onChange(e.target.files)} multiple />
            <div className={styles.label}>{label}</div>
        </label>
    );
}
export default FileInput;