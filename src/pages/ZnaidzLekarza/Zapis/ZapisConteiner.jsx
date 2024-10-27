import React, { useState, useEffect } from 'react';
import ZapisPage from './ZapisPage'
import { useNavigate } from 'react-router-dom';
import ZapisFormPage from './ZapisFormPage';
import ZapisDone from './ZapisDone';
import { getCookie } from '../../../utilits/AuthToken';

import LoadingPage from './LoadingPage';

import { sendNewOrder } from '../../../services/apiService';

function ZapisConteiner({ zapisState , isLoggedIn}) {

    const [data, setData] = useState(zapisState);
    const [typWizyty, setTypWizyty] = useState("Konsultacja ginekologiczna • 290,00 zł");
    const [rodzajWizyty, setRodzajWizyty] = useState("Prywatna");
    const [selectedRadio, setSelectedRadio] = useState('null');
    const [activePageName, setActivePageName] = useState('ZapisPage');
    const [selectedFile, setSelectedFile] = useState(null); // Хранение файла
    const [formDataObj , setFormDataObj] = useState({})
    const navigate = useNavigate();


    useEffect(()=>{
        if(!isLoggedIn){
            navigate('/auth/');
          }
    }, [])
    // проверка куки 
    // useEffect(() => {
    //   
    //   const authToken = getCookie('authToken');
      
    //  
    //   if (!authToken) {
    //     navigate('/auth');
    //   }
    // }, [navigate]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file); // Сохраняем объект файла
        }
    };
    const getLocalStorage = () => {
        const savedState = localStorage.getItem('zapisState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);

            setData(parsedState);
        }
    }
    useEffect(() => {
        getLocalStorage()

    }, [])
    const changeActivePage = (name) => {
        setActivePageName(name)
    }

    const addMinutes = (time, minutes) => {
        const [hours, mins] = time.split(':').map(Number);
        const newMins = mins + minutes;
        const newHours = hours + Math.floor(newMins / 60);
        const finalMins = newMins % 60;
        return `${String(newHours).padStart(2, '0')}:${String(finalMins).padStart(2, '0')}`;
    };

    const endTime = data.time ? addMinutes(data.time, 15) : '';

    const addZapisFc = async (name, surName, phone, pesel, file, comments) => {
        // setActivePageName('loading');
        setActivePageName('ZapisDone')

        const formData = new FormData();
        formData.append('name', name);
        formData.append('surName', surName);
        formData.append('phone', phone);
        formData.append('pesel', pesel);
        formData.append('file', selectedFile);
        formData.append('comments', comments);
        formData.append('typWizyty', typWizyty);
        formData.append('rodzajWizyty', rodzajWizyty);
        formData.append('selectedRadio', selectedRadio);
        formData.append('date', data.date);
        formData.append('time', data.time);
        formData.append('idDoctor', data.idDoctor);
        formData.append('nameDoctor', data.name);
        setFormDataObj({
            name:name , 
            surName : surName , 
            phone:phone , 
            pesel : pesel , 
            comments:comments,
            file:file
        })
        try {
            const result = await sendNewOrder(formData);
            console.log('Form submitted successfully:', result);
            setActivePageName('ZapisDone')

        } catch (error) {
            console.error('Error submitting form:', error);
            // alert('Запрос не отправлен')
            // setActivePageName('ZapisPage')

        }
    }
    return (
        <div>
            {
                data.idDoctor !== undefined ? (
                    activePageName === "ZapisPage" && (
                        <ZapisPage
                            zapisState={zapisState}
                            data={data}
                            typWizyty={typWizyty}
                            setTypWizyty={setTypWizyty}
                            rodzajWizyty={rodzajWizyty}
                            setRodzajWizyty={setRodzajWizyty}
                            selectedRadio={selectedRadio}
                            setSelectedRadio={setSelectedRadio}
                            changeActivePage={changeActivePage}
                            endTime = {endTime}
                        />
                    ) || activePageName === "ZapisFormPage" && (
                        <ZapisFormPage
                            zapisState={zapisState}
                            data={data}
                            typWizyty={typWizyty}
                            rodzajWizyty={rodzajWizyty}
                            selectedRadio={selectedRadio}
                            endTime = {endTime}
                            changeActivePage={changeActivePage}
                            addZapisFc={addZapisFc}
                            handleFileUpload={handleFileUpload}

                        />
                    )|| activePageName === "loading" && (
                        <LoadingPage/>
                    )|| activePageName === "ZapisDone" && (
                        <ZapisDone
                            data={data}
                            typWizyty={typWizyty}
                            rodzajWizyty={rodzajWizyty}
                            selectedRadio={selectedRadio}
                            endTime = {endTime}
                            changeActivePage={changeActivePage}
                            addZapisFc={addZapisFc}
                            handleFileUpload={handleFileUpload}
                            formDataObj={formDataObj}
                        />
                    )
                ) : (
                    <div>Loading...</div>
                )
            }

        </div>
    )
}
export default ZapisConteiner