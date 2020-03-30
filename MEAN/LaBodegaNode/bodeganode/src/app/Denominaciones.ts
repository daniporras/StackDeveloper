// Este es el modelo de denominaciones

export default class Denominaciones{
    nombre_denominacion : String;
    ubicacion_denominacion: String;
    web_denominacion: String;
    bodegas: [
        {
            nombre_bodega:String;
            ubicacion_bodega: String;
            telefono_bodega: Number;
            web_bodega: String;
            email_bodega: String;
            uva:[
                {
                    blanca:Boolean;
                    tinta:Boolean;
                    rosado:Boolean;
                }
            ]
        }
    ]
}