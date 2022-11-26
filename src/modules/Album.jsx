import React, { useContext, useEffect, useState } from 'react'
import GeneralLayout from '../layouts/GeneralLayout'
import { Button, Card } from 'react-bootstrap'
import ModalImages from './../components/ModalImages';
import { BASE_PATH } from './../utils/paths';
import Listado from './Listado'
import { GlobalContext } from './../context/GlobalContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { cleanLocalStorage } from './../utils/functions/helpers';
import Login from './Login';

const Album = ({idTarja, contenedor, numPhotos, serviceType}) => {
  const [photos, setPhotos] = useState([]);
  const [show, setShow] = useState(false);
  const [isAvaibleDownload, setIsAvaibleDownload] = useState(false);
  const [indexCarousel, setIndexCaousel] = useState(0);
  const [, setGlobal] = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isResponseError, setIsResponseError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (posicion) => {
    setShow(true);
    setIndexCaousel(posicion);
  }

  useEffect(() => {
    setIsLoading(true)  
    setReportState(serviceType, numPhotos)
    let token = `Barear ${window.localStorage.getItem('infoLoginApp')}`
    let params = {
      headers: {
        'Authorization': token
      }
    }
    fetch(`api/imagenes/${idTarja}`, params)
    .then((res)=>res.json())
    .then(data =>{
        validateSessionToken(data)
        if(!data.error && data.entidad != null){
          setPhotos(data.entidad);
          setIsLoading(false)  
        }else{
          setIsResponseError(true)
          //console.log(data);
        }
    });
  }, [])

  const backToList = () => {
    setIsLoading(true)  
    setTimeout(() => {
      setGlobal({
        module:<Listado/>
      })
      setIsLoading(false)  
    }, 2000);  
  }
  const validateSessionToken = (data) =>{
    if(data.error && (data.mensaje == 'Token expirado.' || data.mensaje == 'Token Inválido.')){        
      cleanLocalStorage()
      alert('Debe iniciar sesión nuevamente')
        setTimeout(() => {
            setGlobal({
              module:<Login/>
            })
          }, 2000);
        setIsLoading(false)
        return
    } 
  }

  const downloadReport = () =>{    
    let params = {   
      'headers':{       
          'Authorization': `Bearer ${localStorage.getItem('infoLoginApp')}`
      }
    }
    fetch(`api/imagenes/${idTarja}/reporte`, params)
    .then((res)=>res.json())
    .then(data =>{
        validateSessionToken(data)        
        const linkSource = `data:application/pdf;base64,${data.entidad.base64}`;
        const downloadLink = document.createElement("a");
        const fileName = `${contenedor}.pdf`;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    });
  }
  
  const setReportState = (tipoPreview, numFotos) => {    
    if(tipoPreview === 'C' && numFotos === 4){         
      setIsAvaibleDownload(true);
    }else if(tipoPreview === 'A' && numFotos === 5){
      setIsAvaibleDownload(true);        
    }else if(tipoPreview == '0' && numFotos === 7){      
      setIsAvaibleDownload(true);        
    }else{        
      setIsAvaibleDownload(false);
    }         
} 

  return (
    <GeneralLayout>
      <>
        <br></br>
        <h3 className="text-center">Fotografías de Servicio: <span style={{ color: '#f76c49' }}>{contenedor}</span></h3>
        <div style={{'display': 'flex', 'justifyContent': 'space-between'}}>
          <Button onClick={backToList} style={{'marginLeft': '70px', 'backgroundColor': '#f69100', 'border': '0'}}>Regresar</Button>          
          <Button onClick={downloadReport} disabled={!isAvaibleDownload || isResponseError} style={{'marginRight': '70px', 'backgroundColor': '#f69100', 'border': '0'}}>Descargar Reporte</Button>            
        </div>
        <div className='container' fluid='sm'>
          <div className='row justify-content-md-center'>
          {isResponseError&&
              <div style={{'display': 'flex', 'justifyContent': 'center','height':'500px','alignItems': 'center', alignContent: 'center'}}>
                Ocurrio un error al consumir las imágenes
              </div>
          }
          {
            isLoading ? <div style={{'display': 'flex', 'justifyContent': 'center','height':'500px','alignItems': 'center', alignContent: 'center'}}><LoadingSpinner/></div>  :  
          
              photos.map((foto, index) =>
                <div className='col' key={foto.id_foto}>
                  <div className='card' onClick={()=>handleShow(index)} style={{ width: '18rem', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>                  
                    <Card.Img variant="top" src={`data:image/jpeg;base64,${foto.base64}`} style={{ width: '250px', height: '250px' }} />
                    <Card.Body>
                    <p className="text-justify-content-center" >
                        {foto.descripcion}
                    </p>
                    </Card.Body>
                  </div>
                </div>
              )
            }
          </div>
          {
            show&&
              <ModalImages show={show} handleClose={handleClose} fotos={photos} index={indexCarousel} setIndex={setIndexCaousel}/>            
          }
          <br></br>
        </div>
      </>
    </GeneralLayout>
  )
}

export default Album