'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  async bootstrap({strapi}){

    const customerentries = await strapi.entityService.findMany('api::customer.customer',{
      fields: ['customerno'],
    })

    if(customerentries.length == 0){
    for(let i=1;i<101;i++){
      await strapi.entityService.create("api::customer.customer",{
         data:{
          customerno: `Customer ${i}`,
          customername: faker.internet.userName(),
          customertype: "wholesaler",
          Address: faker.location.streetAddress(),
          city:faker.location.city() ,
          state: faker.location.state(),
          zip: faker.location.zipCode(),
          country:faker.location.country() ,
          ytdsales: "8",
          totalsales: "8"
         }
      })
    }
    }

    const itementries = await strapi.entityService.findMany('api::item.item',{
      fields: ['itemno'],
    })

    if(itementries.length == 0 ){
      for(let i=1;i<101;i++){
        await strapi.entityService.create("api::item.item",{
        data:{
          itemno:`Item ${i}`,
          itemdescription: faker.commerce.productDescription(),
          notes: faker.commerce.product(),
          taxcode: "product",
          listprice:faker.number.int()
        }
       })
      }
    }

    const orderheaderentries = await strapi.entityService.findMany('api::order-header.order-header',{
      fields: ['orderdate'],
    })

    if(orderheaderentries == 0){
      for(let i=1;i<101;i++){
        await strapi.entityService.create('api::order-header.order-header',{
         data:{
                        orderdate: "2023-11-24",
                        orderduedate: "2023-11-29",
                        subtotal:faker.number.int(),
                        discount:faker.number.int({min:0,max:50}),
                        tax:faker.number.int(),
                        shipping: faker.number.int({min:100,max:1000}),
                        ordertotal:faker.number.int(),
                        advancepaid: faker.number.int(),
                        balancedue: faker.number.int(),
                        orderno: `orderno${i}`,
                        customer: faker.number.int({min:1,max:100})

            }
        })

        for(let j=1;j<501;j++){
          await strapi.entityService.create('api::order-detail.order-detail',{
            data:{
                           orderlinenumber:i,
                           orderquantity:faker.number.int({min:1,max:20}),
                           unitprice:faker.number.int(),
                           duedate:"2023-11-29",
                           extendedamount: faker.number.int(),
                           taxamount:faker.number.int(),
                           linetotalamount:faker.number.int(),
                           discountpercentage: faker.number.int(),
                           discountamount: faker.number.int(),
                           item:faker.number.int({min:1,max:100}),
                           order_header: i

               }
           })

        }

      }
    }
  },
};
