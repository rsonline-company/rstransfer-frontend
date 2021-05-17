import React from 'react';
import LoginModalContent from './contents/LoginModalContent';
import MyFileModalContent from './contents/MyFilesModalContent';
import PrimaryModal from './primary/PrimaryModal';
import AuthModal from './auth/AuthModal';
import RegisterModalContent from './contents/RegisterModalContent';

const GroupedModals: React.FC = () => {
    return (
        <>
            <PrimaryModal
                id="myFilesModal"
                title="Moje pliki"
                Content={MyFileModalContent}
            />
            <AuthModal
                id="loginModal"
                title="Zaloguj się"
                Content={LoginModalContent}
            />
            <AuthModal
                id="registerModal"
                title="Utwórz konto"
                Content={RegisterModalContent}
            />
        </>
    )
}
export default GroupedModals;