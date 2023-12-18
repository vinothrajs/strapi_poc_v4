import http from 'k6/http';
import { check,sleep } from 'k6';
import { Rate } from 'k6/metrics';
// export const options = {
//   vus: 1,
//   duration: '2s',
// };

export const errorRate = new Rate('errors')
export default function () {
    const url = 'http://localhost:1337/api/order-headers/1714';
    const params  = {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
        'Content-Type': 'application/json',
      },
    }; 
    const res = http.get(url,params);
    // console.log(res);   
    check(res,{
      'status is 200':(r) => r.status === 200
    }) || errorRate.add(1)

    sleep(1)

    if(res.status == 200){
        // console.log("Chej")
        

// Function to generate random number
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }      
        const id  = randomNumber(1,500) 
        const url = `http://localhost:1337/api/order-headers/${id}`;
        const params  = {
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
              'Content-Type': 'application/json',
            },
          };
          const payload = JSON.stringify(
            {
                data:{
                    orderdate:"2023-11-24",
                    orderduedate:"2023-11-29",
                    subtotal:22,
                    discount:23,
                    tax:33,
                    shipping:25,
                    ordertotal:32,
                    advancepaid:456,
                    balancedue:234,
                    orderno:"changeoverssd",
                    customer:randomNumber(1,100)
                }
            }
    
    
        )  
        // console.log(params);
        const res = http.put(url,payload,params);
        // console.log(res);   
        check(res,{
          'status is 200':(r) => r.status === 200
        }) || errorRate.add(1)

        if(res.status == 200){
            let order_id = randomNumber(200,2000)
            const url = `http://localhost:1337/api/order-details/${order_id}`;
            const params  = {
                headers: {
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
                  'Content-Type': 'application/json',
                },
              };
              const payload = JSON.stringify(
                {
                    data:{
                        orderlinenumber:randomNumber(1000,2000),
                        orderquantity:630,
                        unitprice:223,
                        duedate:"2023-11-29",
                        extendedamount:450,
                        taxamount:623,
                        linetotalamount:425,
                        discountpercentage:243,
                        discountamount:342, 
                        item:55,
                        order_header:id
                    }
                }
        
        
            )  
            // console.log(params);
            const res = http.put(url,payload,params);
            console.log("Completed order detail");
            // console.log(res);   
            check(res,{
              'status is 200':(r) => r.status === 200
            }) || errorRate.add(1)

        }

    }
   
}
