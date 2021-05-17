import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../redux/actions/Auth';
import { RootState } from '../../redux/store';
import MenuModal from '../modals/menu/MenuModal';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between px-2 px-md-5">
            <div className={styles.name}>RSTransfer</div>
            <button className="navbar-toggler bg-white" type="button" onClick={() => setIsModalVisible(!isModalVisible)}>
                <span className="navbar-toggler-icon"></span>
            </button>

            <ul className="navbar-nav d-none d-lg-flex font-weight-bold">
                <li className="nav-item">
                    <a className="nav-link text-white" role="button" data-toggle="modal" data-target="#myFilesModal">Moje pliki</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Konto</a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    {!token ? <>
                        <div className="dropdown-item" data-toggle="modal" data-target="#loginModal">Zaloguj się</div>
                        <div className="dropdown-item" data-toggle="modal" data-target="#registerModal">Zarejestruj się</div>
                    </>
                    : <div className="dropdown-item" onClick={() => dispatch({ type: LOGOUT })}>Wyloguj się</div>}
                    </div>
                </li>
            </ul>
        </nav>
        <MenuModal
            isVisible={isModalVisible}
            setIsVisible={setIsModalVisible}
        />
        </>
    );
}
export default Navbar;