import http from 'k6/http';
import { check,sleep,fail } from 'k6';
import { Rate } from 'k6/metrics';
// export const options = {
//   vus: 1,
//   duration: '30s',
// };

export const errorRate = new Rate('errors')
export default function () {
   try{
    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    } 
    const url = 'http://localhost:1337/api/order-headers';
    const params  = {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
        'Content-Type': 'application/json',
      },
    }; 
    const payload = JSON.stringify(
        {
            data:{
                orderdate: "2023-11-24",
                orderduedate: "2023-11-29",
                subtotal:22,
                discount:23,
                tax:33,
                shipping: 25,
                ordertotal:32,
                advancepaid:456,
                balancedue: 234,
                orderno: 'customer1001',
                customer: randomNumber(1,100)
            }
        }


    )

    const res = http.post(url,payload,params);
    //  console.log("res:",res.body);
     let order_headers = res.body 
    //  console.log(typeof(order_headers)); 
     let obj = JSON.parse(order_headers)
     const idValue = obj.data.id;
     console.log(idValue); 
    check(res,{
      'status is 200':(r) => r.status === 200,
      
    }) || fail("Failed to create order header")



    if(res.status == 200){
        const url = 'http://localhost:1337/api/order-details';
        const params  = {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
            'Content-Type': 'application/json',
          },
        }; 
       const payload = JSON.stringify(
        {
        data:{
            orderlinenumber:21,
            orderquantity:30,
            unitprice:23,
            duedate:"2023-11-29",
            extendedamount: 45,
            taxamount:63,
            linetotalamount:45,
            discountpercentage: 23,
            discountamount:32,
            item:55,
            order_header: idValue
        }
       })

       const res = http.post(url,payload,params);
    //  console.log("res:",res);   
     const checkoutput =  check(res,{
         'status is 200':(r) => r.status === 200,
         
       }) || errorRate.add(1)

       if(!checkoutput){
        fail('Failed to create order details')
       }

       sleep(1)
    }

  }catch(error){
    console.error(`An error occurred:${error.message}`);
  }


    
    // check(http.post(url,payload,params),{
    //   'status is 200':(r) => r.status == 200
    // }) || errorRate.add(1)

    // sleep(1)
}