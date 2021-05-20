import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ApiUrl } from '../../../constans/ApiUrl';
import { RootState } from '../../../redux/store';
import DownloadButton from '../../buttons/download/DownloadButton';

interface InitialFile {
    parentZipName: string;
    name: string;
    createdAt: string;
}

interface File {
    name: string;
    data: string[]
}

const groupFilesByZipName = (files: InitialFile[]) => {
    const zipNames: string[] = [];

    files.map((file) => {
        zipNames.push(file.parentZipName);    
    });

    const uniqueZipNames = [...new Set(zipNames)];

    const groupedFiles: File[] = [];

    uniqueZipNames.map((name: string) => {
        const data = files.filter(file => file.parentZipName === name).map(file => {
            return file.name;
        });

        groupedFiles.push({
            name: name,
            data: data
        });
    });

    return groupedFiles
}

const FileItem: React.FC<{ name: string, data?: string[] }> = ({ name, data }) => {
    return (
        <div className="my-3">
            <div className="d-flex align-items-center justify-content-between">
                <div className="font-weight-bold">{name}</div>
                <div className="d-flex">
                    <div className="mx-2">
                        <DownloadButton fileName={name} />
                    </div>
                </div>
            </div>
            <ul>
                {data && data.map(fileName => (
                    <li>{fileName}</li>
                ))}
            </ul>
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
            console.log(response);
            const files = groupFilesByZipName(response.data);

            setFiles(files);
        }).catch(({ response }) => {
            console.log(response);
        });
    }, [token]);

    return (
        <>
        {files !== undefined && files.map((file: File) => (
            <>
            {file.name ? <FileItem
                name={file.name}
                data={file.data}
            /> : <>
            {file.data.map(fileName => (
                <FileItem
                    name={fileName}
                />
            ))}
            </>}
            </>
        ))}
        </>
    );
}
export default MyFileModalContent;