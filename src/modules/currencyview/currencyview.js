import { useNavigate } from "react-router-dom";
import {useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactDOM from 'react-dom';
import { Button,Card,CardHeader,CardBody,Col,Row,Label,Input,InputGroup,InputGroupAddon,InputGroupText,Spinner,FormGroup } from 'reactstrap'
import {retrieveCurrencyHistorical,retrieveCurrencyAbbreviation} from '../currencytable/currencytableactions'
import toastr from 'toastr'
import moment from 'moment'
import Victory from '../victory/victory'

const CurrencyView = () => {

 const [currency, setCurrency] = useState('');
 const [dayRange, setDayRange] = useState(6);
 const [filter, setFilter] = useState({})
 const [currencyList, setCurrencyList] = useState([]);
 const [sortedCurrencyList, setSortedCurrencyList] = useState([]);
 const [displayCurrency, setDisplayCurrency] = useState(null);

 const [sortByLatestDate, setSortByLatestDate] = useState(null)
 const [sortByHighestPrice, setSortByHighestPrice] = useState(null)

 const navigate = useNavigate()

 const currentCurrency = useSelector((state)=>state.currency.value)

 useEffect(()=>{
   if (!currentCurrency){
     navigate('/')
     return
   }
   // getData()
 },[])

 useEffect(()=>{
   setCurrencyList((currencyList)=>[])
   getData()
 },[dayRange])

 // useEffect(()=>{
 //   setSortedCurrencyList((sortedCurrencyList)=>sortedCurrencyList)
 // },[sortedCurrencyList])

 useEffect(()=>{
   // sort by date followed by price
   let sortedList = JSON.parse(JSON.stringify(currencyList))

   if (sortByLatestDate){
     sortedList = sortedList.sort(function(a, b){return moment(b.date).diff(moment(a.date))});
   }else if (sortByLatestDate === null){
     sortedList = JSON.parse(JSON.stringify(currencyList))
   }else{
     sortedList = sortedList.sort(function(a, b){return moment(a.date).diff(moment(b.date))});
   }


   if (sortByHighestPrice){
     sortedList = sortedList.sort(function(a, b){return b.currencyValue-a.currencyValue});
   }else if (sortByHighestPrice === null){
     sortedList = JSON.parse(JSON.stringify(sortedList))
   }else{
     sortedList = sortedList.sort(function(a, b){return a.currencyValue-b.currencyValue});
   }
   setSortedCurrencyList((sortedCurrencyList)=>sortedList)

 },[sortByLatestDate,sortByHighestPrice])

 function getData(){
   let currentDate = moment().format("YYYY-MM-DD")
   let pastSevenDays = moment().subtract(dayRange,'d').format("YYYY-MM-DD")
   retrieveCurrencyHistorical(currentDate,pastSevenDays).then(async response=>{
     await retrieveCurrencyAbbreviation().then(abbreviationResponse=>{
       if (response.success){
         //test for type object, iterate through object keys
         if (typeof response.data === 'object' &&
            !Array.isArray(response.data) &&
            response.data !== null){
              let tempList = []
              let dataSetlength = Object.entries(response.data).length
              for (const key in response.data){
                if (response.data.hasOwnProperty([key])){
                  let obj = {
                    date:key,
                    currencyValue:response.data[key][currentCurrency.toUpperCase()],
                    x:`${moment(key).date()}/${moment(key).month()+1}`,
                    y:response.data[key][currentCurrency.toUpperCase()]
                  }
                  if (abbreviationResponse.data){
                    setCurrency((currency)=>abbreviationResponse.data[currentCurrency.toUpperCase()] || currentCurrency)
                    obj.name = abbreviationResponse.data[currentCurrency.toUpperCase()] || currentCurrency
                  }
                  tempList.push(obj)
                }
              }
              setCurrencyList((currencyList)=>JSON.parse(JSON.stringify(tempList)))
              setSortedCurrencyList((sortedCurrencyList)=>JSON.parse(JSON.stringify(tempList)))
            }
          }else{
            toastr.error(response.error)
          }
     }).catch(err=>{
       throw err
     })
   }).catch(err=>{
     navigate('/notavailable',{state:{error:err.error ? err.error : JSON.stringify(err)}})
   })
 }

 function pipeDataToBox(data){
   setDisplayCurrency((displayCurrency)=>data)
 }

 function handleDateSort(value){
   let booleanState = value === 'true' ? true : value === 'null' ? null : false
   setSortByLatestDate((sortByLatestDate)=>booleanState)

 }
 function handlePriceSort(value){
   let booleanState = value === 'true' ? true : value === 'null' ? null : false
   setSortByHighestPrice((sortByLatestDate)=>booleanState)
 }

 return (
   <div className="CurrencyCard">
   <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet" />
   <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet" />
     <Card>
      <CardHeader>
        Viewing: {currency ? currency : <Spinner />}
      </CardHeader>
      <CardBody>
        <Row>
          <Col md={6}>
          <Input style={{width:'200px'}} type='select' value={dayRange} onChange={e=>setDayRange((dayRange)=>e.target.value)}>
            <option value={4}>Show Last 5 Days</option>
            <option value={6}>Show Last 7 Days</option>
            <option value={29}>Show Last 30 Days</option>
            <option value={364}>Show Last 365 Days</option>
          </Input>
            {currencyList.length != 0 ?
              <Victory pipeDataToBox={pipeDataToBox} dataSet={currencyList}/>:
              <Spinner/>
            }

          </Col>
          <Col md={4} style={{textAlign:"left",fontSize:'15px'}}>
            <FormGroup>
            <Row>
              <Col>
                <Label>Name:</Label>
              </Col>
              <Col>
                {displayCurrency ? displayCurrency.datum.name : null}
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Price:</Label>
              </Col>
              <Col>
                {displayCurrency ? displayCurrency.datum.currencyValue : null}
              </Col>
            </Row>
            <Row>
              <Col>
                <Label>Date:</Label>
              </Col>
              <Col>
                {displayCurrency ? moment(displayCurrency.datum.date).format('LL') : null}
              </Col>
            </Row>
            </FormGroup>
            <FormGroup>
            <table style={{display:'block',width:'425px',height:'400px',overflowY:'auto'}}>
              <thead>
                <tr>
                  <th>Price History ($1USD)</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Input type='select' style={{width:'200px'}}  onChange={e=>handlePriceSort(e.target.value)}>
                      <option value={'null'}>Show Default</option>
                      <option value={'true'}>Highest To Lowest</option>
                      <option value={'false'}>Lowest To Highest</option>
                    </Input>
                  </td>
                  <td>
                    <Input type='select' style={{width:'200px'}}  onChange={e=>handleDateSort(e.target.value)}>
                      <option value={'null'}>Show Default</option>
                      <option value={'true'}>Latest To Oldest</option>
                      <option value={'false'}>Oldest To Latest</option>
                    </Input>
                  </td>
                </tr>
                {sortedCurrencyList.map((item,index)=>{
                  return(
                    <tr key={index}>
                      <td>{item.currencyValue}</td>
                      <td>{moment(item.date).format('LL')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </FormGroup>
          </Col>

        </Row>
        <Row>
          <Button onClick={()=>navigate('/')} >Back To Exchange Rates</Button>
        </Row>
      </CardBody>
     </Card>
   </div>
 );
};

export default CurrencyView;
