import {useEffect,useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Button,Card,CardHeader,CardBody,Col,Row,Input,InputGroup,InputGroupAddon,InputGroupText } from 'reactstrap'

const Header = () => {

 const navigate = useNavigate()

 return (
   <div style={{marginTop:'10px',width:'100%'}}>
    <Row>
        <Col md={3}>
          <img width='100%' height='50px' src='https://www.gentingrewards.com.sg/-/media/project/gaming/grportal/logo/rws-n-gr-logo.jpg?h=119&w=680&la=en&hash=D925CBA649B85CB0319BCBDEFFD0018DBEAB1AC8' />
        </Col>
        <Col md={8}>
        <div className='MenuItems'>
        {navLinks.map((link,index)=>{
          return (
            <Button key={index} className='MenuButton' color='outline-dark' onClick={()=>navigate(link.path)}>{link.label}</Button>
          )
        })}
        </div>
        </Col>
        <Col md={1}>
        <div className='MenuItems'>
        <Button style={{width:'100%'}} className='MenuButton' color='outline-dark' >Log In</Button>
        </div>
        </Col>
    </Row>

   </div>
 );
};

const navLinks = [
  {label:"Home",path:'/currencytable'},
  {label:"Corporate Enquiries",path:'/currencytable'},
  {label:"Exchange Rates",path:'/currencytable'},
  {label:"Entertainment",path:'/currencytable'},
  {label:"Contact Us",path:'/currencytable'}
]

export default Header;
