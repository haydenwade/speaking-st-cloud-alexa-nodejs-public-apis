const rp = require('request-promise');

const api = {
    getStockPrice(ticker) {
        const options = {
            method:'GET',
            uri:`https://api.iextrading.com/1.0/stock/${ticker}/price`,
            json:true
        };
        return rp(options);
    },
    getCompanyInfo(ticker){
        const options = {
            method:'GET',
            uri:`https://api.iextrading.com/1.0/stock/${ticker}/company`,
            json:true
        };
        return rp(options);
    }
};
module.exports = api;