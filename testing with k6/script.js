import http from 'k6/http';
import { check, fail, sleep } from 'k6';
import { Rate } from 'k6/metrics';
// import deleteorders from './deleteorderheaderandorderdetail'

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
    },
    ordersdelete:{
       exec:'ordersdelete',
       executor:'constant-vus',
       vus:10,
       duration:'3s'

    }
   }
};

export const errorRate = new Rate('errors')

export function allItems() {
  try{
  const url = 'http://localhost:1337/api/items';
  const params  = {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE',
      'Content-Type': 'application/json',
    },
  }; 
  check(http.get(url,params),{
    'status is 200':(r) => r.status == 200
  }) || fail("Failed to get all items")
   sleep(1)
}catch(error){
  console.error(`An error occurred:${error.message}`);
}
 
}

export function allCustomers() {
  try {  

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
  }) || fail("Failed to fetch all customers") 
  sleep(1)
  } catch (error) {
  console.error(`An error occurred:${error.message}`);
  }
 
}

export function allOrdersheaderswithPagination(){
    try {
      
    
    const url = 'http://localhost:1337/api/order-headers?pagination[page]=1&pagination[pageSize]=25'
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
    }) || fail("Failed to get all orders with pagination")
    sleep(1)
  } catch (error) {
    console.error(`An error occurred:${error.message}`); 
  }

}


export function oneOrderswithOrderdetails(){
  try {
    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
  } 
      let order_header_id = randomNumber(1,1000)
    
  
  const url = `http://localhost:1337/api/order-headers/${order_header_id}?populate[0]=order_details`
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
  }) || fail("failed to order_header not found ")
  sleep(1)
} catch (error) {
  console.error(`An error occurred:${error.message}`); 
}
}

export function orderswithordersdetailsandcustomer(){
  try {
    
 
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
  }) || fail("failed to get orderswithordersdetailsandcustomer")
  sleep(1)
} catch (error) {
  console.error(`An error occurred:${error.message}`);
}
}


export function postorderheaderandorderdetails(){
  try{
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
    //  console.log("res:",res.body);
     let order_headers = res.body 
    //  console.log(typeof(order_headers)); 
     let obj = JSON.parse(order_headers)
     const idValue = obj.data.id;
     
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


}

export function updateorderheaderandorderdetail(){
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
          const res = http.put(url,payload,params);           
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
              const res = http.put(url,payload,params);           
              check(res,{
                'status is 200':(r) => r.status === 200
              }) || fail("Failed to update order details")
  
          }
  
      }
    }catch(error){
      console.error(`An error occurred:${error.message}`);
    }
}

export function ordersdelete(){
  try{   
    // deleteorders()
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
 
     const res = http.del(url,null,params) 
   
     check(res,{
         'status is 200':(r) => r.status === 200,
         
       }) || fail('Request failed')
 
     sleep(1)  
   }catch(error){
     console.error(`An error occurred:${error.message}`);
   }
}
