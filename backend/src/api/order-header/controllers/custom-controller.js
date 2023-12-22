module.exports = {
  deleteorders : async (ctx)=>{
    const {id} = ctx.params;
      //  console.log(id);
    try{
      const entries = await strapi.entityService.findOne(
        "api::order-header.order-header",id,{
          populate:'*',
        });
        if(entries){
          if(entries.order_details.length == 0){
            const orderheader = await strapi.entityService.delete('api::order-header.order-header',entries.id);
            return {"status":200,"message":"Exsisted order header is deleted"}
          }
          let order_header_id
          for (const index in entries.order_details) {
            if (Object.prototype.hasOwnProperty.call(entries.order_details, index)) {
              const id = entries.order_details[index].id;
              const orderdetails = await strapi.entityService.delete('api::order-detail.order-detail',id);
              if(orderdetails){
                order_header_id = entries.id
              }
            }
          }

          if(order_header_id){
            const orderheader = await strapi.entityService.delete('api::order-header.order-header',order_header_id);
            return {"status":200,"message":"Order header and detail deleted"}
          }
        }else{
           return {"status":404,"message":"Order not found"}
        }

    }catch(err){
      return {"status":404,"message":"Internal server error"}
    }
  }
}
