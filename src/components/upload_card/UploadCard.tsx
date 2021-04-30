import React, { useState } from 'react';
import EmailForm from '../forms/email/EmailForm';
import FileInput from '../inputs/file/FileInput';
import SelectedFilesList from '../lists/SelectedFilesList';
import styles from './UploadCard.module.scss';

const UploadCard: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    console.log(selectedFiles);
    return (
        <div className={styles.container + " custom-scrollbar"}>
            <SelectedFilesList
                files={selectedFiles}
            />
            <FileInput
                label="Kliknij, aby dodać pliki."
                onChange={(files: any) => setSelectedFiles(files)}
            />
            <EmailForm />
        </div>
    )
}
export default UploadCard;