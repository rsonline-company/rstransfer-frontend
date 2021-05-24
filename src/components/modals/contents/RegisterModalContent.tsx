import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ApiUrl } from '../../../constans/ApiUrl';
import { validate } from '../../../helpers/Validator';
import { saveTokenInLocalStorage } from '../../../redux/actions/Auth';
import PrimaryButton from '../../buttons/primary/PrimaryButton';
import PrimaryInput from '../../inputs/primary/PrimaryInput';

const RegisterModalContent: React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [emailError, setEmailError] = useState<string>();
    const [passwordError, setPasswordError] = useState<string>();

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const register = () => {
        validateInput('email', email);
        validateInput('password', password);

        if(!email || !password) return;
        if(emailError || passwordError) return;

        setIsLoading(true);
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
            if(response.data.errors) {
                const { email, password } = response.data.errors;

                setEmailError(email);
                setPasswordError(password);
            }
            console.log(response);
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
                <PrimaryButton title="Zarejestruj się" onClick={() => register()} isLoading={isLoading} />
            </div>
        </div>
    );
}
export default RegisterModalContent;