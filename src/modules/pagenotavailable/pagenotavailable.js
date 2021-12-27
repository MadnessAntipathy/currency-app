import { render } from "react-dom";
import {useLocation} from 'react-router-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import {useEffect,useState} from 'react'
import toastr from 'toastr'
import { Card,CardHeader,CardBody,Col,Row,Input,InputGroup,InputGroupAddon,InputGroupText } from 'reactstrap'


const PageNotAvailable = (props) => {

  const location = useLocation();

  useEffect(()=>{
    if (location.state && location.state.error){
      toastr.error(location.state.error)
    }
  },[])

 return (
   <div className="CurrencyCard">
   <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet" />
   <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet" />
    <Card>
      <CardBody>
        <h1>Sorry, the requested resource is not available.</h1>
        <h2>Please try again later.</h2>
      </CardBody>
    </Card>
   </div>
 );
};

export default PageNotAvailable;
