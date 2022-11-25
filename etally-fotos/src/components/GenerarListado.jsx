import React, { useState, useEffect, useContext } from 'react';
import styles from './GenerarListado.module.css'
import { BASE_PATH } from './../utils/paths';
import Album from './../modules/Album';
import iconSearch from '../utils/img/iconSearch.png'
import { GlobalContext } from './../context/GlobalContext';
import Login from '../modules/Login';
import { cleanLocalStorage, formatDate } from '../utils/functions/helpers';
import LoadingSpinner from './LoadingSpinner';

const GenerarListado = () => {
    const [listadoData, setListadoData] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);    
    const [, setGlobal] = useContext(GlobalContext);

    useEffect(() => {
        setIsLoading(true)
        let token = `Bearer ${window.localStorage.getItem('infoLoginApp')}`
        const params = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            'body': JSON.stringify(getDates())
        }

        fetch('api/historial/tarjas', params)
            .then((res) => res.json())
            .then(data => {
                if (data.error && data.mensaje == 'Token expirado.') {
                    cleanLocalStorage()
                    setTimeout(() => {
                        setGlobal({
                            module: <Login />
                        })
                    }, 2000);
                    setIsLoading(false)
                    return
                }
                if (data != null) {
                    setListadoData(data.entidad);
                    setFilterList(data.entidad);
                } else {
                    //console.log(data.mensaje);
                }
            });
        setIsLoading(false)
    }, []);

    const getDates = () => {
        const currentDate = new Date();
        let totalMilisecondsMonth = 1000 * 60 * 60 * 24 * 30;
        //Obtener la fecha de un mes despues a la fecha actual
        let totalMiliseconds = currentDate.getTime() + totalMilisecondsMonth;
        let monthLater = new Date(totalMiliseconds);
        //Obtener la fecha de un mes anterior a la fecha actual
        totalMiliseconds = currentDate.getTime() - totalMilisecondsMonth;
        let lastMonth = new Date(totalMiliseconds);
        return {
            "fecha_desde": formatDate(lastMonth),
            "fecha_hasta": formatDate(monthLater)
        }
    }

    const showAlbum = (id, contenedor, tipoPreview, numFotos) => {
        setTimeout(() => {
            setGlobal({
                module: <Album idTarja={id} contenedor={contenedor}
                    numPhotos={numFotos} serviceType={tipoPreview} />
            })
        }, 2000);
    }

    const handleChangeInput = (e) => {
        setSearchValue(e.target.value);
        filterTarjas(e.target.value);
    }

    const filterTarjas = (serviceName) => {
        let results = filterList.filter((elemeto) => {
            if (elemeto.numero_servicio.toString().toLowerCase().includes(serviceName.toLowerCase())) {
                return elemeto;
            }
        })
        setListadoData(results);
    }

    const setTarjaStatus = (tipoPreview, numFotos) => {        
        if(tipoPreview === 'C' && numFotos === 4){         
          return 'Completado'
        }else if(tipoPreview === 'A' && numFotos === 5){
            return 'Completado'
        }else if(tipoPreview == '0' && numFotos === 7){      
            return 'Completado'
        }else{        
            return 'Pendiente'
        }         
    } 

    return (
        <>
            <div className={styles.searchContainer}>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='Búsqueda' className="form-control"
                        value={searchValue} onChange={handleChangeInput}></input>

                </div>
            </div>
            {
                isLoading &&
                <div style={{ 'display': 'flex', 'justifyContent': 'center', 'height': '500px', 'alignItems': 'center', alignContent: 'center' }}>
                    <LoadingSpinner />
                </div>
            }
            <div className={styles.parentRowTable}>
                <h3 className={styles.notTarjas}>Listado de Servicios con Fotografías</h3>
                <div className={styles.centerTable}>            
                    <div className='table-responsive-md'>
                        <table className='table' style={{display: 'block', overflowX: "auto"}}>
                            <thead className={styles.trHeaderTable}>
                                <tr>
                                    <th> Folio ISCS</th>
                                    <th> Servicio</th>
                                    <th> Contenedor</th>
                                    <th> Tipo Servicio</th>
                                    <th> Fecha Servicio</th>
                                    <th> No. Fotografías</th>
                                    <th> Estatus</th>
                                    <th> Fotografías</th>
                                </tr>
                            </thead>
                                {
                                    listadoData.length > 0 ?
                                        listadoData.map((item, i) => (
                                            <tbody>
                                                <tr key={item.idTarja} className={styles.trHeaderTable}>
                                                    <td>{item.folio}</td>
                                                    <td>{item.numero_servicio}</td>
                                                    <td>{item.contenedor}</td>
                                                    <td className={styles.serviceType}>{item.tipo_servicio}</td>
                                                    <td>{item.fecha}</td>
                                                    <td>{item.numero_fotografias}</td>
                                                    <td>{setTarjaStatus(item.tipo_preview, item.numero_fotografias)}</td>                                        
                                                    <td>
                                                        <button className="btn btn-primary btn-sm" style={{ backgroundColor: '#f69100', 'border': 'none' }}
                                                            onClick={() => showAlbum(item.id_tarja, item.contenedor, item.tipo_preview, item.numero_fotografias)}>
                                                            Consultar
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>    

                                        ))
                                        : <p className={styles.notTarjas}>No se encontraron Servicios</p>                            
                                }
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default GenerarListado;


//     <div className={styles.rowTable} key={item.id_tarja}>
//     <div className={styles.columnTable}>
//     <p className={styles.nServicio}
//         >N° de Servicio: {item.numero_servicio}</p>
//        <p className={styles.nContenedor}> Numero de contenedor: {item.contenedor} </p>
//      </div>
//     <div className={styles.columnTable}>
//         <p className={styles.tServicio}>Tipo de servicio : {item.tipo_servicio}</p>
//     </div>
//     <div className={styles.columnTable}>
//         <p className={styles.fecha}>Fecha : {item.fecha}</p>
//     </div>
//     <div className={styles.columnTable}>
//     {
//         item.numero_fotografias > 0 ?
//         <p className={styles.nFotografias}>Fotografias : {item.numero_fotografias}</p>
//           : <p className={styles.nFotografias}>Pendiente de fotografía</p>
//     }
//     </div>
//     <div className={styles.columnTable}>
//         <button className={styles.nBtnShow}
//         onClick={()=>showAlbum(item.id_tarja, item.contenedor, item.tipo_preview, item.numero_fotografias)}>Ver Fotografias</button>
//     </div>
// </div>