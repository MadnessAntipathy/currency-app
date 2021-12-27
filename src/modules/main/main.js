import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import {useEffect,useState} from 'react'
import { Card,CardHeader,CardBody,Col,Row,Input,InputGroup,InputGroupAddon,InputGroupText } from 'reactstrap'


const Main = () => {

 return (
   <div className='MainCard'>
    <Outlet/>
   </div>
 );
};

export default Main;
