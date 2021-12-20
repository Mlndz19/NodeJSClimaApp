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

    get paramsOpenWheater(){
        return{
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async climaLugar(lat, lon){

        try{

            //instance axios.create()
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramsOpenWheater, lat, lon}
            })

            const res = await instance.get();

            //respuesta extraer data
            return {
                desc: res.data.weather[0].description,
                min: res.data.main.temp_min,
                max: res.data.main.temp_max,
                temp: res.data.main.temp
            }

            
        }catch(error){
            console.log(error);
        }

    }
}


module.exports = Busquedas;