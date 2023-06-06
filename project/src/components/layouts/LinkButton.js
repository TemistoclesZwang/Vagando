import styles from './LinkButton.module.css'
import { Link } from 'react-router-dom'

function LinkButton({ to, text }) {
    return (
        <Link className={btn-primary} to={to}>
            {text}
        </Link>
    )
}

export default LinkButton
