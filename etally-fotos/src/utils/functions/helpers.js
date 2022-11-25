import { validateEmail } from './regx';

export const validateData = (dataForm, setError) =>{
    if(!dataForm.email.trim() || !validateEmail(dataForm.email)){
        updateAlert('Ingresa un email válido', setError);
        return false;
    }
    if(!dataForm.password.trim() || dataForm.password < 8){
        updateAlert('Contraseña o usuario incorrectos', setError)        
        return false;
    }
    return true;
}

export const updateAlert = (msj, stateUpdater) =>{
    stateUpdater(msj);
    setTimeout(() => {
        stateUpdater('');
    }, 3000);
}

export const cleanLocalStorage = () => {
    window.localStorage.removeItem('infoUser');
    window.localStorage.removeItem('infoLoginApp');
}

export const formatDate = (date) => {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}  