from fastapi import FastAPI
import requests
import json
import random

app = FastAPI()
headers={'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAyNTM1MjE0LCJleHAiOjE3MDUxMjcyMTR9.roxtQGYrEuDYH1W4sI2H3MqhKm9NrCb2W8KsGZiwjsE','Content-Type': 'application/json'}

@app.get("/")
async def read_hello():
    return "hello"

@app.get("/items")
async def items():
    url = 'http://localhost:1337/api/items'   
    response = requests.get(url,headers=headers)    
    return response.json()

@app.get("/orderheaderwithdetails")
async def orderheaderwithorderdetails():
    url = 'http://localhost:1337/api/order-headers/1?populate[0]=order_details'   
    response = requests.get(url,headers=headers)
    return response.json()
        
@app.get("/orderhearderwithpagination") 
async def orderheaderwithpagination():
    url = "http://localhost:1337/api/order-headers?pagination[page]=1&pagination[pageSize]=2"       
   
    response = requests.get(url,headers=headers)
    return response.json()

@app.get("/orderwithorderdetailsandcustomer")
async def orderwithorderdetailsandcustomer():
    url = "http://localhost:1337/api/order-headers?populate[0]=order_details&populate[1]=customer"
    response = requests.get(url,headers= headers)
    return response.json()


@app.post("/postorderheaderandorderdetails")
async def postorderheaderandorderdetails():
    url = "http://localhost:1337/api/order-headers"
    payload = json.dumps(
        {
            'data':{
                'orderdate': "2023-11-24",
                'orderduedate': "2023-11-29",
                'subtotal':22,
                'discount':23,
                'tax':33,
                'shipping': 25,
                'ordertotal':32,
                'advancepaid':456,
                'balancedue': 234,
                'orderno': 'customer1435t01',
                'customer': 4
            }
        }
    )   
    response = requests.post(url,data=payload,headers=headers)
    # print(response.status_code)
    if response.status_code == 200:
        # print(response.json())
        print("headers :",headers)
        res = response.json()
        order_header_id = res['data']['id']
        url = 'http://localhost:1337/api/order-details'
        payload = json.dumps(
            {
               'data':{
                    'orderlinenumber':21,
                    'orderquantity':30,
                    'unitprice':23,
                    'duedate':"2023-11-29",
                    'extendedamount': 45,
                    'taxamount':63,
                    'linetotalamount':45,
                    'discountpercentage': 23,
                    'discountamount':32,
                    'item':55,
                    'order_header': order_header_id
                }
            }
        )
        
        response = requests.post(url,data=payload,headers=headers)            
        return response.json()
 
    
@app.put("/updateorderheaderandorderdetail")
async def updateorderheaderandorderdetail():
     start_range = 100
     end_range = 1000     
     order_header_id = random.randint(start_range,end_range)
    #  print(order_header_id)
     url = f"http://localhost:1337/api/order-headers/{order_header_id}"
     response = requests.get(url,headers=headers)
    #  return response.json()
     if response.status_code  == 200:
        print(order_header_id) 
        customer_id = random.randint(1,100)    
        url = f"http://localhost:1337/api/order-headers/{order_header_id}"
        payload = json.dumps(
            {
                'data':{
                    'orderdate':"2023-11-24",
                    'orderduedate':"2023-11-29",
                    'subtotal':22,
                    'discount':23,
                    'tax':33,
                    'shipping':25,
                    'ordertotal':32,
                    'advancepaid':456,
                    'balancedue':234,
                    'orderno':"updatgehfssd",
                    'customer':customer_id
                }
            }) 
        response = requests.put(url,data=payload,headers=headers) 
        print(response)
        if response.status_code == 200:
            orderlinenumber = random.randint(1000,10000) 
            order_id = random.randint(1,700)            
            url = f"http://localhost:1337/api/order-details/{order_id}"           
            payload = json.dumps({
                    'data':{
                        'orderlinenumber':orderlinenumber,
                        'orderquantity':630,
                        'unitprice':223,
                        'duedate':"2023-11-29",
                        'extendedamount':450,
                        'taxamount':623,
                        'linetotalamount':425,
                        'discountpercentage':243,
                        'discountamount':342, 
                        'item':55,
                        'order_header':order_header_id
                    }
                })           
            response = requests.put(url,data=payload,headers=headers) 
            # print(response)
            return response.json()    
        
@app.delete("/orderheaderandorderdetails")
async def deleteorders():
     start_range = 100
     end_range = 1000     
     order_header_id = random.randint(start_range,end_range) 
     url = f"http://localhost:1337/api/deleteorders/1781"
     response = requests.delete(url,headers=headers)
    #  print(response.json())
     return response.json()
     
  
 
    


