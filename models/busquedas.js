const axios = require('axios');

class Busquedas {
    historial = ['Monterrey', 'Madrid', 'Bogotá'];

    constructor(){
        //TODO: leer db si existe
    }

    get paramsMapBox(){
        return {
            'access_token': 'pk.eyJ1IjoibWxuZHoxOSIsImEiOiJja3hhb3NydzEyb2syMzJwbDBna3Z3NGhlIn0.KjSiGqTUmgHmUZtjT_Dcag',
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


            console.log(res.data);
            return[]; //retornar los lugares

        }catch(error){
            return [];
        }



    }
}


module.exports = Busquedas;