/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function CancelarDescarga(clientAPI) {

    var pageProxy = clientAPI.getPageProxy();

    
    let buttonIni = pageProxy.evaluateTargetPath('#Control:ButtonIni');
    let buttonFin = pageProxy.evaluateTargetPath('#Control:ButtonFin');
    let buttonCancelar = pageProxy.evaluateTargetPath('#Control:ButtonCancelar');
    let rumaRealProperty = pageProxy.evaluateTargetPath('#Control:rumaRealAsignada');

    let horaIniDescarga = pageProxy.binding.horaIniDescarga;
    let horaIni = pageProxy.evaluateTargetPath('#Control:horaIni');
    let estado = pageProxy.evaluateTargetPath('#Control:estado');
    let rumaRealAsignada = pageProxy.evaluateTargetPath('#Control:rumaReal/#Value');
    let sortBy = pageProxy.evaluateTargetPath('#Control:rumaReal');


    // if(rumaRealAsignada.filterItems.length == 0 ){
    //     Utils.displayErrorMessage(clientAPI, "Error", 'Debe seleccionar la ruma real asignada');
    //     return;
    // }

    if(horaIniDescarga != null)
    {
        buttonIni.setVisible(true);
        buttonFin.setVisible(false);
        buttonCancelar.setVisible(false);
        horaIni.setValue(null);
        estado.setValue('En espera');
        sortBy.setVisible(true);
        rumaRealProperty.setVisible(false);
        // Utils.displayErrorMessage(clientAPI, "Información", `Se inició la descarga a las ${horaIniDescarga}`);

    }

    let properties = {
        estado:"En espera",
        rumaReal : null,
        horaIniDescarga: null
    };

    await clientAPI.executeAction({
        Name: "/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity.action",
        Properties: {
            Properties: properties,
        },
    });

    return clientAPI.executeAction("/PatioCelulosaApp/Actions/Descarga/NavToDescarga_List.action");

}
