// import logo from './logo.svg';
import './App.css';
import Header from './modules/header/header'
import Main from './modules/main/main'
import CurrencyTable from './modules/currencytable/currencytable'
import CurrencyView from './modules/currencyview/currencyview'
import PageNotAvailable from './modules/pagenotavailable/pagenotavailable'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";

function App() {
  return (

    <div className="App">
    <BrowserRouter>
      <div className="App-header">
        <Header />
      </div>
      <div className="App-body">
        <Routes>
          <Route path="/" element={<Navigate replace to='/currencytable' element={<CurrencyTable />}/>}/>
          <Route path="/currencytable" element={<CurrencyTable />}/>
          <Route path="/view" element={<CurrencyView />}/>
          <Route path="/*" element={<PageNotAvailable />}/>
        </Routes>

      </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
