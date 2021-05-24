import React from 'react';
import styles from './PrimaryButton.module.scss';
import Loader from '../../loaders/Loader';

interface Props {
    title: string;
    onClick: () => void;
    isLoading?: boolean;
}

const PrimaryButton: React.FC<Props> = ({ title, onClick, isLoading }) => {
    return (
        <button
            data-testid="primary-button"
            className={styles.button}
            onClick={onClick}    
        >
            {isLoading ? <Loader /> : title}
        </button>
    )
}
export default PrimaryButton;