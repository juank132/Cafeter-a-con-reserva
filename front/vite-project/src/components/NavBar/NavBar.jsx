import styles from "./NavBar.module.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { removeUser } from "../../redux/reducer"

export const NavBar = () => {

    const user = useSelector((state) => state.user )
    const dispatch = useDispatch()
    console.log(user);

    return (
        <div className={styles.contenedor}>

            <div>
                <Link to={"/home"}><img className={styles.logo} src="https://www.zarla.com/images/zarla-espresso-patronum-1x1-2400x2400-20210624-trpb6jwt4p3g4jyppqpj.png?crop=1:1,smart&width=250&dpr=2" alt="" /></Link>
            </div>

            <ul className={styles.lista}>

                <li className={styles.li}><Link to="/home">HOME</Link></li>
                {user.name && <li className={styles.li}><Link to="/turnos">RESERVAS</Link></li>}
                <li className={styles.li}><Link to="/contacto">CONTACTO</Link></li>
            </ul>
                {
                user.name ? <button className={styles.deslog}
                onClick={() => {
                    dispatch(removeUser())
                }}>Logout</button> : <div>
                <Link to={"/"}><img  className={styles.perfil} src="https://cdn-icons-png.freepik.com/256/2623/2623137.png?ga=GA1.1.1240404800.1710467627&semt=ais_hybrid" alt="" /></Link>
                </div>
                }
                

            

        </div>
    )
}