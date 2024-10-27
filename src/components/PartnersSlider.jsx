import React, { useState } from 'react'
import styles from './PartnersSlider.module.css'
import imgArrow from '../assets/Vector (32).svg'


const partnersState = [
    { name: 'Facebook', img: './assets/Frame529.png' },
    { name: 'Facebook', img: './assets/Frame529.png' },
    { name: 'Facebook', img: './assets/Frame529.png' },
    { name: 'Facebook', img: './assets/Frame529.png' },
    { name: 'Facebook', img: './assets/Frame529.png' },
    { name: 'Facebook', img: './assets/Frame529.png' },
    { name: 'Facebook', img: './assets/Frame529.png' },
    { name: 'Facebook', img: './assets/Frame529.png' },
    { name: 'Facebook', img: './assets/Frame529.png' },
    { name: 'Facebook', img: './assets/Frame529.png' },


]

function PartnersSlider(props) {
    const [sliderStatePage , setSliderStatePage] = useState(0);
    const sliderFucntionLeft = () => {
        if(sliderStatePage != 0){
            setSliderStatePage(sliderStatePage - 1);
        }
    }
    const sliderFucntionRight = () => {
        const sliderCountPage = partnersState.length / 5;
        const sliderValuePage = sliderStatePage * 5;
        if(sliderCountPage > sliderValuePage){
            setSliderStatePage(sliderStatePage + 1)
        }
    }
    
    return (
        <div className={styles.partnersSlider}>
            <div className={styles.partnersBtnArrowLeft} >
                <div className={styles.partnersSliderBtn} onClick={sliderFucntionLeft} style={{background : sliderStatePage == 0 && '#f1f1f1'}}>
                    <img src={imgArrow} style={{transform: 'rotate(180deg)'}}/>
                </div>
            </div>
            <div className={styles.sliderContent}>
                <div className={styles.sliderContentRow} 
                style={{
                    transform: `translateX(-${sliderStatePage * 100}%)`,
                }}
                >
                    {partnersState.map((item, index) =>
                        <div className={styles.partnersIconsItem} key={index}>
                            <img src={item.img} alt={item.name} />
                        </div>
                    )}
                </div>

            </div>
            <div className={styles.partnersBtnArrowRight}>
                <div className={styles.partnersSliderBtn} onClick={sliderFucntionRight} style={{background: sliderStatePage * 5 > partnersState.length / 5 && '#f1f1f1'}}>
                    <img src={imgArrow} />
                </div>
            </div>

        </div>
    )
}
export default PartnersSlider
