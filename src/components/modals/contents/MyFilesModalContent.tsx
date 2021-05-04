import React, { useState } from 'react';
import DownloadButton from '../../buttons/download/DownloadButton';
import LinkButton from '../../buttons/link/LinkButton';

interface File {
    name: string;
    numberOfDownloads: number;
}

const MyFileModalContent: React.FC = () => {
    const [files, setFiles] = useState<File[]>([
        {
            name: 'file_number_1.png',
            numberOfDownloads: 23
        },
        {
            name: 'file_number_432.png',
            numberOfDownloads: 1
        },
        {
            name: 'file_costam_4321.png',
            numberOfDownloads: 54
        },
        {
            name: 'file_number_1.png',
            numberOfDownloads: 23
        },
        {
            name: 'file_number_432.png',
            numberOfDownloads: 1
        },
        {
            name: 'file_costam_4321.png',
            numberOfDownloads: 54
        },
        {
            name: 'file_number_1.png',
            numberOfDownloads: 23
        },
        {
            name: 'file_number_432.png',
            numberOfDownloads: 1
        },
        {
            name: 'file_costam_4321.png',
            numberOfDownloads: 54
        },
        {
            name: 'file_number_1.png',
            numberOfDownloads: 23
        },
        {
            name: 'file_number_432.png',
            numberOfDownloads: 1
        },
        {
            name: 'file_costam_4321.png',
            numberOfDownloads: 54
        },
        {
            name: 'file_number_1.png',
            numberOfDownloads: 23
        },
        {
            name: 'file_number_432.png',
            numberOfDownloads: 1
        },
        {
            name: 'file_costam_4321.png',
            numberOfDownloads: 54
        },
        {
            name: 'file_number_1.png',
            numberOfDownloads: 23
        },
        {
            name: 'file_number_432.png',
            numberOfDownloads: 1
        },
        {
            name: 'file_costam_4321.png',
            numberOfDownloads: 54
        },
        {
            name: 'file_number_1.png',
            numberOfDownloads: 23
        },
        {
            name: 'file_number_432.png',
            numberOfDownloads: 1
        },
        {
            name: 'file_costam_4321.png',
            numberOfDownloads: 54
        }
    ]);

    return (
        <div>
            {files.map((file: File) => (
                <>
                <div className="my-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="font-weight-bold">{file.name}</div>
                        <div className="d-flex">
                            <div className="mx-2">
                                <DownloadButton />
                            </div>
                            <div className="mx-2">
                                <LinkButton />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        <small>pobrany {file.numberOfDownloads} {file.numberOfDownloads === 1 ? 'raz' : 'razy'}</small>
                        <small>&nbsp;• wygasa za: 40 godzin</small>
                    </div>
                </div>
                <hr/>
                </>
            ))}
        </div>
    );
}
export default MyFileModalContent;