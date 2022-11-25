import styles from './Footer.module.css'
import { useState, useEffect } from 'react';
const Footer = () => {

    const [currentYear, setCurrentYear] = useState();

    const configYear = () => {
        const currentDate = new Date();
        setCurrentYear(currentDate.getFullYear())
    }
    useEffect(() => {
      configYear()
    }, [])
    
    return (
        <div className={styles.footerContainer}>
                { <footer className="d-flex flex-wrap justify-content-between align-items-center">
                    <div className="col-md-4 d-flex align-items-center">                    
                        <span className={styles.textCompany}>© {currentYear} Contecon Manzanillo, An Ictsi Group Company</span>
                    </div>
                    
                </footer>}
        </div>
    )
}

export default Footer