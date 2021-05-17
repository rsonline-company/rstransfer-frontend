import React from 'react';
import styles from './AuthModal.module.scss';

interface Props {
    id: string;
    title: string;
    Content: React.FC
}

const AuthModal: React.FC<Props> = ({ id, title, Content }) => {
    return (
        <div className="modal fade" id={id} tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className={styles.content+" modal-content"}>
                    <div>
                        <button type="button" className="close p-1" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <h5 className={styles.title}>{title}</h5>
                    <div className="modal-body">
                        <Content />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AuthModal;