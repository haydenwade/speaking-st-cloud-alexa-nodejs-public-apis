const rp = require('request-promise');

const api = {
    getStockPrice(ticker) {
        const options = {
            method:'GET',
            uri:`https://api.iextrading.com/1.0/stock/${ticker}/price`
        };
        return rp(options);
    }
};
module.exports = api;
// api.getStockPrice('aapl').then((res)=>{
//     console.log(res);
// })
