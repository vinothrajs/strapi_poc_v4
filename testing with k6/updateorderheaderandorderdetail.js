import http from 'k6/http';
import { check,fail,sleep } from 'k6';
import { Rate } from 'k6/metrics';
// export const options = {
//   vus: 1,
//   duration: '2s',
// };

export const errorRate = new Rate('errors')
export default function () {
  try{
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
} 
    let order_header_id = randomNumber(1,1000)
    const url = `http://localhost:1337/api/order-headers/${order_header_id}`;
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
    }) || fail("Failed to get order header")

    sleep(1)

    if(res.status == 200){     
        

        const url = `http://localhost:1337/api/order-headers/${order_header_id}`;
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
        }) || fail('update order header failed')

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
                        order_header:order_header_id
                    }
                }
        
        
            )  
            // console.log(params);
            const res = http.put(url,payload,params);
            console.log("Completed order detail");
            // console.log(res);   
            check(res,{
              'status is 200':(r) => r.status === 200
            }) || fail("Failed to update order details")

        }

    }
  }catch(error){
    console.error(`An error occurred:${error.message}`);
  }
   
}
