import { Link } from "react-router-dom";
import WrpAll from "./WrpAll";
import { IoNotificationsCircleSharp, IoFilterCircleSharp, IoCogSharp } from 'react-icons/io5'
import Board from "../Board";
import styles from "./Home.module.css";
// import logo from "../../img/costs_logo.png";

function Home() {
    return (
        <div className={styles.wrp}>
        <nav>
            <ul>
                <li>
                    <IoFilterCircleSharp />
                    <a href="#" class="active">
                        {/* <ion-icon name="filter-outline"></ion-icon> */}
                        Filtro
                    </a>
                </li>
                <li>
                    <IoNotificationsCircleSharp />
                    <a href="#">
                        Notificações
                    </a>
                </li>
                <li>
                <IoCogSharp />
                    <a href="#">
                        {/* <ion-icon name="cog"></ion-icon> */}
                        Configurações
                    </a>
                </li>
            </ul>
        </nav>
        <Board />
        </div>
    )

}
export default Home;