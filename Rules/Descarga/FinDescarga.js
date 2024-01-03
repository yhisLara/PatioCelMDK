import Utils from '../Utils';

export default async function FinDescarga(clientAPI) {

    var pageProxy = clientAPI.getPageProxy();

    let horaIniDescarga = pageProxy.evaluateTargetPath('#Control:horaIni/#Value');
    let rumaRealAsignada = pageProxy.evaluateTargetPath('#Control:rumaReal/#Value');
    let buttonCancelar = pageProxy.evaluateTargetPath('#Control:ButtonCancelar');


    let estadoActual = pageProxy.evaluateTargetPath('#Control:estado');
    let horaFinDescarga = Utils.formatISODateToSAPTime(new Date());

    let horaFin = pageProxy.evaluateTargetPath('#Control:horaFin');
    let horaIni = pageProxy.evaluateTargetPath('#Control:horaIni');


    horaFin.setValue(horaFinDescarga);
    horaIni.setValue(horaIniDescarga);
    buttonCancelar.setVisible(false);


    estadoActual.setValue("Completado");

    let properties = {
        estado:"Completado",
        rumaReal : rumaRealAsignada.filterItems[0],
        horaIniDescarga: horaIniDescarga,
        horaFinDescarga: horaFinDescarga,
    };

    await clientAPI.executeAction({
        Name: "/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity.action",
        Properties: {
            Properties: properties,
        },
    });

    return clientAPI.executeAction("/PatioCelulosaApp/Actions/Descarga/NavToDescarga_List.action");

}
