import axios from "axios";
import { useState } from "react";
import styles from "./createTurns.module.css";
import { validarTurn } from "../../helpers/validate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const CreateTurns = () => {
  const userApi = useSelector((state) => state.user)


  const [formData, setFormData] = useState({
    date: "",
    time: "",
    descripcion:""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (event) => {
    const { date, time, descripcion } = formData;
  const { id } = userApi;

        event.preventDefault();
        const formDataCopy = { ...formData };
        for (const key in formDataCopy) {
          if (!formDataCopy[key]) {
            formDataCopy[key] = "";
          }
        }
        setFormData(formDataCopy);
      
        const validationErrors = validarTurn(formDataCopy);
      
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
        const selectedDayOfWeek = new Date(formDataCopy.date).getDay();
        if (selectedDayOfWeek === 6 || selectedDayOfWeek === 5) {
          alert("No se permiten selecciones los fines de semana.");
          return;
        }

        const dateObject = new Date(date);
         const timeObject = new Date(`1970-01-01T${time}`);
  
         const formDataToSend = {
         date: dateObject,
         time: timeObject,
         userid: id
         
         };
        try {
            await axios.post("http://localhost:3005/appointment/schedule",formDataToSend)
            alert("Reserva Creada")
        } catch (error) {
            throw Error(error.message)
        }
           
    }

    return (
        <form className={styles.contenedor} onSubmit={handleSubmit}>
            <div className={styles.caja}>
                <h1>NUEVA RESERVA</h1>

                <label htmlFor="date">FECHA:</label>
                <input type="date" placeholder="example@gmail.com" value={formData.date} name="date" onChange={handleInputChange}/>
                {errors.date && <p className={styles.errorI}>{errors.date}</p>}

                <label htmlFor="time">HORA:</label>
                <input type="time" min="07:00" max="20:00"  value={formData.time} name="time" onChange={handleInputChange}/>
                {errors.time && <p className={styles.errorI}>{errors.time}</p>}

                <label htmlFor="descripcion">DESCRIPCION:</label>
                <input type="text" placeholder="descripcion" value={formData.descripcion} name="descripcion" onChange={handleInputChange}/>
                {errors.descripcion && <p className={styles.errorI}>{errors.descripcion}</p>}

                
                <button>Registrate</button>
            </div>
        </form>
    )
}