const subscriptionPlan = [ {
    plan : "BASIC", 
    pricePerUserPerMonth: 0, 
    currency: "USD", 
    MAX_USERS: 2, 
    MAX_STORAGE_IN_GIGABYTE: 1, 
    PROJECT_INTEGRATION: 1
}, 
{
    plan : "ADVANCED", 
    pricePerUserPerMonth: 9.99, 
    currency: "USD", 
    MAX_USERS: 5, 
    MAX_STORAGE_IN_GIGABYTE: 10, 
    PROJECT_INTEGRATION: 2
}, 
{
    plan : "PREMIUM", 
    pricePerUserPerMonth: 19.99, 
    currency: "USD", 
    MAX_USERS: 10, 
    MAX_STORAGE_IN_GIGABYTE: 40, 
    PROJECT_INTEGRATION: 4
}, 
{
    plan : "EDITOR", 
    pricePerUserPerMonth: 5.99, 
    currency: "USD", 
    MAX_USERS: 1, 
    MAX_STORAGE_IN_GIGABYTE: 10, 
    PROJECT_INTEGRATION: 2
}, 


]

module.exports = subscriptionPlan