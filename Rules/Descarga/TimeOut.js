/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function TimeOut(clientAPI) {
    return await (new Promise(function(resolve, reject) {

        
        let estado = "Completado"; // La variable X
        var intervalId, timeoutId;
         
        intervalId = setInterval(() => {
        let estadoActual = clientAPI.getPageProxy().evaluateTargetPath('#Control:estado/#Value');
        if (estadoActual == "Completado" || estadoActual == "En espera") {
            clearInterval(intervalId); // Detiene el setInterval
            clearTimeout(timeoutId); // Previene la ejecución del timeout
            resolve();
        }
        }, 5000); // Revisa cada segundo
    
        // Iniciar setTimeout como tiempo máximo de espera
        timeoutId = setTimeout(() => {
            console.log("Tiempo máximo alcanzado, X no es 2.");
            clearInterval(intervalId); // Detiene el setInterval
        }, 100000); // Establece un límite de tiempo, por ejemplo, 10 segundos
    
        // Aquí iría el código para mostrar el GIF de carga

        }));
}
    