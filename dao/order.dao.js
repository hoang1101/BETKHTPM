const db = require('../models');
async function createOrder(data,address){
    try{
        console.log("dao i "+data[0].idCus)
        const order = await db.Order.create({
            customer_id:data[0].idCus,
            address:address,
            status:null
        })
        try{
            
            for(let i of data){
                
                const orderItem = await db.Order_Item.create({
                    order_id:order.id,
                    product_id:i.idPro,
                    quantity:i.qty,
                    price:i.price
                })
            }
        }catch(error){
            console.log("err ODIT: "+error.message)
        }
        
    }catch(err){
        console.log("err OD: "+err)
    }
    

    
}

module.exports = {createOrder}