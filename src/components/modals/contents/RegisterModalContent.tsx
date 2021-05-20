import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiUrl } from '../../../constans/ApiUrl';
import { saveTokenInLocalStorage, SAVE_TOKEN_IN_LOCAL_STORAGE, SET_TOKEN } from '../../../redux/actions/Auth';
import PrimaryButton from '../../buttons/primary/PrimaryButton';
import PrimaryInput from '../../inputs/primary/PrimaryInput';

const RegisterModalContent: React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const dispatch = useDispatch();

    const register = () => {
        console.log({
            email, password
        });
        axios.post(ApiUrl+'auth/register', {
            email: email,
            password: password
        }).then(response => {
            dispatch(saveTokenInLocalStorage(response.data.token));
            window.location.reload();
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
                <PrimaryInput type="password" value={password} placeholder="hasło" onChange={val => setPassword(val)} />
            </div>
            <div className="my-4 d-flex justify-content-center">
                <PrimaryButton title="Zarejestruj się" onClick={() => register()} />
            </div>
        </div>
    );
}
export default RegisterModalContent;