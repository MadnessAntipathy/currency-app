import axios from 'axios'

export async function retrieveCurrencyAbbreviation(){

  return new Promise(async(resolve,reject)=>{
    await axios({
      url:'https://openexchangerates.org/api/currencies.json',
      method:'get'
    }).then(response=>{

      if (response.data){
        resolve({success:true, data:response.data})
      }
      throw 'Unable to retrieve currency abbreviation list, please try again later'
    }).catch(err=>{
      reject({success:false, error:err})
    })
  })

}

export async function retrieveCurrency(){
  return new Promise(async(resolve,reject)=>{
    await axios({
      url:'https://freecurrencyapi.net/api/v2/latest?apikey=27173bd0-5fc6-11ec-9d9a-65ee1ccb294d&base_currency=USD',
      method:'get'
    }).then(response=>{
      if (response.data && response.data.data){
        resolve({success:true, data:response.data.data})
      }
      throw 'Unable to retrieve currency list, please try again later'
    }).catch(err=>{
      reject({success:false, error:err})
    })
  })
}

export async function retrieveCurrencyHistorical(currentDate,pastSevenDays){
  return new Promise(async(resolve,reject)=>{
    await axios({
      url: `https://freecurrencyapi.net/api/v2/historical?apikey=27173bd0-5fc6-11ec-9d9a-65ee1ccb294d&base_currency=USD&date_from=${pastSevenDays}&date_to=${currentDate}`,
      method:'get'
    }).then(response=>{
      if (response.data && response.data.data){
        resolve({success:true, data:response.data.data})
      }
      throw 'Unable to retrieve currency list'
    }).catch(err=>{
      reject({success:false, error:err})
    })
  })
}

// https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=f8911f13ead406bf2ab5
