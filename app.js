const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

// lugar.getLugarLatLng(argv.direccion)
//     .then(console.log)
//     .catch(console.log(`Ciudad invalida ${ argv.direccion }`));


// clima.getClima(35, 139)
//     .then(console.log)
//     .catch(console.log);

const getInfo = async(direccion) => {
    let latitud;
    let longitud;

    await lugar.getLugarLatLng(direccion)
        .then(archivo => {
            latitud = archivo.lat;
            longitud = archivo.lng;
            // console.log(latitud + ' / ' + longitud);
        })
        .catch(console.log);

    await clima.getClima(latitud, longitud)
        .then(temp => {
            console.log(`El clima de ${ direccion } es de ${ temp }`);
        })
        .catch(err => {
            console.log(`No se puede determinar el clima de ${ direccion }`);
        });

};

const getInfo2 = async(direccion) => {
    let latitud;
    let longitud;

    try {
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);
        console.log(`El clima de ${ direccion } es de ${ temp }`);
    } catch (e) {
        console.log(`No se puede determinar el clima de ${ direccion }`);
    }
};

getInfo2(argv.direccion);