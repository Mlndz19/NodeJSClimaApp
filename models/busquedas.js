const fs = require('fs');
const axios = require('axios');

class Busquedas {
    historial = [];
    dbPath='./db/database.json';

    constructor(){
        this.leerDB();
    }

    get historialCapitalizado(){
        return this.historial.map(lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');

        })
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


    agregarHistorial(lugar = ''){
        if(this.historial.includes(lugar.toLowerCase())){
            return;
        }

        this.historial = this.historial.splice(0, 5);

        this.historial.unshift(lugar.toLowerCase());

        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)){
            return;
        }

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);


        this.historial = data.historial;
    }
}


module.exports = Busquedas;