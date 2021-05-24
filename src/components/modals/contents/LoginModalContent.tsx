import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ApiUrl } from '../../../constans/ApiUrl';
import { saveTokenInLocalStorage } from '../../../redux/actions/Auth';
import PrimaryButton from '../../buttons/primary/PrimaryButton';
import PrimaryInput from '../../inputs/primary/PrimaryInput';
import { validate } from '../../../helpers/Validator';

const LoginModalContent: React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [emailError, setEmailError] = useState<string>();
    const [passwordError, setPasswordError] = useState<string>();

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const login = () => {
        validateInput('email', email);
        validateInput('password', password);

        if(!email || !password) return;
        if(emailError || passwordError) return;

        setIsLoading(true);
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
            if(response.status === 401) {
                setPasswordError('Podane hasło jest nieprawidłowe.');
            }
        }).then(() => {
            setIsLoading(false);
        });
    }

    const validateInput = (inputName: string, value: string) => {
        inputName === 'email' && setEmailError(validate(inputName, value));
        inputName === 'password' && setPasswordError(validate(inputName, value));
    }

    useEffect(() => {
        if(emailError) {
            validateInput('email', email);
        }

        if(passwordError) {
            validateInput('password', password);
        }
    }, [email, password]);

    return (
        <div>
            <div className="my-4">
                <PrimaryInput
                    value={email}
                    placeholder="e-mail"
                    onChange={val => setEmail(val)}
                    onBlur={() => validateInput('email', email)}
                    errorMessage={emailError}
                />
            </div>
            <div className="my-4">
                <PrimaryInput
                    type="password"
                    value={password}
                    placeholder="hasło"
                    onChange={val => setPassword(val)}
                    onBlur={() => validateInput('password', password)}
                    errorMessage={passwordError}
                />
            </div>
            <div className="my-4 d-flex justify-content-center">
                <PrimaryButton title="Zaloguj się" onClick={login} isLoading={isLoading} />
            </div>
        </div>
    );
}
export default LoginModalContent;