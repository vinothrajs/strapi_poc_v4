import http from 'k6/http';
import { check,sleep,fail } from 'k6';
import { Rate } from 'k6/metrics';
export const options = {
  vus: 1,
  duration: '10s',
};

export const errorRate = new Rate('errors')
export default function deleteorders () { 
  try{

   
   function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
    }      
    let order_headers_id  = randomNumber(5,4500) 
    const url = `http://localhost:1337/api/deleteorders/${order_headers_id}`
    const params  = {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
        'Content-Type': 'application/json',
      },
    }; 
    // console.log(params);

    const res = http.del(url,null,params)
    // console.log(res.status);
  
    check(res,{
        'status is 200':(r) => r.status === 200,
        
      }) || fail('Request failed')

    sleep(1)  
  }catch(error){
    console.error(`An error occurred:${error.message}`);
  }
    }