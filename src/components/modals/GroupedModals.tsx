import React from 'react';
import MyFileModalContent from './contents/MyFilesModalContent';
import PrimaryModal from './PrimaryModal';

const GroupedModals: React.FC = () => {
    return (
        <>
            <PrimaryModal
                id="myFilesModal"
                title="Moje pliki"
                Content={MyFileModalContent}
            />
        </>
    )
}
export default GroupedModals;