import React, { useState } from 'react';
import EmailForm from '../forms/email/EmailForm';
import FileInput from '../inputs/file/FileInput';
import PrimaryButton from '../buttons/primary/PrimaryButton';
import SelectedFilesList from '../lists/SelectedFilesList';
import styles from './UploadCard.module.scss';
import axios from 'axios';
import ProgressBar from '../progress_bar/ProgressBar';
import { ApiUrl } from '../../constans/ApiUrl';
import PrimaryInput from '../inputs/primary/PrimaryInput';

const getOrCreateUploaderKey = () => {
    let key = localStorage.getItem('uploader_key');

    if(!key) {
        let key = Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2);

        localStorage.setItem('uploader_key', key);
    }

    return key;
}

const UploadCard: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isEmailSending, setIsEmailSending] = useState(true);
    const [emailFrom, setEmailFrom] = useState<string>();
    const [emailTo, setEmailTo] = useState<string>();
    const [message, setMessage] = useState<string>();

    const [isSending, setIsSending] = useState<boolean>(false);
    const [percentage, setPercentage] = useState<number>();

    const [downloadLink, setDownloadLink] = useState<string>();

    console.log(selectedFiles);

    const upload = () => {
        if(selectedFiles.length === 0) return;

        const uploaderKey = getOrCreateUploaderKey();
        console.log('uploader key: ', uploaderKey);

        setIsSending(true);

        const formData = new FormData();
        formData.append('uploaderKey', uploaderKey);
        formData.append('sendEmail', isEmailSending.toString());

        Promise.all([...selectedFiles].map((file, index) => {
            formData.append('files[]', file);
        }));

        console.log('formdata: ', formData);

        axios.request({
            method: 'post',
            url: ApiUrl+'files/store',
            data: formData,
            onUploadProgress: (p) => {
                setPercentage(Math.round((p.loaded/p.total)*100));
            }
        }).then (response => {
            console.log('response data: ', response);
            // setDownloadLink(data.toString());
            if(response.data.downloadLink) {
                setDownloadLink(response.data.downloadLink);
            }
        }).catch(() => {
            
        }).then(() => {
            setIsSending(false);
            setPercentage(0);
        });
    }

    return (
        <div className={styles.container + " custom-scrollbar"}>
            <SelectedFilesList
                files={selectedFiles}
            />
            <FileInput
                label="Kliknij, aby dodać pliki."
                onChange={(files: File[]) => setSelectedFiles(files)}
            />
            <EmailForm
                isEmailSending={isEmailSending}
                setIsEmailSending={setIsEmailSending}
                emailFrom={emailFrom}
                setEmailFrom={setEmailFrom}
                emailTo={emailTo}
                setEmailTo={setEmailTo}
                message={message}
                setMessage={setMessage}
            />
            <div className="my-4">
                {isSending
                    ? <ProgressBar
                        percentage={percentage}
                    />
                    : <PrimaryButton
                        title={isEmailSending ? "Wyślij" : "Generuj link do pobrania" }
                        onClick={upload}
                    />
                }
            </div>
            {downloadLink &&
                <PrimaryInput
                    value={downloadLink}
                    isTextCopyable={true}
                />
            }
        </div>
    )
}
export default UploadCard;