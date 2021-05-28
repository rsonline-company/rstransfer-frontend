import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ApiUrl } from '../../../constans/ApiUrl';
import { RootState } from '../../../redux/store';
import DownloadButton from '../../buttons/download/DownloadButton';
import Moment from 'react-moment';

interface InitialFile {
    parentZipName: string;
    name: string;
    expiresAt: string;
}

interface File {
    name: string;
    data?: string[];
    expiresAt: string;
}

const groupFilesByZipName = (files: InitialFile[]) => {
    const zipNames: string[] = [];

    files.map((file) => {
        zipNames.push(file.parentZipName ? file.parentZipName : file.name);    
    });

    console.log(files);

    const uniqueZipNames = [...new Set(zipNames)];

    const groupedFiles: File[] = [];

    uniqueZipNames.map((name: string) => {
        const data = files.filter(file => file.parentZipName === name).map(file => {
            return file.name;
        });

        const file = files.find(file => file.parentZipName === name || (file.parentZipName === null && file.name === name));
        const expiresAt = file.expiresAt;

        groupedFiles.push({
            name: name,
            data: data,
            expiresAt: expiresAt
        });
    });

    return groupedFiles
}

const FileItem: React.FC<File> = ({ name, data, expiresAt }) => {
    return (
        <div className="my-3">
            <div className="d-flex align-items-center justify-content-between">
                <div className="font-weight-bold" style={styles.name} title={name}>{name}</div>
                <div className="d-flex">
                    <div className="mx-2">
                        <DownloadButton fileName={name} />
                    </div>
                </div>
            </div>
            <ul>
                {data && data.map(fileName => (
                    <li style={styles.name}>{fileName}</li>
                ))}
            </ul>
            <li className="text-secondary" style={{ fontSize: '12px' }}>
                <span>plik wygasa </span>
                <Moment fromNow locale="pl">{expiresAt}</Moment>
            </li>
            <hr/>
        </div>
    );
}

const MyFileModalContent: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);

    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if(!token) return;

        axios.post(ApiUrl+'files/load?token='+token)
        .then(response => {
            const files = groupFilesByZipName(response.data);

            setFiles(files);
        }).catch(({ response }) => {
            console.log(response);
        });
    }, [token]);

    return (
        <>
        {files !== undefined && files.length > 0 ? files.map((file: File) => (
            <>
            {file.name ? <FileItem
                name={file.name}
                data={file.data}
                expiresAt={file.expiresAt}
            /> : <>
            {file.data.map(fileName => (
                <FileItem
                    name={fileName}
                    expiresAt={file.expiresAt}
                />
            ))}
            </>}
            </>
        )) : <h6 className="text-center">Brak plików.</h6>}
        </>
    );
}

const styles = {
    name: {
        textOverflow: 'ellipsis',
        'white-space': 'nowrap',
        overflow: 'hidden',
        width: '100%',
    }
}

export default MyFileModalContent;