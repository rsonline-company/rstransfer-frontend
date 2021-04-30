import React from 'react';
import styles from './PrimaryInput.module.scss';

export interface Props {
    placeholder?: string;
}

const PrimaryInput: React.FC<Props> = ({ placeholder }) => {
    return (
        <input
            type="text"
            className={styles.input}
            placeholder={placeholder}
        />
    )
}
export default PrimaryInput;