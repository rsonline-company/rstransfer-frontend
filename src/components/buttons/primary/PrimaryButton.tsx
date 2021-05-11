import React from 'react';
import styles from './PrimaryButton.module.scss';

interface Props {
    title: string;
    onClick: () => void;
}

const PrimaryButton: React.FC<Props> = ({ title, onClick }) => {
    return (
        <button
            data-testid="primary-button"
            className={styles.button}
            onClick={onClick}    
        >{title}</button>
    )
}
export default PrimaryButton;