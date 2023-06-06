// import { IoNotificationsCircleSharp, IoFilterCircleSharp, IoCogSharp } from 'react-icons/io5'

import styles from "./Feed.module.css";
// import logo from "../../img/costs_logo.png";

function Feed() {
    return (
        <div className={styles.wrp}>
            <div className={styles.fotoNome}>
                <h2>Fulano 1</h2>
                <div className={styles.fotoFeed}>
                    <div>

                    </div>
                </div>
            </div>
            <div className={styles.dadosFeed}>
                <p>Fulano 1</p>
            </div>
            <div className="botaoCurtir">
                <a href='#' className='btn btn-primary'>Curtir</a>
            </div>
        </div>
    )
}
export default Feed