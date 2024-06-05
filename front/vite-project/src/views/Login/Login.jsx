import axios from "axios";
import { useState } from "react";
import styles from "./Login.module.css"
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../../helpers/validate";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/reducer";

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [from, setForm] = useState({
        username: "",
        password: "",    
    });

    const [errores, setErrores] = useState({});

    console.log(from);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setForm({...from, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
        const arr = await axios.get("http://localhost:3005/users")
        const users = arr.data;
        const findUsers = users.find((user)=> user.credential.username === from.username && user.credential.password === from.password)
        if (findUsers) {
            const post = await axios.post("http://localhost:3005/users/login", from);
            alert("Iniciando sesión...");
            dispatch(addUser(post.data.user));
            navigate("/home");
            setForm({
                username: "",
                password: "",    
            })
        } else{
            const validationErrors = validate(from);
            setErrores(validationErrors);
            alert('El usuario no existe')
        }
    } catch(error){
        throw Error("Error al obtener usuarios: " + error.message);
    }
    }
    

    return (
        <form className={styles.contenedor} onSubmit={handleSubmit}>
            <div className={styles.caja}>
            <h1>LOGIN</h1>

            <label htmlFor="">Username:</label>
            <input  type="text" placeholder="username" value={from.username} name="username" onChange={handleInputChange}/>
            {errores.username && <p className={styles.errorI}>{errores.username}</p>}

            <label htmlFor="">Password:</label>
            <input   type="password" placeholder="password" value={from.password} name="password" onChange={handleInputChange}/>
            {errores.password && <p className={styles.errorI}>{errores.password}</p>}

        <div><h4>No tenes cuenta?<Link to={"/register"}>REGISTRATE</Link></h4></div>
            <button>Login</button>
            </div>
        </form>
    )
}