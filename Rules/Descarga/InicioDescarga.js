import Utils from '../Utils'
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function InicioDescarga(clientAPI) {

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


    if(rumaRealAsignada.filterItems.length == 0 ){
        Utils.displayErrorMessage(clientAPI, "Error", 'Debe seleccionar la ruma real asignada');
        return;
    }

    if(horaIniDescarga == null)
    {
        buttonIni.setVisible(false);
        buttonFin.setVisible(true);
        buttonCancelar.setVisible(true);
        horaIniDescarga = Utils.formatISODateToSAPTime(new Date());
        horaIni.setValue(horaIniDescarga);
        estado.setValue('Descargando');
        sortBy.setVisible(false);
        rumaRealProperty.setValue(rumaRealAsignada.filterItems[0]);
        rumaRealProperty.setVisible(true);
        // Utils.displayErrorMessage(clientAPI, "Información", `Se inició la descarga a las ${horaIniDescarga}`);

    }

    let properties = {
        estado:"Descargando",
        rumaReal : rumaRealAsignada.filterItems[0],
        horaIniDescarga: horaIniDescarga,
    };

    await clientAPI.executeAction({
        Name: "/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity.action",
        Properties: {
            Properties: properties,
        },
    });

    return clientAPI.executeAction("/PatioCelulosaApp/Actions/Descarga/AppUpdateProgressBanner1.action");



 

}
