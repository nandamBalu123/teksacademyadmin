// import logo from './logo.svg';
import './App.css';
import Login from './components/logins/adminlogins/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/logins/adminlogins/Signup';
import Register from './components/inventory/Register';
import Edit from './components/inventory/Edit';
import Details from './components/inventory/Details'
import Navbaar from './components/inventory/Navbaar';
import Assignassets from './components/inventory/Assignassets';
import Dashboard from './components/dashboard/Dashboard';
import SideBar from './components/Sidebar/SideBar';
import Addassets from './components/inventory/Addassets';
import Addassetsform from './components/inventory/Addassetsform';
import Inventoryhome from './components/inventory/Inventoryhome';
import ReturnAssetsForm from './components/inventory/ReturnAssetsForm';

function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>

          <Route path='/dashboardhome' element={<Dashboard />}></Route>
          <Route path="/assignassets" element={<Assignassets />} />
          <Route path='/navbaar' element={<Navbaar />}></Route>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/assignassets/edit/:id" element={<Edit />} />
          <Route exact path="/assignassets/view/:id" element={<Details />} />
          <Route path='/sidebar' element={<SideBar />}></Route>
          <Route path='/addassets' element={<Addassets />}></Route>
          <Route path='/addassetsform' element={<Addassetsform />}></Route>
          <Route path='/inventory' element={<Inventoryhome />}></Route>
          <Route path='/assignassets/returnassets/:id' element={<ReturnAssetsForm />}></Route>
        </Routes>
        
      </BrowserRouter>
      
    </div>
  );
}

export default App;
