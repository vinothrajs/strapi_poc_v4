import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
export const options = {
   scenarios:{
    all_items:{
      exec: 'allItems',
      executor:'constant-vus',
      vus:2,
      duration:'10s'
    },
    all_orderheaders_with_pagination:{
      exec:'allOrdersheaderswithPagination',
      executor:'constant-vus',
      vus:1,
      duration:'3s'
    },
     one_orderheader_with_orderdetails:{
      exec:'oneOrderswithOrderdetails',
      executor:'constant-vus',
      vus:2,
      duration:'3s'
    },
    orderheader_with_customer_and_orderdetails:{
      exec:'orderswithordersdetailsandcustomer',
      executor:'constant-vus',
      vus:1,
      duration:'3s'
    },
    posting_orderheader_and_orderdetails:{
      exec:'postorderheaderandorderdetails',
      executor:'constant-vus',
      vus:1,
      duration:'3s'
    },
    update_orderheader_and_orderdetail:{
      exec:'updateorderheaderandorderdetail',
      executor:'constant-vus',
      vus:1,
      duration:'3s'
    }
   }
};

export const errorRate = new Rate('errors')

export function allItems() {
  const url = 'http://localhost:1337/api/items';
  const params  = {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
      'Content-Type': 'application/json',
    },
  }; 
  check(http.get(url,params),{
    'status is 200':(r) => r.status == 200
  }) || errorRate.add(1)
 
}

export function allCustomers() {
  const url = 'http://localhost:1337/api/customers';
  const params  = {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
      'Content-Type': 'application/json',
    },
  };
  const res = http.get(url,params);
  // console.log("res:",res.body.meta);  
  check(res,{
    'status is 200':(r) => r.status === 200
  }) || errorRate.add(1) 
 
}

export function allOrdersheaderswithPagination(){
    const url = 'http://localhost:1337/api/order-headers?pagination[page]=1&pagination[pageSize]=2'
    const params  = {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
        'Content-Type': 'application/json',
      },
    };
    const res = http.get(url,params);
    // console.log("res:",res.body);   
    check(res,{
      'status is 200':(r) => r.status === 200
    }) || errorRate.add(1)

}


export function oneOrderswithOrderdetails(){
  const url = 'http://localhost:1337/api/order-headers/1?populate[0]=order_details'
  const params  = {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
      'Content-Type': 'application/json',
    },
  };

  const res = http.get(url,params);
  // console.log("res:",res.body);   
  check(res,{
    'status is 200':(r) => r.status === 200
  }) || errorRate.add(1)
}

export function orderswithordersdetailsandcustomer(){
  const url = 'http://localhost:1337/api/order-headers?populate[0]=order_details&populate[1]=customer'
  const params  = {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
      'Content-Type': 'application/json',
    },
  };

  const res = http.get(url,params);
  // console.log("res:",res.body);   
  check(res,{
    'status is 200':(r) => r.status === 200
  }) || errorRate.add(1)
}


export function postorderheaderandorderdetails(){
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
                customer: 3
            }
        }


    )

    const res = http.post(url,payload,params);
    // console.log("res:",res.status);   
    check(res,{
      'status is 200':(r) => r.status === 200,
      
    }) || errorRate.add(1)



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
            order_header: 1001
        }
       })

       const res = http.post(url,payload,params);
    //    console.log("res:",res.status);   
     const checkoutput =  check(res,{
         'status is 200':(r) => r.status === 200,
         
       }) || errorRate.add(1)

       if(!checkoutput){
        fail('unexpected response')
       }

       sleep(1)
    }


}

export function updateorderheaderandorderdetail(){
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
