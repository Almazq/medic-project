import React from 'react'
import styles from './style/DoctorProfile.module.css';
import profileImg from '../../assets/tst,small,845x845-pad,1000x1000,f8f8f8.jpg';
import MapComponent from './Maps'
import ReviewCard from '../ReviewCard';
import { NavLink } from 'react-router-dom';


const reviewData = [
    {},
    {},
    {},
    {},

]
function DoctorProfile() {

    return (
        <div className={styles.doctorProfile}>
            <div className={styles.doctorProfileRow}>
                <div className={styles.profileNameBlock}>
                    <div>
                        <img src={profileImg} alt="profileImage" />
                    </div>
                    <div>
                        <p className={styles.profileName}>Ania Kaczmarska</p>
                    </div>
                    <div>
                        <p className={styles.profileType}>Ortopeda</p>
                    </div>

                </div>
                <div className={styles.profileDescription}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt reiciendis tempore quos recusandae, mollitia dolores optio itaque quibusdam ducimus totam eveniet assumenda nulla, minus laboriosam quod autem veritatis corrupti earum?</p>
                </div>
            </div>
            <div className={styles.mapBlock}>
                {/* <MapComponent address={"Tokyo"} /> */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155738.88831080226!2d16.79320059739124!3d52.41718485762118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470444d2ece10ab7%3A0xa4ea31980334bfd1!2zUG96bmHFhCwgUG9sYW5k!5e0!3m2!1sen!2skz!4v1723792122706!5m2!1sen!2skz"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className={styles.titleBLock}>
                <h2>Opinia o lekarze</h2>
                <button> <NavLink to={`/reviews/user/${0}`}>Zobacz wszyatkie</NavLink> </button>
            </div>
            <div className={styles.review}>
                {
                    reviewData.map(item => <ReviewCard />)
                }
            </div>
        </div>
    )
}
export default DoctorProfile;