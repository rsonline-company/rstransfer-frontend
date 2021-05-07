import React, { useState } from 'react';
import styles from './PrimaryInput.module.scss';

export interface Props {
    placeholder?: string;
    value: string;
    onChange?: (value: string) => void;
    isTextCopyable?: boolean;
}

const PrimaryInput: React.FC<Props> = ({ placeholder, value, onChange, isTextCopyable }) => {
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
            type="text"
            className={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange ? onChange(e.target.value) : {}}

        />
        {isTextCopyable && <button className={styles.copy} onClick={copyTextFromInput}>{copyButtonTitle}</button>}
        </div>
    )
}
export default PrimaryInput;