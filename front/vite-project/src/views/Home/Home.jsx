import { Link, useNavigate } from "react-router-dom"
import styles from "./Home.module.css"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export const Home = () => {


    return (
        <main>
            <section className={styles.back}>
                    <div className={styles.contenedor}>
                        <h1 className={styles.titulo}>Espresso patronum</h1>
                        <p className={styles.letra}>RESERVA TU MESA ONLINE, NO TE QUEDES SIN TU MESA!!</p>
                        <div className={styles.boton}><h2><Link to="/turnos">ORDENAR AHORA!</Link></h2></div>
                    </div>
            </section>
            <section className={styles.fondo}>
                <div className={styles.contenedor2}>
                    <h2>✨NO TE PIERDAS UNA EXPERIENCIA MÁGICA✨</h2>
                    <p>¡ADÉNTRATE EN EL MUNDO MÁGICO DE HARRY POTTER MIENTRAS DISFRUTAS DE UNA EXPERIENCIA ÚNICA EN NUESTRA CAFETERÍA TEMÁTICA! UBICADA EN EL CORAZÓN DEL CALLEJÓN DIAGON, NUESTRA CAFETERÍA TE TRANSPORTARÁ A LOS RINCONES MÁS ENCANTADORES DEL UNIVERSO DE HOGWARTS.</p>
                    <img src="https://www.okchicas.com/wp-content/uploads/2021/05/Cafeteria-y-escuela-de-brujas-en-Mexico-13.jpg" alt="" />
                    <img src="https://www.okchicas.com/wp-content/uploads/2021/05/Cafeteria-y-escuela-de-brujas-en-Mexico-4.jpg" alt="" />
                </div>
            </section>
            <section className={styles.back2}>
                    <div className={styles.contenedor}>
                        <p className={styles.letra2}>¡BIENVENIDO A NUESTRO TEATRO MÁGICO: CENA Y ESPECTÁCULO! ADÉNTRATE EN EL MUNDO DE LA MAGIA Y VIVE UNA EXPERIENCIA INOLVIDABLE INSPIRADA EN EL UNIVERSO DE HARRY POTTER. VEN A NUESTRO RESTAURANTE ANTES O DESPUÉS DE DISFRUTAR DE UNA OBRA Y DÉJATE HECHIZAR POR NUESTRA DELICIOSA PROPUESTA GASTRONÓMICA.
                                                    EMPRENDE UN VIAJE A TRAVÉS DE LOS PASILLOS DE HOGWARTS, DONDE LOS HECHIZOS Y LAS AVENTURAS SE FUSIONAN CON LA COMIDA Y LA DIVERSIÓN. DESDE EL CALDERO DE POCIONES HASTA LOS BANQUETES EN EL GRAN COMEDOR, NUESTRO RESTAURANTE TE TRANSPORTARÁ A UN MUNDO LLENO DE SABORES Y ENCANTAMIENTOS.
                                                    ¡AHORA ACEPTAMOS RESERVAS PARA MESAS, CUMPLEAÑOS Y EVENTOS ESPECIALES! NO TE PIERDAS LA OPORTUNIDAD DE CELEBRAR TUS OCASIONES MÁS MÁGICAS CON NOSOTROS.</p></div>
            </section>
            <section className={styles.footer}>
                <h4>FOOTER</h4>
            </section>
        </main>
    )
}