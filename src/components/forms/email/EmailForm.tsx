import React, { useState } from 'react';
import PrimaryInput from '../../inputs/primary/PrimaryInput';
import PrimaryTextArea from '../../inputs/primary/PrimaryTextArea';
import RadioInput from '../../inputs/radio/RadioInput';

interface Props {
    isEmailSending: boolean;
    setIsEmailSending: (value: boolean) => void;
    emailFrom: string;
    setEmailFrom: (value: string) => void;
    emailTo: string;
    setEmailTo: (value: string) => void;
    message: string;
    setMessage: (value: string) => void;
}

const EmailForm: React.FC<Props> = ({ isEmailSending, setIsEmailSending, emailFrom, setEmailFrom, emailTo, setEmailTo, message, setMessage }) => {
    return (
        <div>
            <div className="my-4 d-flex justify-content-around">
                <RadioInput
                    label="Wyślij email"
                    checked={isEmailSending}
                    onChange={(value: boolean) => setIsEmailSending(value)}
                />
                <RadioInput
                    label="Link do pobrania"
                    checked={!isEmailSending}
                    onChange={(value: boolean) => setIsEmailSending(!value)}
                />
            </div>
            {isEmailSending &&
            <>
            <div className="my-4">
                <PrimaryInput
                    placeholder="Twój email..."
                    value={emailFrom}
                    onChange={setEmailFrom}
                />
            </div>
            <div className="my-4">
                <PrimaryInput
                    placeholder="Email do..."
                    value={emailTo}
                    onChange={setEmailTo}
                />
            </div>
            <div className="my-4">
                <PrimaryTextArea
                    placeholder="Wiadomość..."
                    value={message}
                    onChange={setMessage}
                />
            </div>
            </>}
        </div>
    )
}
export default EmailForm;