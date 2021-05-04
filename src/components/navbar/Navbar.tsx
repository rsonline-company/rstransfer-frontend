import React from 'react';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.name}>RSTransfer</div>
            <div className={styles.item} data-toggle="modal" data-target="#myFilesModal">Moje pliki</div>
        </nav>
    )
}
export default Navbar;