import React from 'react';
import styles from './PrimaryButton.module.scss';

interface Props {
    title: string;
}

const PrimaryButton: React.FC<Props> = ({ title }) => {
    return (
        <button className={styles.button}>{title}</button>
    )
}
export default PrimaryButton;