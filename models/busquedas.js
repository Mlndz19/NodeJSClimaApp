const axios = require('axios');

class Busquedas {
    historial = ['Monterrey', 'Madrid', 'Bogotá'];

    constructor(){
        //TODO: leer db si existe
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad( lugar = '' ){
        
        try{

            //peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
                params: this.paramsMapBox
            });

            const res = await instance.get();


            return res.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
                
            }));

        }catch(error){
            return [];
        }
    }
}


module.exports = Busquedas;