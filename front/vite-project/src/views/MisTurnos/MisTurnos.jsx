import { Turno } from "../../components/Turno/turno";
import {misTurnos} from "../../helpers/misTurnos"
import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./MisTurnos.module.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserAppointments } from "../../redux/reducer";
import { Link } from "react-router-dom";


export const MisTurnos = () => {
    const turnos = useSelector((state) => state.userAppointments)
    
    const userApi = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        !userApi.name && navigate("/")
    },[])


    useEffect( () => {
        const fetchData = async () =>{
        try{
        const res = await axios.get(`http://localhost:3005/users/${userApi.id}`)
        dispatch(setUserAppointments(res.data.appointments))
        console.log(res.data.appointments);

    }   catch(error){
        console.log('error' + error.message)
    }
};
    userApi.name && fetchData()
    },[])



    console.log(turnos);


    return (
        <>
        <div>
        <h1 className={styles.title}>MIS RESERVAS</h1>
        <Link to={"/contacto"}> <button  className={styles.formboton}>Nueva Reserva</button></Link>

        {!turnos.length && <h3 className={styles.nohay}>No hay reservas pendientes</h3>}
        
        <div className={styles.contenedorTarjetas}>
            {turnos.map(turno => {return <Turno
            key={turno.id}
            date={turno.date}
            time={turno.time}
            status={turno.status}
            id={turno.id}

        />})}
        </div>
        </div>
        </>
    )
}
