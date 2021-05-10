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

    const [emailFromErrorMessage, setEmailFromErrorMessage] = useState<string>();
    const [emailToErrorMessage, setEmailToErrorMessage] = useState<string>();

    const [isSending, setIsSending] = useState<boolean>(false);
    const [percentage, setPercentage] = useState<number>(0);

    const [downloadLink, setDownloadLink] = useState<string>();

    const validateForm = () => {
        const validateEmail = (email: string) => {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        let isFormCorrect = true;

        /* if files are not selected */
        if(selectedFiles.length === 0) {
            isFormCorrect = false;
        }

        // if we are generating link, stop validating inputs
        if(!isEmailSending) {
            return isFormCorrect;
        }

        /* if emailFrom is correct */
        if(!validateEmail(emailFrom)) {
            setEmailFromErrorMessage('Podaj poprawny adres e-mail.');

            isFormCorrect = false;
        } else {
            setEmailFromErrorMessage('');
        }

        /* if emailTo is correct */
        if(!validateEmail(emailTo)) {
            setEmailToErrorMessage('Podaj poprawny adres e-mail.');

            isFormCorrect = false;
        } else {
            setEmailToErrorMessage('');
        }

        return isFormCorrect;
    }

    const upload = () => {
        if(!validateForm()) return;

        const uploaderKey = getOrCreateUploaderKey();

        setIsSending(true);

        const formData = new FormData();

        formData.append('uploaderKey', uploaderKey);
        formData.append('sendEmail', isEmailSending.toString());

        emailFrom && formData.append('emailFrom', emailFrom);
        emailTo && formData.append('emailTo', emailTo);
        message && formData.append('message', message);

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
        }).then(response => {
            console.log(response);

            if(response.data.downloadLink) {
                setDownloadLink(response.data.downloadLink);
            }
        }).catch(({ response }) => {
            console.log(response);
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
                emailFromErrorMessage={emailFromErrorMessage}
                emailToErrorMessage={emailToErrorMessage}
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