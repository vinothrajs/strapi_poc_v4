import http from 'k6/http';
import { check,fail,sleep } from 'k6';
// import { Rate } from 'k6/metrics';
export const options = {
  vus: 10,
  duration: '5s',
};

// export const errorRate = new Rate('errors')
export default function () {
    try {
    const url = 'http://localhost:8000/updateorderheaderandorderdetail';   
    check(http.put(url),{
      'status is 200':(r) => r.status == 200,
      
    }) || fail('Request Failed')

    sleep(1)

    }catch(err){
        console.error(`An error occurred:${err.message}`);
    } 
   
}
