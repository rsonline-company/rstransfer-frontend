import React, { useState } from 'react';
import styles from './PrimaryInput.module.scss';

export interface Props {
    type?: string;
    placeholder?: string;
    value: string;
    onChange?: (value: string) => void;
    isTextCopyable?: boolean;
    errorMessage?: string;
    onBlur?: () => void;
}

const PrimaryInput: React.FC<Props> = ({ type, placeholder, value, onChange, isTextCopyable, errorMessage, onBlur }) => {
    const [copyButtonTitle, setCopyButtonTitle] = useState('kopiuj do schowka');
    const copyTextFromInput = () => {
        navigator.clipboard.writeText(value);

        setCopyButtonTitle('skopiowano do schowka');

        setTimeout(function() {
            setCopyButtonTitle('kopiuj do schowka');
        }, 500);
    }

    return (
        <div className={styles.container}>
        <input
            data-testid="primary-input"
            type={type ? type : "text"}
            className={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange ? onChange(e.target.value) : {}}
            onBlur={onBlur}
        />
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        {isTextCopyable && <button className={styles.copy} onClick={copyTextFromInput}>{copyButtonTitle}</button>}
        </div>
    )
}
export default PrimaryInput;