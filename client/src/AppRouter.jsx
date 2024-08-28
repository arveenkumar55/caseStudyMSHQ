import { Route, Routes } from 'react-router-dom';
import {useDispatch, useSelector } from "react-redux";
import './App.css';
import Header from './components/Header';
import Categories from './pages/Categories';
import Home from './pages/Home';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NoMatch from './pages/NoMatch';
import ForgotPassowrd from './pages/Forgot'

const App = () => {
  const { user } = useSelector((state) => state.authReducer);
  
  console.log('user', user)

  return (
  <>
    <Header />
    <main className="bg-light min-vh-100 d-flex py-5">
      <div className="container-lg pt-3 pt-md-5">
        <div className="row mx-0 justify-content-center pt-3">
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/ForgotPassword" element={<ForgotPassowrd />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </div>
      </div>
    </main>
  </>
)}

export default App;
