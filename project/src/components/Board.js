import { IoNotificationsCircleSharp, IoFilterCircleSharp, IoCogSharp } from 'react-icons/io5'

import styles from "./Board.module.css";
// import logo from "../../img/costs_logo.png";
import feed from "./layouts/Feed"
import Feed from './layouts/Feed';

function Board() {
    return (
        <div className={styles.board}>
            <div className={styles.perfil}>
                {/* <img src="https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2t8ZW58MHx8MHx8&w=1000&q=80" */}
                {/* alt=""/> */}
                <div className={styles.fotoPerfil}></div>
                <h1>Empresa XYZ</h1>
                <a href='#' className='btn btn-primary'>botao</a>
            </div>
            <Feed></Feed>
        </div>
    )
}
export default Board