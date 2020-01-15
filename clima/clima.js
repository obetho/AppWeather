const axios = require('axios');

const getClima = async(latitud, longitud) => {

    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${ latitud }&lon=${ longitud }&APPID=e2efdfbe5a55ced84a46255c5373efb1&units=metric`);
    return resp.data.main.temp;
}

module.exports = {
    getClima
}