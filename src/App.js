import {
  BrowserRouter as Router,Routes,Route
} from 'react-router-dom'
import Header from './component/Header';
import Exchange from './component/Exchange';
import CoinDetail from './component/CoinDetail';
import Home from './component/Home';
import Coins from './component/Coin';
import Footer from './component/Footer';


function App() {
  return (
    
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/coins' element={<Coins/>}/>
          <Route path='/excahnge' element={<Exchange/>}/>
          <Route path='/coin/:id' element={<CoinDetail/>}/>



        </Routes>
        <Footer/>
      </Router>
  );
}

export default App;
