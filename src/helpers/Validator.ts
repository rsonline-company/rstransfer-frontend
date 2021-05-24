const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const emailRules = (email:string) => {
    if(!email) {
        return 'Podaj adres e-mail.';
    }

    if(!validateEmail(email)) { 
        return 'Podaj poprawny adres e-mail.';
    }
}

const passwordRules = (password: string) => {
    if(!password) {
        return 'Podaj hasło';
    }

    // if(password.length < 8 || password.length > 16) {
    //     return 'Hasło powinno mieć od 8 do 16 znaków.'
    // }
}

export const validate = (inputName: string, value: string) => {
    if(inputName === 'email') {
        return emailRules(value);
    }

    if(inputName === 'password') {
        return passwordRules(value);
    }
}