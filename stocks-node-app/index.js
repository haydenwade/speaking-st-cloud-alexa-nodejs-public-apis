const rp = require('request-promise');

const getStockPrice = ()=>{
    const options = {
        url:'https://api.iextrading.com/1.0/stock/tsla/price',
        method:'GET'
    };
    rp(options).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    });
};

const getCompanyInfo = (ticker)=>{
    const options = {
        url:`https://api.iextrading.com/1.0/stock/${ticker}/company`,
        method:'GET',
        json: true //will print 'undefined' without this
    };
    rp(options).then(res=>{
        console.log(res.CEO);
    }).catch(err=>{
        console.log(err);
    });
};

getCompanyInfo('aapl');