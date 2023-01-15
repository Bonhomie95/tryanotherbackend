
module.exports.calculateExpiryDate = () => {
    const date = new Date()
    date.setDate(new Date().getDate() + 31)
    return date
}


