/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function UpdateSuccess(clientAPI) {

    let pageProxy = clientAPI.getPageProxy();
    let newItem = pageProxy.getActionResult('updateDescarga');
    let jsondata = JSON.parse(newItem.data);
    pageProxy.setActionBinding(jsondata);
   return pageProxy.executeAction('/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Detail.action');
   
}

