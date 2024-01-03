/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function TagColor(context) {

    let contenido = context.getPageProxy();
    let estado = context.evaluateTargetPath("#Property:estado");
    if(estado == 'En espera'){
        return "Red";
    }
    else if(estado == 'Descargando'){
        return "Blue";
    }
    return "Green";
}
