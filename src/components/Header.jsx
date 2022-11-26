import React, { useContext } from 'react'
import conteconLogo from '../utils/img/logoContecon2.jpg'
import styles from './Header.module.css'
import userLogo from '../utils/img/user.png'
import exitLogo from '../utils/img/iconLogout.png'
import { UserContext } from './../context/UserContext';
import Login from './../modules/Login';
import { GlobalContext } from './../context/GlobalContext';
import { BASE_PATH } from './../utils/paths';
import { cleanLocalStorage } from '../utils/functions/helpers'

const Header = () => {
  const [userState, setUserState] = useContext(UserContext)
  const [, setGlobal] = useContext(GlobalContext);
  const userInfo = window.localStorage.getItem('infoUser')

  const logout = ()=> {
    let params = {   
      'headers':{       
          'Authorization': `Bearer ${localStorage.getItem('infoLoginApp')}`
      }
    }
    fetch('api/logout', params)    
    .then(resp =>{      
      if(resp.status == 200){
        setUserState(prevState=>(
          {
              ...prevState,
              usuario: null,                  
              isLogged: false
          })
        )
        setTimeout(() => {
          setGlobal({
            module:<Login/>
          })
        }, 500);
        cleanLocalStorage();
      }else{        
        //console.error(resp);
      }
    });
  }

  return (
    <>
      <nav className={styles.headerContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.logo} src={conteconLogo} alt="logo contecon" />
        </div>
        <div className={styles.userDataContainer}>
          <img className={styles.userLogo} src={userLogo} alt="logo usuario" />
          <p className={styles.nUsuario}> Hola, {userInfo}</p>
          <img onClick={logout} className={styles.exitLogo} src={exitLogo} alt="salir" title='Cerrar sesión' />
        </div>
      </nav>
    </>
  )
}

export default Header