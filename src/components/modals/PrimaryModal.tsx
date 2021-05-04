import React from 'react';
import styles from './PrimaryModal.module.scss';

interface Props {
    id: string;
    title: string;
    Content: React.FC
}

const PrimaryModal: React.FC<Props> = ({ id, title, Content }) => {
    return (
        <div className="modal fade" id={id} tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className={styles.content + " modal-content"}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Content />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PrimaryModal;