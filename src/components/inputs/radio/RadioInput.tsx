import React from 'react';
import styles from './RadioInput.module.scss';

interface Props {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void
}

const RadioInput: React.FC<Props> = ({ label, checked, onChange }) => {
    return (
        <label className={styles.container}>
            <input type="radio" checked={checked} onChange={({ target }) => onChange(target.value === 'on' ? true : false)} />
            <div className={styles.label}>{label}</div>
        </label>
    );
}
export default RadioInput;