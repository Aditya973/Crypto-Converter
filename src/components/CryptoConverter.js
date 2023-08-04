import React, { useEffect, useState } from 'react';
import './CryptoConverter.css'; 
import { Select, Form, Card, Input } from 'antd';
import {BiLogoBitcoin} from 'react-icons/bi';

function CryptoConverter() {
    let [convertedAmount,setConvertedAmount] = useState('15.712000');
    let [coin1,setCoin1] = useState('Bitcoin');
    let [coin2,setCoin2] = useState('Ether');
    let [amount,setAmount] = useState('1');
    let [cryptoList,setCryptoList] = useState([]);

    async function fetchData(){
        const response = await fetch(`https://api.coingecko.com/api/v3/exchange_rates`)
        const jsonData = await response.json();
        const coinList = Object.entries(jsonData.rates);
        const tempArray = [];   
        coinList.forEach((item)=>{
            tempArray.push({
                value: item[1].name,
                label: item[1].name,
                rate: item[1].value
            });
        });
        console.log(tempArray);
        setCryptoList(tempArray);
    }
    useEffect(()=>{
        fetchData();
    },[]);
    useEffect(()=>{
        if(cryptoList.length == 0){
            return;
        }
        const firstSelectRate = cryptoList.find((item)=>{
            return item.value === coin1;
        }).rate;
        const secondSelectRate = cryptoList.find((item)=>{
            return item.value === coin2;
        }).rate;
        const convertedAmount = (amount*secondSelectRate)/firstSelectRate;
        setConvertedAmount(convertedAmount.toFixed(6));
    },[coin1,coin2,amount]);
    
    return (
        <div className='container'>
            <Card className='crypto-card' title = {<h1 style={{textAlign:'center', color:'white', letterSpacing:'1px'}}><BiLogoBitcoin/>Crypto Converter</h1>}>
                <Form size='large'>
                    <Form.Item>
                        <Input style={{textAlign:'center'}} onChange={(event)=>{setAmount(event.target.value)}} defaultValue={'1'} placeholder="Enter Amount"/>
                    </Form.Item>
                    <div className="selectBox">
                        <div>
                            <span className='fromTo'>From</span>
                            <Select style={{width: '160px'}} options={cryptoList} defaultValue= {coin1}
                                onChange = {(value)=>{
                                    setCoin1(value);
                                }}
                            />
                        </div>
                        <div>
                            <span className='fromTo'>To</span>
                            <Select style={{width: '160px'}} options={cryptoList} defaultValue={coin2} 
                                onChange = {(value)=>{
                                    setCoin2(value);
                                }}
                            />
                        </div>
                    </div>
                </Form>
                {/* <input type="number" onChange={handleAmount} defaultValue='1' id='amountBox'/> */}
                <p id='result'>{amount} {coin1} = {convertedAmount} {coin2}</p> 
            </Card>
        </div>
    )
}

export default CryptoConverter;