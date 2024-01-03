/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function onLoadedPage(context) {

    var pageProxy = context.getPageProxy();
    var estadoActual = pageProxy.binding.estado;

    var seccion = pageProxy.getControl('SectionedTable').getSection('SectionKeyValue1');
    let patente = seccion.evaluateTargetPath("#Property:patenteCamion");
    console.log(patente);

    let buttonIni = pageProxy.evaluateTargetPath('#Control:ButtonIni');
    let buttonFin = pageProxy.evaluateTargetPath('#Control:ButtonFin');
    let buttonCancelar = pageProxy.evaluateTargetPath('#Control:ButtonCancelar');
    let sortBy = pageProxy.evaluateTargetPath('#Control:rumaReal');
    let rumaRealAsignada = pageProxy.evaluateTargetPath('#Control:rumaReal/#Value');



    if(estadoActual == 'Descargando')
    {
        buttonIni.setVisible(false);
        buttonFin.setVisible(true);
        buttonCancelar.setVisible(true);
        sortBy.setVisible(false);
        rumaRealProperty.setValue(rumaRealAsignada.filterItems[0]);
        rumaRealProperty.setVisible(true);
    }
    else if (estadoActual == 'Completado')
    {
        buttonIni.setVisible(true);
        buttonFin.setVisible(false);
        buttonIni.setEnabled(false);
        buttonCancelar.setVisible(false);

    }
    else
    {
        buttonIni.setVisible(true);
        buttonFin.setVisible(false);
        buttonCancelar.setVisible(false);
    }

}
