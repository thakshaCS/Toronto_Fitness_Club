import React from 'react';
import logo from './logo.svg';
import './App.css';
import StudiosPage from "./components/studio_page";
import AllStudios from "./components/search_studios";
import StudioMap  from "./components/list_studios_by_locations";
import Navbar from './components/Navbar';
import Login from "./components/login/login";
import Register from "./components/register/register";
import UserInfo from "./components/user_info/user_info";
import UserUpdate from "./components/user_update/user_update";
import Logout from "./components/logout/logout";
import SubscriptionsChoose from "./components/subscriptions_choose/subscriptions_choose";
import CardStart from "./components/card/card";
import SubscriptionsInfo from "./components/subscriptions_info/subscriptions_info";
import SubscriptionsStartCancel from "./components/subscriptions_start_cancel/subscriptions_start_cancel";
import SubscriptionsUpdate from "./components/subscriptions_update/subscriptions_update";


import {BrowserRouter, Route, Routes} from "react-router-dom";
import UsingFetch from './pages/classes';
import Home from './components/pages';
import Class2 from './pages/enrolledclass';

function App() {

  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
                <Route path='/' exact element={<Home/>}/>
                <Route path="/find_studios/" exact element={<StudioMap  />} />
                <Route path="/studios/:lat/:long" exact element={< AllStudios/>} />
                <Route path="/studio/:id/" exact element={<StudiosPage/>} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/user/info' element={<UserInfo />} />
                <Route path='/user/update' element={<UserUpdate />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/classes' element={<UsingFetch />} />
                <Route path='/enrolledclass' element={<Class2 />} />
                <Route path='/subscriptions/choose' element={<SubscriptionsChoose />} />
                <Route path='/subscriptions/card' element={<CardStart />} />
                <Route path='/subscriptions/info' element={<SubscriptionsInfo />} />
                <Route path='/subscriptions/start' element={<SubscriptionsStartCancel />} />
                <Route path='/subscriptions/update' element={<SubscriptionsUpdate />} />


        </Routes>
    </BrowserRouter>
  )

}

export default App;
