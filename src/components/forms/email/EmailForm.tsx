import React, { useState } from 'react';
import PrimaryButton from '../../buttons/PrimaryButton';
import PrimaryInput from '../../inputs/primary/PrimaryInput';
import PrimaryTextArea from '../../inputs/primary/PrimaryTextArea';
import RadioInput from '../../inputs/radio/RadioInput';

const EmailForm: React.FC = () => {
    const [isMailSending, setIsMailSending] = useState(true);

    return (
        <div>
            <div className="my-4 d-flex justify-content-around">
                <RadioInput
                    label="Wyślij email"
                    checked={isMailSending}
                    onChange={(value: boolean) => setIsMailSending(value)}
                />
                <RadioInput
                    label="Link do pobrania"
                    checked={!isMailSending}
                    onChange={(value: boolean) => setIsMailSending(!value)}
                />
            </div>
            {isMailSending &&
            <>
            <div className="my-4">
                <PrimaryInput
                    placeholder="Twój email..."
                />
            </div>
            <div className="my-4">
                <PrimaryInput
                    placeholder="Email do..."
                />
            </div>
            <div className="my-4">
                <PrimaryTextArea
                    placeholder="Wiadomość..."
                />
            </div>
            </>}
            <div className="my-4">
                <PrimaryButton title={isMailSending ? "Wyślij" : "Generuj link do pobrania" }/>
            </div>
        </div>
    )
}
export default EmailForm;