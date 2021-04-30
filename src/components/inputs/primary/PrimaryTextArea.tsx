import React from 'react';
import { Props } from './PrimaryInput';
import styles from './PrimaryInput.module.scss';

const PrimaryTextArea: React.FC<Props> = ({ placeholder }) => {
    return (
        <textarea className={styles.input} placeholder={placeholder}></textarea>
    );
}
export default PrimaryTextArea;