import axios from "axios";



module.exports.convertCurrencyToNaira = async(amount:Number) => {
 try {
    const response = axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=NGN&from=usd&amount=${amount}`, {
      headers:{
         redirect:"follow", 
         apiKey:"JNDnNZ87m5wq7hlJRyhpfKxj9jh0ixpv"
      }
    } )
    return response
 }catch(error){
    console.log(error)
 }
    

}
