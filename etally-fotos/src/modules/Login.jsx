import { useState, useContext } from 'react'
import styles from '../styles/Login.module.css'
import { updateAlert, validateData } from '../utils/functions/helpers';
import conteconDiseño from '../utils/img/ConteconDiseño.png'
import conteconLogo from '../utils/img/logoContecon2.jpg'
import { GlobalContext } from './../context/GlobalContext';
import Listado from './Listado';
import { BASE_PATH } from './../utils/paths';
import { Col } from 'react-bootstrap';

const Login = () => {
  const [dataForm, setDataForm] = useState({ email: '', password: ''});
  const [error, setError] = useState('');
  const [isSended, setIsSended] = useState('');
  const [, setGlobal] = useContext(GlobalContext);

  const handleOnChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
  }

  const onSubmit = () => {
    if (!validateData(dataForm, setError)) {
      return
    } else {
      let formData = new FormData();
      formData.append('email', dataForm.email);
      formData.append('password', dataForm.password);
      setIsSended('Conectandose...')
      fetch('api/login', {
         method: 'POST',
         body: formData
        })
      .then((res) => res.json())
      .then(data => {          
        if (!data.error) {
          window.localStorage.setItem('infoLoginApp', data.entidad.token)
          window.localStorage.setItem('infoUser', data.entidad.email)
          setTimeout(() => {
            setGlobal({
              module: <Listado />
            })
          }, 2000);
        } else if (data.error && data.mensajeDetalle == 'Credenciales incorrectas.') {
          updateAlert(data.mensajeDetalle, setError);
        } else {
          updateAlert("Ocurrio un error al conectarse con el servidor", setError);
        }
        setIsSended('')
      });
    }
  }

  return (
    <>
      <div className={styles.principalContainer}>
        <div className={styles.formContainer}>
          <div className="container">
            <div className='row'>
              <div className="col">
                <div className={styles.contenedorFormulario}>
                  <div className={styles.logoContainer}>
                    <img className={styles.logoContecon} src={conteconLogo} />
                    <p className={styles.letrasFormulario}>Iniciar Sesión</p>
                    {
                      error ? <p style={{ color: 'red' }} >{error}</p> : null
                    }
                    {
                      isSended ? <p>{isSended}</p> : null
                    }
                  </div>
                  <div className='row'>
                    <div className="mb-3" controlId="formBasicEmail">

                      <label className='form-label' className={styles.letrasFormulario} >Email</label>
                      <input className='form-control' type="email" name='email' value={dataForm.email} onChange={handleOnChange} placeholder="ejemplo@contecon.com" />
                    </div>
                    <div className="mb-3" controlId="formBasicPassword">
                      <label className='form-label' className={styles.letrasFormulario} >Contraseña</label>

                      <input className='form-control' type="password" name='password' value={dataForm.password} onChange={handleOnChange} placeholder="*********" />
                    </div>
                  </div>
                  <div className='row' >
                    <div className={styles.titleForm}>
                      <button className={styles.btnLogin} onClick={onSubmit}>
                        Iniciar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Col className={styles.columnaImagen}>
                <img fluid src={conteconDiseño} className={styles.imgContainer} />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login