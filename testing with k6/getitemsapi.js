import http from 'k6/http';
import { check,fail,sleep } from 'k6';
import { Rate } from 'k6/metrics';
// export const options = {
//   vus: 10,
//   duration: '30s',
// };

export const errorRate = new Rate('errors')
export default function () {
    try{
    const url = 'http://localhost:1337/api/items';
    const params  = {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
        'Content-Type': 'application/json',
      },
    }; 
    check(http.get(url,params),{
      'status is 200':(r) => r.status == 200,      
    }) || fail("Request failed")

    sleep(1)
  }catch(error){
    console.error(`An error occurred:${error.message}`);
  }
   
}
