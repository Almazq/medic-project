import React from 'react'
import styles from './VisitsPage.module.css';
import VisitsCard from './VisitsCard';
import img1 from '../../assets/image1.svg'
import img2 from '../../assets/image2.svg'
import { useSelector } from 'react-redux';



function VisitsPage() {
    const visitsState = useSelector((state) => state.some.visitsState); 



  return (
    <div className={styles.visitsPage}>
        <div className={styles.visitsPageLeft}>
        {
            visitsState.map(item => <VisitsCard data = {item} key={item.id}/>)
        }
        </div>
        <div className={styles.visitsPageRight}>
            <p>Bądź zawsze na bieżąco!</p>
            <p>Pobierz aplikację mobilną z planem wizyt od MyLekarz!</p>
            <div className={styles.visitsPageRightIcons}>
                <a href="#"><img src={img2}/></a>
                <a href="#"><img src={img1}/></a>
            </div>
            <div className={styles.qrBlock}>
                <div className={styles.qr}></div>
                {/* <img src="qr" alt="qe" /> */}

                <p>Zeskanuj kod i pobierz</p>
            </div>
                
        </div>
        
    </div>
  )
}
export default VisitsPage;