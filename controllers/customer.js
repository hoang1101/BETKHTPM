const db= require('../models');
const orderDao= require("../dao/order.dao")
const checkOut = async(req,res)=>{
    data=req.body.data;
    address=req.body.address;
    action = await orderDao.createOrder(data,address);
    res.status(200).json({
        msg:"hihi"
    })

}

module.exports ={checkOut};