// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import ItensSidebar from './components/layouts/Home'
import Login from './pages/Login'
// import Board from './components/Board';
// import WrpAll from './components/layouts/WrpAll'

function App() {
  return (
    <Router>
      <div>
        <Link to="/home">ItensSidebar</Link>
        <Link to="/">Login</Link>
      </div>
      {/* O que fica fora do Routes aparece em todas as páginas */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<ItensSidebar />} />
      </Routes>
      <footer> Desenvolvido por Temistocles Zwang</footer>
    </Router>

  );
}

export default App;
