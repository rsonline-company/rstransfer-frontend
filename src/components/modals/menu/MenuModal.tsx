import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, LOGOUT } from '../../../redux/actions/Auth';
import { RootState } from '../../../redux/store';
import styles from './MenuModal.module.scss';

interface Props {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const MenuModal: React.FC<Props> = ({ isVisible, setIsVisible }) => {
    const token = useSelector((state: RootState) => state.auth.token);

    const dispatch = useDispatch();

    if(isVisible) {
        return (
            <div className={styles.container}>
                <div className="d-flex justify-content-end">
                    <button className="close" onClick={() => setIsVisible(!isVisible)}>&times;</button>
                </div>
                <div className="d-flex flex-column align-items-center">
                    {!token ? <>
                        <div className={styles.item} onClick={() => setIsVisible(!isVisible)} data-toggle="modal" data-target="#loginModal">Zaloguj się</div>
                        <div className={styles.item} onClick={() => setIsVisible(!isVisible)} data-toggle="modal" data-target="#registerModal">Zarejestruj się</div>
                    </>
                    : <>
                    <div className={styles.item} onClick={() => setIsVisible(!isVisible)} data-toggle="modal" data-target="#myFilesModal">Moje pliki</div>
                    <div className={styles.item} onClick={() => dispatch(logout())}>Wyloguj się</div>
                    </>}
                </div>
            </div>
        );
    } else {
        return null
    }
}
export default MenuModal;