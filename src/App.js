import { useEffect, useState } from 'react';
import  bImg from './Assets/images.png'
import axios from "axios"
import './App.css';

function App() {



  const[amount,setAmount] = useState('1')
  const[fromCurrency,setFromCurrency] = useState("USD")
  const[toCurrency,setToCurrency] = useState("INR")
  const[convertedAmount,setConvertedAmount] = useState(null)
  const[exchangeRate,setExchangeRate] = useState(null)

  useEffect(()=>{
    const getExhangeRate = async ()=>{
      try{
         let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}` 
          const response = await axios.get(url);
         
          setExchangeRate(response.data.rates[toCurrency])
      }catch(error){
        console.log("Error fethcing exhange rate ",error)
      }
    }
    getExhangeRate()
  },[fromCurrency,toCurrency])

  useEffect(()=>{
    if(exchangeRate !== null){
      setConvertedAmount(amount * (exchangeRate).toFixed(2))
    }

  },[amount,exchangeRate])

 const handleamountchange=(event)=>{
      const value = parseFloat(event.target.value)
      setAmount(isNaN(value) ? 0 :value)
 }

 const handlefromCurrency=(e)=>{
     setFromCurrency(e.target.value)
 }
const handleToCurrency=(e)=>{
    setToCurrency(e.target.value)
}



  return (
    <div className="currency-converter">
       <div className="box">
           <img src={bImg} alt="Logoimage" className="img"/>
       </div>
       <div className="data">
        <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount:</label>
            <input type="number" id="amt" value={amount} onChange={handleamountchange}/>

          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency</label>
            <select  id="fromCurrency" value={fromCurrency} onChange={handlefromCurrency}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Bralizian Real</option>
              <option value="ZAE">ZAE - South African Rand</option>


            </select>
            </div>
            <div className="input-container">
            <label htmlFor="toCurrency">To Currency</label>
            <select  id="toCurrency" value={toCurrency} onChange={handleToCurrency} >
            <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Bralizian Real</option>
              <option value="ZAE">ZAE - South African Rand</option>


            </select>
            
            </div>
            <div className="result">
              <p> {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
            </div>
            
     </div>
    </div>
  );
}

export default App;

