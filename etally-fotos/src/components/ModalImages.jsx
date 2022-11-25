import React from 'react'
import styles from './ModalImages.module.css'
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
const ModalImages = ({ show, handleClose, fotos, index, setIndex }) => {

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className={styles.modalContainer}>
            <Modal aria-labelledby="contained-modal-title-vcenter" centered  size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Carousel activeIndex={index}  onSelect={handleSelect}>
                    {
                        fotos.map(foto => 
                            <Carousel.Item key={foto.id_foto}>
                                <img className="w-100"
                                    src={`data:image/jpeg;base64,${foto.base64}`}       
                                />
                                <Carousel.Caption>                                   
                                    { <p className={styles.descripcion}>{foto.descripcion}</p>}
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    }                    
                    </Carousel>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalImages