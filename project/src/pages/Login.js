import styles from "./Login.module.css";
import loginPeople from '../assets/loginPeople.png';
import logo from '../assets/logo.png';

import { useState } from 'react'


// import LinkButton from '../layout/LinkButton'
// !configurar

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode implementar a lógica de login com as credenciais
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className={styles.wrp}>
      <div className={styles.wrpLogin}>
        <form onSubmit={handleSubmit}>
          <img className={styles.logo} src={logo} alt="logo da empresa" />
          <div className='saudacoes'>
            <h1>Bem-vindo</h1>
            <h3>Faça seu login</h3>
          </div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className='btn btn-primary' type="submit">Entrar</button>
        </form>
      </div>
      <div className={styles.bonecos}>
        <img src={loginPeople} alt="bonecos 3d" />
      </div>
    </div>
  );
}


export default Login
