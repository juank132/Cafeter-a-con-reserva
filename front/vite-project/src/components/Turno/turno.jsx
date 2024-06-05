import axios from "axios";
import styles from "./turno.module.css"
import { useDispatch } from "react-redux";
import { cancelAction } from "../../redux/reducer";
import { useNavigate } from "react-router-dom";


export const Turno = ({date,time,status,id}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const statusClass = status === 'Active' ? styles.active : styles.canceled;

    const cancel = async () => {
        try {
            const res = await axios.put(`http://localhost:3005/appointment/cancel/${id}`)
            console.log(res);
            dispatch(cancelAction(id))
        } catch (error) {
            throw Error("Error al cancelar: " + error.message);
        }
    }

    const handleCancel = () => {
        cancel()
    }

    return (
    
        <div key={id} className={styles.tarjeta}>
            <h4>FECHA: {date && new Date(date).toLocaleDateString()}</h4>
            <h4>HORA: {time && new Date(time).toLocaleTimeString()}</h4>
            <h4 id="veri" className={statusClass}>{status}</h4>
            <button onClick={handleCancel}>Cancelar</button>
        </div>
    
    )
}
