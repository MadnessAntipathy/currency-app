import {useEffect,useState} from 'react'
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setCurrencyInStore } from './currencyslice'
import {retrieveCurrency,retrieveCurrencyAbbreviation} from './currencytableactions'
import toastr from 'toastr'
import moment from 'moment'
import { Button,Card,CardHeader,CardBody,Row,Input,InputGroup,InputGroupAddon,InputGroupText } from 'reactstrap'
import Paginate from '../paginate/paginate'


const CurrencyTable = () => {
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const [currency, setCurrency] = useState('');
 const [filter, setFilter] = useState({})
 const [currencyList, setCurrencyList] = useState([]);
 const [displayCurrencyList, setDisplayCurrencyList] = useState([]);
 const [sizeOption, setSizeOption] = useState(5);
 const [navigateTo, setNavigateTo] = useState('')

 const currentCurrency = useSelector((state)=>state.currency.value)

 useEffect(() =>{
   setCurrency((currency)=>currentCurrency)
   // setCurrencyList((currencyList)=>[{name:'asd',currencyCode:'jpy',value:123123},{name:'def',currencyCode:'456',value:123123}])
   retrieveCurrency().then(async response=>{

     await retrieveCurrencyAbbreviation().then(abbreviationResponse=>{
       if (response.success){
         //test for type object, iterate through object keys
         if (typeof response.data === 'object' &&
            !Array.isArray(response.data) &&
            response.data !== null){
              let tempList = []
              for (const key in response.data){
                if (response.data.hasOwnProperty([key])){
                  let obj = {
                    currencyCode:key,
                    value:response.data[key]
                  }
                  if (abbreviationResponse.data){
                    obj.name = abbreviationResponse.data[key.toUpperCase()] || key
                  }
                  tempList.push(obj)
                }
              }
              setCurrencyList((currencyList)=>tempList)
              setCurrency((currency)=>currentCurrency)
            }
          }else{
            navigate('/notavailable',{state:{error:response.error}})
          }
     }).catch(err=>{
       throw err
     })
   }).catch(err=>{
     navigate('/notavailable',{state:{error:err.error ? err.error : JSON.stringify(err)}})
   })

 },[])

 useEffect(()=>{
    let currencyFilter = {currencyCode:currency}
    setFilter((filter)=>currencyFilter)
 },[currency])

 const handleSetSizeOption = (value) => {
   setSizeOption((sizeOption) => Number(value));
 }

 const getResults = (value)=>{
   setDisplayCurrencyList((displayCurrencyList)=>value.data)
 }

 const handleViewCurrency = (currency)=>{
   //navigate to view currency page
   dispatch(setCurrencyInStore(currency))
   navigate('/view')
 }

 return (
   <div className="CurrencyCard">
   <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet" />
   <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet" />
     <Card>
      <CardHeader>
        Exchange Rates
      </CardHeader>
      <CardBody className="CurrencyCardBody">
        <div className='CurrencyTableSelection'>
          <Input style={{width:'200px'}} placeholder={'Search Currency Here'} className='CurrencySelectionInput' type='text' value={currency} onChange={e=>setCurrency((currency) => e.target.value)}/>
          <Input style={{width:'200px'}} type='select' value={sizeOption} onChange={e=>setSizeOption((sizeOption)=>e.target.value)}>
            <option value={5}>Show 5 Results</option>
            <option value={10}>Show 10 Results</option>
            <option value={15}>Show 15 Results</option>
            <option value={20}>Show 20 Results</option>
          </Input>

        </div>

        <table className='CurrencyTable'>
          <thead>
            <tr>
              <th width='50px'>#</th>
              <th className='CurrencyTableHeaderCellBorder'>Currency</th>
              <th className='CurrencyTableHeaderCellBorder'>Currency Code</th>
              <th className='CurrencyTableHeaderCellBorder'>Rates(USD)</th>
              <th className='CurrencyTableHeaderCellBorder'>Valid Till</th>
              <th className='CurrencyTableHeaderCellBorder'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayCurrencyList.map((currency,index)=>{
              return(
                <tr key={index}>
                  <td className='CurrencyTableCellBorder'>{index+1}</td>
                  <td className='CurrencyTableCellBorder'>{currency.name}</td>
                  <td className='CurrencyTableCellBorder'>{currency.currencyCode}</td>
                  <td className='CurrencyTableCellBorder'>{currency.value}</td>
                  <td className='CurrencyTableCellBorder'>{moment().endOf('day').toString()}</td>
                  <td className='CurrencyTableCellBorder'><Button onClick={()=>handleViewCurrency(currency.currencyCode)}>View History</Button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Paginate filter={filter} callback={getResults} itemsPerPage={sizeOption} data={currencyList} />
      </CardBody>
     </Card>
   </div>
 );
};

export default CurrencyTable;
