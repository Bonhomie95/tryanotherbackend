const Payment = require("../database/entity/Payment")


module.exports.deletePayment = async(paymentId:String) => {
try{
const payment = await Payment.findByIdAndRemove(paymentId)
return
}catch(error){
return error
}
}