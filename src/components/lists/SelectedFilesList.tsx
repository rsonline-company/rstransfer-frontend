import React, { useEffect, useState } from 'react';
import styles from './SelectedFilesList.module.scss';

interface Props {
    files: File[];
}

const SelectedFilesList: React.FC<Props> = ({ files }) => {
    const [fileNames, setFileNames] = useState([]);
    const [size, setSize] = useState<string>();

    useEffect(() => {
        const names = [];
        let size: number = 0;
        Promise.all([...files].map(file => {
            names.push(file.name);
            size = size + file.size;
        }));
        setFileNames(names);
        console.log("size GB: ", size/1024/1024/1024);
        setSize(convertBytes(size));
    }, [files]);

    return (
        <div className={styles.container}>
            {fileNames.map(name => (
                <div className={styles.item}>{name}</div>
            ))}
            {size ? <div className={styles.size}>Rozmiar plików - {size} <b>(max: 2GB)</b></div> : null}
        </div>
    )
}
export default SelectedFilesList;

const convertBytes = (bytes: number) => {
    if(bytes < 1024) {
        return Math.round(bytes) + ' B';
    }
    if(bytes === 1024 || bytes < 1024*1024) {
        return Math.round(bytes/1024) + ' KB'
    }
    if(bytes === 1024*1024 || bytes < 1024*1024*1024) {
        return Math.round(bytes/1024/1024) + ' MB';
    }
    if(bytes === 1024*1024*1024 || bytes < 1024*1024*1024*1024) {
        return Math.round(bytes/1024/1024/1024) + ' GB';
    }
}