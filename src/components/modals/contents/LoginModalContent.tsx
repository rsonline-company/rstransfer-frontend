import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiUrl } from '../../../constans/ApiUrl';
import { saveTokenInLocalStorage } from '../../../redux/actions/Auth';
import PrimaryButton from '../../buttons/primary/PrimaryButton';
import PrimaryInput from '../../inputs/primary/PrimaryInput';

const LoginModalContent: React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const dispatch = useDispatch();

    const login = () => {
        axios.post(ApiUrl+'auth/login', {
            email: email,
            password: password
        }).then(response => {
            console.log(response);
            if(response.status === 200) {
                dispatch(saveTokenInLocalStorage(response.data.token));
                window.location.reload();
            }
        }).catch(({ response }) => {
            console.log(response);
        });
    }

    return (
        <div>
            <div className="my-4">
                <PrimaryInput value={email} placeholder="e-mail" onChange={val => setEmail(val)} />
            </div>
            <div className="my-4">
                <PrimaryInput value={password} placeholder="hasło" onChange={val => setPassword(val)} />
            </div>
            <div className="my-4 d-flex justify-content-center">
                <PrimaryButton title="Zaloguj się" onClick={login} />
            </div>
        </div>
    );
}
export default LoginModalContent;