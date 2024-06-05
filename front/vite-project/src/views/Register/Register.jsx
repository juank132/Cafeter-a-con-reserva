import axios from "axios";
import { useState } from "react"
import styles from "./Register.module.css"
import { fechaHoy, registerValidate } from "../../helpers/validate";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate()



    const [formData, setFormData] = useState({
        email: "",
        name: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",    
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value})
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = registerValidate(formData);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const arr = await axios.get("http://localhost:3005/users")
            arr.data.forEach(user => {
                if (formData.username == user.username|| formData.email == user.email){
                    throw Error("Ya existe el usuario")
                }
            });
            await axios.post("http://localhost:3005/users/register", formData)
            alert('usuario creado');
            navigate("/")
        } catch(error){
            alert("Error al crear el usuario usuarios: " + error.message);
        }
    }

    return (
        <form className={styles.contenedor} onSubmit={handleSubmit}>
            <div className={styles.caja}>
                <h1>REGISTER</h1>

                <label htmlFor="email">Email:</label>
                <input type="email" placeholder="example@gmail.com" value={formData.email} name="email" onChange={handleInputChange}/>
                {errors.email && <p className={styles.errorI}>{errors.email}</p>}

                <label htmlFor="name">Name:</label>
                <input type="text" placeholder="Name" value={formData.name} name="name" onChange={handleInputChange}/>
                {errors.name && <p className={styles.errorI}>{errors.name}</p>}

                <label htmlFor="nDni">DNI:</label>
                <input type="number" placeholder="num dni" value={formData.nDni} name="nDni" onChange={handleInputChange}/>
                {errors.nDni && <p className={styles.errorI}>{errors.nDni}</p>}

                <label htmlFor="birthdate">Birthdate:</label>
                <input type="date" placeholder="birthdate" value={formData.birthdate} name="birthdate" min={"1800-12-31"} max={fechaHoy} onChange={handleInputChange}/>
                {errors.birthdate && <p className={styles.errorI}>{errors.birthdate}</p>}

                <label htmlFor="username">Username:</label>
                <input type="text" placeholder="user" value={formData.username} name="username" onChange={handleInputChange}/>
                {errors.username && <p className={styles.errorI}>{errors.username}</p>}

                <label htmlFor="password">Password:</label>
                <input type="password" placeholder="New password" value={formData.password} name="password" onChange={handleInputChange}/>
                {errors.password && <p className={styles.errorI}>{errors.password}</p>}

                <button>Registrate</button>
            </div>
        </form>
    )
}