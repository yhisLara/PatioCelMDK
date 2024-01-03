/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/PatioCelulosaApp/i18n/i18n.properties":
/*!*****************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/i18n/i18n.properties ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Application/AppUpdateFailure.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Application/AppUpdateFailure.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/PatioCelulosaApp/Actions/Application/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Application/AppUpdateSuccess.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Application/AppUpdateSuccess.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/PatioCelulosaApp/Actions/Application/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/PatioCelulosaApp/Actions/Application/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Application/ClientIsMultiUserMode.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Application/ClientIsMultiUserMode.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
  return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Application/GetClientSupportVersions.js":
/*!******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Application/GetClientSupportVersions.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
  let versionInfo = clientAPI.getVersionInfo();
  let versionStr = '';
  Object.keys(versionInfo).forEach(function (key, index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object
    //console.log(`Key: ${key}   Index: ${index}`);
    if (key != 'Application Version') {
      versionStr += `${key}: ${versionInfo[key]}\n`;
    }
  });
  return versionStr;
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Application/GetClientVersion.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Application/GetClientVersion.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
  let versionInfo = clientAPI.getVersionInfo();
  if (versionInfo.hasOwnProperty('Application Version')) {
    return versionInfo['Application Version'];
  }
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Application/OnWillUpdate.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Application/OnWillUpdate.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/PatioCelulosaApp/Actions/Application/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/PatioCelulosaApp/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Application/ResetAppSettingsAndLogout.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
  let logger = clientAPI.getLogger();
  let platform = clientAPI.nativescript.platformModule;
  let appSettings = clientAPI.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return clientAPI.getPageProxy().executeAction('/PatioCelulosaApp/Actions/Application/Reset.action');
  }
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Descarga/CancelarDescarga.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Descarga/CancelarDescarga.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CancelarDescarga)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
async function CancelarDescarga(clientAPI) {
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

  if (horaIniDescarga != null) {
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
    estado: "En espera",
    rumaReal: null,
    horaIniDescarga: null
  };
  await clientAPI.executeAction({
    Name: "/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity.action",
    Properties: {
      Properties: properties
    }
  });
  return clientAPI.executeAction("/PatioCelulosaApp/Actions/Descarga/NavToDescarga_List.action");
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Descarga/Descarga_DeleteConfirmation.js":
/*!******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Descarga/Descarga_DeleteConfirmation.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/PatioCelulosaApp/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/PatioCelulosaApp/Actions/Descarga/Descarga_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Descarga/FinDescarga.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Descarga/FinDescarga.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FinDescarga)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./build.definitions/PatioCelulosaApp/Rules/Utils.js");

async function FinDescarga(clientAPI) {
  var pageProxy = clientAPI.getPageProxy();
  let horaIniDescarga = pageProxy.evaluateTargetPath('#Control:horaIni/#Value');
  let rumaRealAsignada = pageProxy.evaluateTargetPath('#Control:rumaReal/#Value');
  let buttonCancelar = pageProxy.evaluateTargetPath('#Control:ButtonCancelar');
  let estadoActual = pageProxy.evaluateTargetPath('#Control:estado');
  let horaFinDescarga = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].formatISODateToSAPTime(new Date());
  let horaFin = pageProxy.evaluateTargetPath('#Control:horaFin');
  let horaIni = pageProxy.evaluateTargetPath('#Control:horaIni');
  horaFin.setValue(horaFinDescarga);
  horaIni.setValue(horaIniDescarga);
  buttonCancelar.setVisible(false);
  estadoActual.setValue("Completado");
  let properties = {
    estado: "Completado",
    rumaReal: rumaRealAsignada.filterItems[0],
    horaIniDescarga: horaIniDescarga,
    horaFinDescarga: horaFinDescarga
  };
  await clientAPI.executeAction({
    Name: "/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity.action",
    Properties: {
      Properties: properties
    }
  });
  return clientAPI.executeAction("/PatioCelulosaApp/Actions/Descarga/NavToDescarga_List.action");
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Descarga/InicioDescarga.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Descarga/InicioDescarga.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InicioDescarga)
/* harmony export */ });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ "./build.definitions/PatioCelulosaApp/Rules/Utils.js");

/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
async function InicioDescarga(clientAPI) {
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
  if (rumaRealAsignada.filterItems.length == 0) {
    _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].displayErrorMessage(clientAPI, "Error", 'Debe seleccionar la ruma real asignada');
    return;
  }
  if (horaIniDescarga == null) {
    buttonIni.setVisible(false);
    buttonFin.setVisible(true);
    buttonCancelar.setVisible(true);
    horaIniDescarga = _Utils__WEBPACK_IMPORTED_MODULE_0__["default"].formatISODateToSAPTime(new Date());
    horaIni.setValue(horaIniDescarga);
    estado.setValue('Descargando');
    sortBy.setVisible(false);
    rumaRealProperty.setValue(rumaRealAsignada.filterItems[0]);
    rumaRealProperty.setVisible(true);
    // Utils.displayErrorMessage(clientAPI, "Información", `Se inició la descarga a las ${horaIniDescarga}`);
  }

  let properties = {
    estado: "Descargando",
    rumaReal: rumaRealAsignada.filterItems[0],
    horaIniDescarga: horaIniDescarga
  };
  await clientAPI.executeAction({
    Name: "/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity.action",
    Properties: {
      Properties: properties
    }
  });
  return clientAPI.executeAction("/PatioCelulosaApp/Actions/Descarga/AppUpdateProgressBanner1.action");
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Descarga/TagColor.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Descarga/TagColor.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TagColor)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function TagColor(context) {
  let contenido = context.getPageProxy();
  let estado = context.evaluateTargetPath("#Property:estado");
  if (estado == 'En espera') {
    return "Red";
  } else if (estado == 'Descargando') {
    return "Blue";
  }
  return "Green";
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Descarga/TimeOut.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Descarga/TimeOut.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TimeOut)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
async function TimeOut(clientAPI) {
  return await new Promise(function (resolve, reject) {
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
  });
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Descarga/UpdateSuccess.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Descarga/UpdateSuccess.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function UpdateSuccess(clientAPI) {
  let pageProxy = clientAPI.getPageProxy();
  let newItem = pageProxy.getActionResult('updateDescarga');
  let jsondata = JSON.parse(newItem.data);
  pageProxy.setActionBinding(jsondata);
  return pageProxy.executeAction('/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Detail.action');
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Descarga/onLoadedPage.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Descarga/onLoadedPage.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onLoadedPage)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function onLoadedPage(context) {
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
  if (estadoActual == 'Descargando') {
    buttonIni.setVisible(false);
    buttonFin.setVisible(true);
    buttonCancelar.setVisible(true);
    sortBy.setVisible(false);
    rumaRealProperty.setValue(rumaRealAsignada.filterItems[0]);
    rumaRealProperty.setVisible(true);
  } else if (estadoActual == 'Completado') {
    buttonIni.setVisible(true);
    buttonFin.setVisible(false);
    buttonIni.setEnabled(false);
    buttonCancelar.setVisible(false);
  } else {
    buttonIni.setVisible(true);
    buttonFin.setVisible(false);
    buttonCancelar.setVisible(false);
  }
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
  context.count('/PatioCelulosaApp/Services/PatioCelulosa_Destination.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/PatioCelulosaApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Logging/LogLevels.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Logging/LogLevels.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
  var levels = [];
  levels.push({
    'DisplayValue': 'Error',
    'ReturnValue': 'Error'
  });
  levels.push({
    'DisplayValue': 'Warning',
    'ReturnValue': 'Warn'
  });
  levels.push({
    'DisplayValue': 'Info',
    'ReturnValue': 'Info'
  });
  levels.push({
    'DisplayValue': 'Debug',
    'ReturnValue': 'Debug'
  });
  levels.push({
    'DisplayValue': 'Trace',
    'ReturnValue': 'Trace'
  });
  return levels;
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Logging/SetTraceCategories.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Logging/SetTraceCategories.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
  var logger = clientAPI.getLogger();
  const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
  const fcsection = sectionedTable.getSection('FormCellSection0');
  const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
  const odataTrace = fcsection.getControl('odataTrace');
  try {
    if (traceCategory.getValue()) {
      var values = traceCategory.getValue();
      var categories = [];
      if (values && values.length) {
        categories = values.map(value => {
          return 'mdk.trace.' + value.ReturnValue;
        });
      }
      clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
    }
  } catch (exception) {
    logger.log(String(exception), 'Error');
    return undefined;
  }
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Logging/SetUserLogLevel.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Logging/SetUserLogLevel.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
  try {
    if (clientAPI.getValue() && clientAPI.getValue()[0]) {
      var logger = clientAPI.getLogger();
      var listPickerValue = clientAPI.getValue()[0].ReturnValue;
      if (listPickerValue) {
        switch (listPickerValue) {
          case 'Debug':
            logger.setLevel('Debug');
            ShowTraceOptions(clientAPI, false);
            break;
          case 'Error':
            logger.setLevel('Error');
            ShowTraceOptions(clientAPI, false);
            break;
          case 'Warn':
            logger.setLevel('Warn');
            ShowTraceOptions(clientAPI, false);
            break;
          case 'Info':
            logger.setLevel('Info');
            ShowTraceOptions(clientAPI, false);
            break;
          case 'Trace':
            logger.setLevel('Trace');
            ShowTraceOptions(clientAPI, true);
            break;
          default:
            // eslint-disable-next-line no-console
            console.log(`unrecognized key ${listPickerValue}`);
        }
        return listPickerValue;
      }
    }
  } catch (exception) {
    logger.log(String(exception), 'Error');
    return undefined;
  }
}
function ShowTraceOptions(clientAPI, tracingEnabled) {
  let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
  let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');
  categories.setVisible(tracingEnabled);
  odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Logging/ToggleLogging.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Logging/ToggleLogging.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
  try {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
    const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
    let switchValue = enableLogSwitch.getValue();
    if (switchValue) {
      logger.on();
      logLevelListPicker.setVisible(true);
      logLevelListPicker.setEditable(true);
      logLevelListPicker.redraw();
    } else {
      logger.off();
      logLevelListPicker.setEditable(false);
      logLevelListPicker.setVisible(false);
      logLevelListPicker.redraw();
    }
    return switchValue;
  } catch (exception) {
    logger.log(String(exception), 'Error');
    return undefined;
  }
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Logging/TraceCategories.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Logging/TraceCategories.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
  var categories = ['action', 'api', 'app', 'binding', 'branding', 'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push', 'restservice', 'settings', 'targetpath', 'ui'];
  var values = [];
  categories.forEach(category => {
    values.push({
      'DisplayValue': category,
      'ReturnValue': category
    });
  });
  return values;
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Logging/UserLogSetting.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Logging/UserLogSetting.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {
  try {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
    const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    //Persist the user logging preferences
    if (logger) {
      console.log("in logger state");
      if (logger.isTurnedOn()) {
        if (enableLogSwitch) {
          enableLogSwitch.setValue(true);
        }
        if (logLevelListPicker) {
          logLevelListPicker.setEditable(true);
        }
      } else {
        if (enableLogSwitch) {
          enableLogSwitch.setValue(false);
        }
        if (logLevelListPicker) {
          logLevelListPicker.setEditable(false);
        }
      }
      var logLevel = logger.getLevel();
      if (logLevel) {
        if (logLevelListPicker) {
          logLevelListPicker.setValue([logLevel]);
        }
      }
      if (logLevel === 'Trace') {
        traceCategory.setVisible(true);
        odataTrace.setVisible(true);
      }

      //Upon selecting a value in the List picker and clicking the back button 
      //will enable the onload page rule. This will set the selected value
      //in the control
      if (logLevelListPicker.getValue()[0]) {
        var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
        if (returnValue) {
          logLevelListPicker.setValue([returnValue]);
          logger.setLevel(returnValue);
        }
      }
    }
  } catch (exception) {
    // eslint-disable-next-line no-console
    console.log(String(exception), 'Error User Logger could not be set');
  }
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Parametro/Parametro_DeleteConfirmation.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Parametro/Parametro_DeleteConfirmation.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/PatioCelulosaApp/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/PatioCelulosaApp/Actions/Parametro/Parametro_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Recepcion/Recepcion_DeleteConfirmation.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Recepcion/Recepcion_DeleteConfirmation.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/PatioCelulosaApp/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/PatioCelulosaApp/Actions/Recepcion/Recepcion_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Rules/Utils.js":
/*!***********************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Rules/Utils.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Utils)
/* harmony export */ });
class Utils {
  static formatISODateToSAPTime(date) {
    const dateObj = new Date(date);
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}:00`;
  }
  static displayErrorMessage = (clientAPI, title, message) => {
    const dialogs = clientAPI.nativescript.uiDialogsModule;
    dialogs.alert({
      title: title,
      message: message,
      okButtonText: "OK"
    });
  };
  static ConvertirHoraAMinutos = async hora => {
    try {
      const partesHora = hora.split(":");
      const horasEnMinutos = parseInt(partesHora[0]) * 60;
      const minutos = parseInt(partesHora[1]);
      const segundosEnMinutos = parseInt(partesHora[2]) / 60;
      const resultadoEnMinutos = horasEnMinutos + minutos + segundosEnMinutos;
      return resultadoEnMinutos;
    } catch (error) {
      console.log(error);
    }
  };
}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Styles/Styles.css":
/*!**************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Styles/Styles.css ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
.StyleStaticKeyItem {
  font-size: large;
  font-weight: bold;
  color: lightcoral;
}
#SectionKeyValue1 {
  font-size: large;
  font-weight: bold;
  color: lightcoral;
}
`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Styles/Styles.less":
/*!***************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Styles/Styles.less ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
.StyleStaticKeyItem{
    font-size: large;
    font-weight: bold;
    color   : lightcoral
}
#SectionKeyValue1{
    font-size: large;
    font-weight: bold;
    color   : lightcoral
}`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Styles/Styles.light.css":
/*!********************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Styles/Styles.light.css ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ns-light .StyleStaticKeyItem {
	font-size: large;
	font-weight: bold;
	color: lightcoral;
}
.ns-light #SectionKeyValue1 {
	font-size: large;
	font-weight: bold;
	color: lightcoral;
}
`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Styles/Styles.light.nss":
/*!********************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Styles/Styles.light.nss ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `StyleStaticKeyItem {
	font-size: large;
	font-weight: bold;
	font-color: lightcoral;
}
`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/api.js":
/*!************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/api.js ***!
  \************************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.12.1/node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \*********************************************************************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Application/About.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Application/About.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/PatioCelulosaApp/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/PatioCelulosaApp/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/PatioCelulosaApp/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":true},{"Value":"/PatioCelulosaApp/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/PatioCelulosaApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Application/Support.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Application/Support.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/PatioCelulosaApp/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/PatioCelulosaApp/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/PatioCelulosaApp/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":true,"EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/PatioCelulosaApp/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/PatioCelulosaApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Application/UserActivityLog.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Application/UserActivityLog.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/PatioCelulosaApp/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/PatioCelulosaApp/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/PatioCelulosaApp/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/PatioCelulosaApp/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/PatioCelulosaApp/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/PatioCelulosaApp/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/PatioCelulosaApp/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/PatioCelulosaApp/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Cargar_List.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Descarga/Cargar_List.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Header":{"_Name":"SectionHeader0","AccessoryType":"None","UseTopPadding":false},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Descarga","QueryOptions":"$filter=estado eq 'CARGAR'"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"Caption":"No record found!","FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"ObjectCell":{"Title":"{ID}","Subhead":"{createdAt}","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","SubstatusText":"{rumaAsignada}","PreserveIconStackSpacing":false,"AccessoryType":"DisclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false,"ImageHasBorder":false},"AvatarGrid":{"ImageIsCircular":true},"OnPress":"/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Detail.action","Selected":false,"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[]}},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"HighlightSelectedItem":false}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"Descarga_List","Caption":"Carga camiones","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"","SystemItem":"Add","Position":"Right","IsIconCircular":false,"OnPress":"/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Create.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Create.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Create.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"rumaAsignada","IsVisible":true,"Separator":true,"Caption":"rumaAsignada","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"rumaReal","IsVisible":true,"Separator":true,"Caption":"rumaReal","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"patenteCamion","IsVisible":true,"Separator":true,"Caption":"patenteCamion","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"sigla","IsVisible":true,"Separator":true,"Caption":"sigla","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"horaIniDescarga","IsVisible":true,"Separator":true,"Caption":"horaIniDescarga","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"horaFinDescarga","IsVisible":true,"Separator":true,"Caption":"horaFinDescarga","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.DatePicker","_Name":"fecha","IsVisible":true,"Separator":true,"Caption":"fecha","IsEditable":true,"Mode":"Datetime"},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"patenteGrua","IsVisible":true,"Separator":true,"Caption":"patenteGrua","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"giro","IsVisible":true,"Separator":true,"Caption":"giro","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"producto","IsVisible":true,"Separator":true,"Caption":"producto","Enabled":true,"IsEditable":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"estado","IsVisible":true,"Separator":true,"Caption":"estado","Enabled":true,"IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"Descarga_Create","Caption":"Create Descarga Detail","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"OnPress":"/PatioCelulosaApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem1","Caption":"","SystemItem":"Save","Position":"Right","IsIconCircular":false,"OnPress":"/PatioCelulosaApp/Actions/Descarga/Descarga_CreateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Detail.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Detail.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Descarga Detail","DesignTimeTarget":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Descarga","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/PatioCelulosaApp/Rules/Descarga/Descarga_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":"{rumaAsignada}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Created On","Value":"{createdAt}"},{"KeyName":"Created By","Value":"{createdBy}"},{"KeyName":"Changed On","Value":"{modifiedAt}"},{"KeyName":"Changed By","Value":"{modifiedBy}"},{"KeyName":"rumaAsignada","Value":"{rumaAsignada}"},{"KeyName":"rumaReal","Value":"{rumaReal}"},{"KeyName":"patenteCamion","Value":"{patenteCamion}"},{"KeyName":"sigla","Value":"{sigla}"},{"KeyName":"horaIniDescarga","Value":"{horaIniDescarga}"},{"KeyName":"horaFinDescarga","Value":"{horaFinDescarga}"},{"KeyName":"fecha","Value":"{fecha}"},{"KeyName":"patenteGrua","Value":"{patenteGrua}"},{"KeyName":"giro","Value":"{giro}"},{"KeyName":"producto","Value":"{producto}"},{"KeyName":"estado","Value":"{estado}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Descarga_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Detail2.page":
/*!*********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Detail2.page ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Descarga","QueryOptions":""},"Controls":[{"DataSubscriptions":[],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":false,"HeaderSeparator":false,"FooterSeparator":false,"ControlSeparator":true},"KeyAndValues":[{"Value":"{patenteCamion}","_Name":"patente","KeyName":"Patente Camión","Visible":true},{"Value":"{sigla}","_Name":"sigla","KeyName":"Sigla","Visible":true},{"Value":"{rumaAsignada}","_Name":"rumaAsignada","KeyName":"Ruma asignada","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":3}},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Sorter","_Name":"rumaReal","IsVisible":true,"Separator":true,"AllowEmptySelection":true,"Caption":"Ruma real asignada","Label":"{rumaReal}","IsEditable":true,"SortByItems":[{"DisplayValue":"Ruma 1","ReturnValue":"1"},{"DisplayValue":"Ruma 2","ReturnValue":"2"},{"DisplayValue":"Ruma 3","ReturnValue":"3"},{"DisplayValue":"Ruma 4","ReturnValue":"4"},{"DisplayValue":"Ruma 5","ReturnValue":"5"},{"DisplayValue":"Ruma 6","ReturnValue":"6"},{"DisplayValue":"Ruma 7","ReturnValue":"7"},{"DisplayValue":"Ruma 8","ReturnValue":"8"}]},{"Value":"{rumaReal}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"rumaRealAsignada","IsVisible":false,"Separator":true,"Caption":"Ruma real asignada","Enabled":true,"IsEditable":false},{"Value":"{producto}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsVisible":true,"Separator":true,"Caption":"Producto","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":false},{"Value":"{estado}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"estado","IsVisible":true,"Separator":true,"Caption":"Estado","Enabled":true,"IsEditable":false},{"Value":"{horaIniDescarga}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"horaIni","IsVisible":true,"Separator":true,"Caption":"Hora inicio descarga","Enabled":true,"IsEditable":false},{"Value":"{horaFinDescarga}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"horaFin","IsVisible":true,"Separator":true,"Caption":"Hora fin descarga","Enabled":true,"IsEditable":false}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell2"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"ButtonIni","IsVisible":true,"Separator":true,"Title":"Iniciar Descarga","Alignment":"Center","ButtonType":"Primary","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/PatioCelulosaApp/Rules/Descarga/InicioDescarga.js"},{"_Type":"Control.Type.FormCell.Button","_Name":"ButtonFin","IsVisible":false,"Separator":true,"Title":"Fin Descarga","Alignment":"Center","ButtonType":"Primary","Semantic":"Negative","ImagePosition":"Leading","Enabled":true,"OnPress":"/PatioCelulosaApp/Rules/Descarga/FinDescarga.js"},{"_Type":"Control.Type.FormCell.Button","_Name":"ButtonCancelar","IsVisible":false,"Separator":true,"Title":"Cancelar descarga","Alignment":"Center","ButtonType":"Secondary","Semantic":"Normal","ImagePosition":"Leading","Enabled":true,"OnPress":"/PatioCelulosaApp/Rules/Descarga/CancelarDescarga.js"}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"}]}],"_Type":"Page","_Name":"DetalleRecepcion","Caption":"Detalle","PrefersLargeCaption":true,"OnLoaded":"/PatioCelulosaApp/Rules/Descarga/onLoadedPage.js"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Edit.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Edit.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Descarga","QueryOptions":""},"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Controls":[{"Value":"{rumaAsignada}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"rumaAsignada","IsVisible":true,"Separator":true,"Caption":"rumaAsignada","Enabled":true,"IsEditable":true},{"Value":"{rumaReal}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"rumaReal","IsVisible":true,"Separator":true,"Caption":"rumaReal","Enabled":true,"IsEditable":true},{"Value":"{patenteCamion}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"patenteCamion","IsVisible":true,"Separator":true,"Caption":"patenteCamion","Enabled":true,"IsEditable":true},{"Value":"{sigla}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"sigla","IsVisible":true,"Separator":true,"Caption":"sigla","Enabled":true,"IsEditable":true},{"Value":"{horaFinDescarga}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"horaIniDescarga","IsVisible":true,"Separator":true,"Caption":"horaIniDescarga","Enabled":true,"IsEditable":true},{"Value":"{horaFinDescarga}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsVisible":true,"Separator":true,"Caption":"horaFinDescarga","PlaceHolder":"PlaceHolder","Enabled":true,"IsEditable":true},{"Value":"{fecha}","_Type":"Control.Type.FormCell.DatePicker","_Name":"fecha","IsVisible":true,"Separator":true,"Caption":"fecha","IsEditable":true,"Mode":"Datetime"},{"Value":"{patenteGrua}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"patenteGrua","IsVisible":true,"Separator":true,"Caption":"patenteGrua","Enabled":true,"IsEditable":true},{"Value":"{giro}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"giro","IsVisible":true,"Separator":true,"Caption":"giro","Enabled":true,"IsEditable":true},{"Value":"{producto}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"producto","IsVisible":true,"Separator":true,"Caption":"producto","Enabled":true,"IsEditable":true},{"Value":"{estado}","_Type":"Control.Type.FormCell.SimpleProperty","_Name":"estado","IsVisible":true,"Separator":true,"Caption":"estado","Enabled":true,"IsEditable":true}],"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"Descarga_Edit","Caption":"Update Descarga Detail","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"","SystemItem":"Cancel","Position":"Left","IsIconCircular":false,"OnPress":"/PatioCelulosaApp/Actions/CloseModalPage_Cancel.action"},{"_Name":"ActionBarItem1","Caption":"","SystemItem":"Save","Position":"Right","IsIconCircular":false,"OnPress":"/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_List.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_List.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Header":{"DataTable":{"Items":[{"Text":"Patente","NumberOfLines":1},{"Text":"Sigla","NumberOfLines":1},{"Text":"Ruma","NumberOfLines":1},{"Text":"Producto","NumberOfLines":1}],"Layout":{"ColumnWidth":[]}},"_Name":"SectionDataTableHeader0","AccessoryType":"None","UseTopPadding":true},"Row":{"Items":[{"Value":"{patenteCamion}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{sigla}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{rumaAsignada}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}},{"Value":"{producto}","DisplayType":"Text","EditType":"Text","NumberOfLines":1,"TextAlignment":"Left","ListPicker":{"PickerItems":[]}}],"OnPress":"/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Detail.action"},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.DataTable","Target":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Descarga"},"_Name":"SectionDataTable0","Visible":true,"EmptySection":{"FooterVisible":false},"EditMode":"None","StickyColumn":false}],"LoadingIndicator":{"Enabled":false,"Text":""}}],"_Type":"Page","_Name":"Descarga_List","Caption":"Descarga camiones","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"","SystemItem":"Add","Position":"Right","IsIconCircular":false,"OnPress":"/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Create.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_List2.page":
/*!*******************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_List2.page ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Header":{"_Name":"SectionHeader0","AccessoryType":"None","UseTopPadding":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Descarga","QueryOptions":"$orderby=estado desc"},"_Name":"ObjectCell","Visible":true,"EmptySection":{"Caption":"No record found!","FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[]},"Title":"Patente camión :  {patenteCamion}","Subhead":"Sigla : {sigla}","SubstatusText":"Producto : {producto}","PreserveIconStackSpacing":false,"AccessoryType":"DisclosureIndicator","Tags":[{"Color":"Blue","Text":"Ruma asignada : {rumaAsignada}"},{"Color":"/PatioCelulosaApp/Rules/Descarga/TagColor.js","Text":"Estado : {estado}"}],"AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false,"ImageHasBorder":false},"AvatarGrid":{"ImageIsCircular":true},"OnPress":"/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Detail.action","Selected":false},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"HighlightSelectedItem":false}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."}}],"DesignTimeTarget":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Descarga"},"_Type":"Page","_Name":"Recepcion_List","Caption":"Grúa : GLX-30","PrefersLargeCaption":true,"OnLoaded":"/PatioCelulosaApp/Rules/Descarga/TagColor.js","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"","SystemItem":"Add","Position":"Right","IsIconCircular":false,"OnPress":"/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Create.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_RumaReal.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_RumaReal.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Sorter","_Name":"rumaReal","IsVisible":true,"Separator":true,"AllowEmptySelection":true,"Caption":"Ruma real asignada","IsEditable":true,"SortByItems":[{"DisplayValue":"1","ReturnValue":"1"},{"DisplayValue":"2","ReturnValue":"2"},{"DisplayValue":"3","ReturnValue":"3"},{"DisplayValue":"4","ReturnValue":""},{"DisplayValue":"5","ReturnValue":"5"},{"DisplayValue":"6","ReturnValue":"6"},{"DisplayValue":"7","ReturnValue":"7"},{"DisplayValue":"8","ReturnValue":"8"},{"DisplayValue":"9","ReturnValue":"9"},{"DisplayValue":"10","ReturnValue":"10"}]}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"Descarga_RumaReal","Caption":"Asignar ruma real","PrefersLargeCaption":true,"Result":["#Page:Descarga_RumaReal/#Control:rumaReal/#Value"]}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!****************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/ErrorArchive/ErrorArchive_List.page":
/*!**************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"None","OnPress":"/PatioCelulosaApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Main.page":
/*!************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Main.page ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Buttons":[{"OnPress":"/PatioCelulosaApp/Actions/Descarga/NavToDescarga_List.action","Alignment":"Center","Title":"Descarga","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/PatioCelulosaApp/Actions/Parametro/NavToParametro_List.action","Alignment":"Center","Title":"Parametro","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_List.action","Alignment":"Center","Title":"Recepcion","ButtonType":"Text","Semantic":"Tint"}],"_Name":"SectionButtonTable0","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/PatioCelulosaApp/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/MainButtonNavigation.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/MainButtonNavigation.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.BottomNavigation","_Name":"BottomNavigation0","Items":[{"_Type":"Control.Type.TabItem","Caption":"Descarga","PageToOpen":"/PatioCelulosaApp/Pages/Descarga/Descarga_List2.page","_Name":"TabItem0"},{"_Type":"Control.Type.TabItem","Caption":"Carga","PageToOpen":"/PatioCelulosaApp/Pages/Descarga/Descarga_List2.page","_Name":"TabItem1"},{"_Type":"Control.Type.TabItem","Caption":"Configuración","PageToOpen":"/PatioCelulosaApp/Pages/Main.page","_Name":"TabItem2"}]}],"_Type":"Page","_Name":"MainButtonNavigation","Caption":"Demo Patio celulosa"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_Create.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_Create.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/PatioCelulosaApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/PatioCelulosaApp/Actions/Parametro/Parametro_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Parametro Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"param","_Name":"param","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"valor","_Name":"valor","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"glosa","_Name":"glosa","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"vigente","Caption":"vigente","Value":false,"_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Parametro_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_Detail.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_Detail.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Parametro Detail","DesignTimeTarget":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Parametro","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/PatioCelulosaApp/Actions/Parametro/NavToParametro_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/PatioCelulosaApp/Rules/Parametro/Parametro_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":"{param}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Created On","Value":"{createdAt}"},{"KeyName":"Created By","Value":"{createdBy}"},{"KeyName":"Changed On","Value":"{modifiedAt}"},{"KeyName":"Changed By","Value":"{modifiedBy}"},{"KeyName":"param","Value":"{param}"},{"KeyName":"valor","Value":"{valor}"},{"KeyName":"glosa","Value":"{glosa}"},{"KeyName":"descripcion","Value":"{descripcion}"},{"KeyName":"vigente","Value":"{vigente}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Parametro_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_Edit.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_Edit.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Parametro Detail","DesignTimeTarget":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Parametro","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/PatioCelulosaApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/PatioCelulosaApp/Actions/Parametro/Parametro_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"param","_Name":"param","Value":"{param}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"valor","_Name":"valor","Value":"{valor}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"glosa","_Name":"glosa","Value":"{glosa}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"descripcion","_Name":"descripcion","Value":"{descripcion}","_Type":"Control.Type.FormCell.SimpleProperty"},{"_Name":"vigente","Caption":"vigente","Value":"{vigente}","_Type":"Control.Type.FormCell.Switch"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Parametro_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_List.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_List.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Parametro","ActionBar":{"Items":[{"OnPress":"/PatioCelulosaApp/Actions/Parametro/NavToParametro_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{createdBy}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/PatioCelulosaApp/Actions/Parametro/NavToParametro_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":"{param}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Parametro","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Parametro_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_Create.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_Create.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/PatioCelulosaApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/PatioCelulosaApp/Actions/Recepcion/Recepcion_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Recepcion Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ruma","_Name":"ruma","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"sigla","_Name":"sigla","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"patente","_Name":"patente","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"producto","_Name":"producto","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"fecha","Caption":"fecha","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"pais","_Name":"pais","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"numGuia","_Name":"numGuia","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"giro","_Name":"giro","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"forestruck","_Name":"forestruck","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"produto","_Name":"produto","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"planta","_Name":"planta","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Recepcion_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_Detail.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_Detail.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"DesignTimeTarget":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Recepcion","QueryOptions":""},"Controls":[{"DataSubscriptions":[],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"ObjectHeader":{"Footnote":"{modifiedAt}","Description":"{patente}","StatusText":"{producto}","Tags":[],"HeadlineText":"{ruma}","StatusPosition":"Stacked","StatusImagePosition":"Leading","SubstatusImagePosition":"Leading","Labels":[]},"_Type":"Section.Type.ObjectHeader","_Name":"SectionObjectHeader0","Visible":true},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"InicioFin","IsVisible":true,"Separator":true,"Title":"Iniciar Descarga","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/PatioCelulosaApp/Rules/Descarga/InicioDescarga.js"}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell1"},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Controls":[{"Value":1,"_Type":"Control.Type.FormCell.DurationPicker","_Name":"FormCellDurationPicker0","IsVisible":true,"Separator":true,"Caption":"Duration","MinuteInterval":5,"IsEditable":true,"Unit":"H"},{"_Type":"Control.Type.FormCell.SegmentedControl","_Name":"Rumas1","IsVisible":true,"Separator":false,"Caption":"Rula real asignada","IsEditable":true,"ApportionsSegmentWidthsByContent":false,"Segments":["1","2","3","4","5","6","7","8","9","10"]}],"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"DetalleRecepcion","Caption":"Detalle","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"","SystemItem":"Edit","Position":"Right","IsIconCircular":false,"OnPress":"/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Edit.action"},{"_Name":"ActionBarItem1","Caption":"","SystemItem":"Trash","Position":"Right","IsIconCircular":false,"OnPress":"/PatioCelulosaApp/Rules/Recepcion/Recepcion_DeleteConfirmation.js"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_Edit.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_Edit.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Recepcion Detail","DesignTimeTarget":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Recepcion","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/PatioCelulosaApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/PatioCelulosaApp/Actions/Recepcion/Recepcion_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"ruma","_Name":"ruma","Value":"{ruma}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"sigla","_Name":"sigla","Value":"{sigla}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"patente","_Name":"patente","Value":"{patente}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"producto","_Name":"producto","Value":"{producto}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"fecha","Value":"{fecha}","Caption":"fecha","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"pais","_Name":"pais","Value":"{pais}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"numGuia","_Name":"numGuia","Value":"{numGuia}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"giro","_Name":"giro","Value":"{giro}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"forestruck","_Name":"forestruck","Value":"{forestruck}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"produto","_Name":"produto","Value":"{produto}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"planta","_Name":"planta","Value":"{planta}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Recepcion_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_List.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_List.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Recepcion","ActionBar":{"Items":[{"OnPress":"/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{createdBy}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":"{ruma}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Recepcion","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Recepcion_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/PatioCelulosaApp/Pages/MainButtonNavigation.page","OnLaunch":["/PatioCelulosaApp/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/PatioCelulosaApp/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/PatioCelulosaApp/Actions/Service/InitializeOffline.action","Styles":"/PatioCelulosaApp/Styles/Styles.css","Version":"/PatioCelulosaApp/Globals/Application/AppDefinition_Version.global","Localization":"/PatioCelulosaApp/i18n/i18n.properties","_SchemaVersion":"23.12","_Name":"PatioCelulosaApp","StyleSheets":{"Styles":{"css":"/PatioCelulosaApp/Styles/Styles.light.css","ios":"/PatioCelulosaApp/Styles/Styles.light.nss","android":"/PatioCelulosaApp/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/PatioCelulosaApp/Styles/Styles.light.nss","android":"/PatioCelulosaApp/Styles/Styles.light.json"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdate.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdate.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/PatioCelulosaApp/Rules/Application/AppUpdateFailure.js","OnSuccess":"/PatioCelulosaApp/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdateFailureMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdateFailureMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdateProgressBanner.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdateProgressBanner.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ProgressBanner","OnSuccess":"/PatioCelulosaApp/Actions/Application/AppUpdate.action","Message":"Check for update..","CompletionTimeout":3,"Animated":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdateSuccessMessage.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdateSuccessMessage.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/Logout.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/Logout.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/NavToAbout.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/NavToAbout.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/PatioCelulosaApp/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/NavToActivityLog.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/NavToActivityLog.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/PatioCelulosaApp/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/NavToSupport.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/NavToSupport.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/PatioCelulosaApp/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/OnWillUpdate.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/OnWillUpdate.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/Reset.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/Reset.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/ResetMessage.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/ResetMessage.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/PatioCelulosaApp/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Application/UserMenuPopover.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Application/UserMenuPopover.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://synchronize","OnPress":"/PatioCelulosaApp/Actions/Service/SyncStartedMessage.action","Title":"Sync Changes","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/PatioCelulosaApp/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/PatioCelulosaApp/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/PatioCelulosaApp/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/PatioCelulosaApp/Actions/Application/ResetMessage.action","Title":"Reset","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/PatioCelulosaApp/Actions/Application/Logout.action","Title":"Logout","Visible":"/PatioCelulosaApp/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/CloseModalPage_Cancel.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/CloseModalPage_Cancel.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/CloseModalPage_Complete.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/CloseModalPage_Complete.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/ClosePage.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/ClosePage.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/CreateEntityFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/CreateEntityFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/CreateEntitySuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/CreateEntitySuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/PatioCelulosaApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/DeleteConfirmation.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/DeleteConfirmation.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/DeleteEntityFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/DeleteEntityFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/DeleteEntitySuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/DeleteEntitySuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/PatioCelulosaApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/AppTimeOutDescarga.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/AppTimeOutDescarga.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppTimeOutDescarga"},"OnSuccess":"/PatioCelulosaApp/Rules/Descarga/TimeOut.js"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/AppUpdateProgressBanner1.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/AppUpdateProgressBanner1.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ProgressBanner","OnSuccess":"/PatioCelulosaApp/Actions/Descarga/AppTimeOutDescarga.action","Message":"Descargando Camión..","CompletionTimeout":0,"Animated":true,"ActionLabel":"Cancelar","DismissBannerOnAction":false}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/BannerDescarga.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/BannerDescarga.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"BannerDescarga"},"ShowActivityIndicator":true,"Message":"Descargando..","Duration":15,"Animated":true,"ActionLabel":"Finalizar","OnActionLabelPress":"/PatioCelulosaApp/Rules/Descarga/FinDescarga.js","DismissBannerOnAction":false}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_CreateEntity.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_CreateEntity.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/PatioCelulosaApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/PatioCelulosaApp/Actions/CreateEntitySuccessMessage.action","Properties":{"rumaAsignada":"#Control:rumaAsignada/#Value","rumaReal":"#Control:rumaReal/#Value","patenteCamion":"#Control:patenteCamion/#Value","sigla":"#Control:sigla/#Value","horaIniDescarga":"#Control:horaIniDescarga/#Value","horaFinDescarga":"#Control:horaFinDescarga/#Value","fecha":"#Control:fecha/#Value","patenteGrua":"#Control:patenteGrua/#Value","giro":"#Control:giro/#Value","producto":"#Control:producto/#Value","estado":"#Control:estado/#Value"},"Target":{"EntitySet":"Descarga","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_DeleteEntity.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_DeleteEntity.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Descarga","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/PatioCelulosaApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/PatioCelulosaApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"updateDescarga"},"OnFailure":"/PatioCelulosaApp/Actions/UpdateEntityFailureMessage.action","OnSuccess":"/PatioCelulosaApp/Actions/UpdateEntitySuccessMessage.action","Target":{"EntitySet":"Descarga","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","ReadLink":"{@odata.readLink}"}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity2.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity2.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"Descarga_UpdateEntity2"},"Target":{"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","EntitySet":"Descarga"},"Properties":{"ID":""}}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Create.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Create.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/PatioCelulosaApp/Pages/Descarga/Descarga_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Detail.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Detail.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/PatioCelulosaApp/Pages/Descarga/Descarga_Detail2.page","BackStackVisible":false,"ModalPage":false}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Edit.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Edit.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/PatioCelulosaApp/Pages/Descarga/Descarga_Edit.page","ModalPage":false,"ModalPageFullscreen":false}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_List.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_List.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/PatioCelulosaApp/Pages/Descarga/Descarga_List2.page","BackStackVisible":false,"ModalPage":false}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_RumaReal.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_RumaReal.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Filter","ActionResult":{"_Name":"NavToDescarga_RumaReal"},"Filterable":"#Page:Descarga_RumaReal/#Control:SectionedTable0","PageToOpen":"/PatioCelulosaApp/Pages/Descarga/Descarga_RumaReal.page","ModalPageFullscreen":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Descarga/ProgressBannerDescarga.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Descarga/ProgressBannerDescarga.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ProgressBanner","ActionResult":{"_Name":"ProgressBannerDescarga"},"ShowActivityIndicator":true,"Message":"Descargando..","CompletionTimeout":15,"Animated":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/PatioCelulosaApp/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/PatioCelulosaApp/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/PatioCelulosaApp/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/GenericBannerMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/GenericBannerMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/GenericMessageBox.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/GenericMessageBox.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/GenericNavigation.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/GenericNavigation.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/PatioCelulosaApp/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/GenericToastMessage.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/GenericToastMessage.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Logging/LogUploadFailure.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Logging/LogUploadFailure.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Logging/LogUploadSuccessful.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Logging/LogUploadSuccessful.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Logging/UploadLog.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Logging/UploadLog.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/PatioCelulosaApp/Actions/Logging/LogUploadFailure.action","OnSuccess":"/PatioCelulosaApp/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Logging/UploadLogProgress.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Logging/UploadLogProgress.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/PatioCelulosaApp/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_Create.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_Create.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/PatioCelulosaApp/Pages/Parametro/Parametro_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_Detail.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_Detail.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/PatioCelulosaApp/Pages/Parametro/Parametro_Detail.page"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_Edit.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_Edit.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/PatioCelulosaApp/Pages/Parametro/Parametro_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_List.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_List.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/PatioCelulosaApp/Pages/Parametro/Parametro_List.page"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Parametro/Parametro_CreateEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Parametro/Parametro_CreateEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/PatioCelulosaApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/PatioCelulosaApp/Actions/CreateEntitySuccessMessage.action","Properties":{"param":"#Control:param/#Value","valor":"#Control:valor/#Value","glosa":"#Control:glosa/#Value","descripcion":"#Control:descripcion/#Value","vigente":"#Control:vigente/#Value"},"Target":{"EntitySet":"Parametro","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Parametro/Parametro_DeleteEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Parametro/Parametro_DeleteEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Parametro","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/PatioCelulosaApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/PatioCelulosaApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Parametro/Parametro_UpdateEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Parametro/Parametro_UpdateEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Parametro","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","ReadLink":"{@odata.readLink}"},"Properties":{"param":"#Control:param/#Value","valor":"#Control:valor/#Value","glosa":"#Control:glosa/#Value","descripcion":"#Control:descripcion/#Value","vigente":"#Control:vigente/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/PatioCelulosaApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/PatioCelulosaApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Create.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Create.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/PatioCelulosaApp/Pages/Recepcion/Recepcion_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Detail.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Detail.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/PatioCelulosaApp/Pages/Recepcion/Recepcion_Detail.page"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Edit.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Edit.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/PatioCelulosaApp/Pages/Recepcion/Recepcion_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_List.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_List.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/PatioCelulosaApp/Pages/Recepcion/Recepcion_List.page"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/Recepcion_CreateEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Recepcion/Recepcion_CreateEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/PatioCelulosaApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/PatioCelulosaApp/Actions/CreateEntitySuccessMessage.action","Properties":{"ruma":"#Control:ruma/#Value","sigla":"#Control:sigla/#Value","patente":"#Control:patente/#Value","producto":"#Control:producto/#Value","fecha":"#Control:fecha/#Value","pais":"#Control:pais/#Value","numGuia":"#Control:numGuia/#Value","giro":"#Control:giro/#Value","forestruck":"#Control:forestruck/#Value","produto":"#Control:produto/#Value","planta":"#Control:planta/#Value"},"Target":{"EntitySet":"Recepcion","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/Recepcion_DeleteEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Recepcion/Recepcion_DeleteEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Recepcion","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/PatioCelulosaApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/PatioCelulosaApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/Recepcion_UpdateEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Recepcion/Recepcion_UpdateEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Recepcion","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","ReadLink":"{@odata.readLink}"},"Properties":{"ruma":"#Control:ruma/#Value","sigla":"#Control:sigla/#Value","patente":"#Control:patente/#Value","producto":"#Control:producto/#Value","fecha":"#Control:fecha/#Value","pais":"#Control:pais/#Value","numGuia":"#Control:numGuia/#Value","giro":"#Control:giro/#Value","forestruck":"#Control:forestruck/#Value","produto":"#Control:produto/#Value","planta":"#Control:planta/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/PatioCelulosaApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/PatioCelulosaApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Service/CloseOffline.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Service/CloseOffline.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/PatioCelulosaApp/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/PatioCelulosaApp/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Service/CloseOfflineFailureMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Service/CloseOfflineFailureMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Service/CloseOfflineSuccessMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Service/DownloadOffline.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Service/DownloadOffline.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","DefiningRequests":[{"Name":"Descarga","Query":"Descarga"},{"Name":"Parametro","Query":"Parametro"},{"Name":"Recepcion","Query":"Recepcion"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/PatioCelulosaApp/Actions/Service/SyncFailureMessage.action","OnSuccess":"/PatioCelulosaApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Service/DownloadStartedMessage.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Service/DownloadStartedMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/PatioCelulosaApp/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Service/InitializeOffline.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Service/InitializeOffline.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","DefiningRequests":[{"Name":"Descarga","Query":"Descarga"},{"Name":"Parametro","Query":"Parametro"},{"Name":"Recepcion","Query":"Recepcion"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/PatioCelulosaApp/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/PatioCelulosaApp/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Service/InitializeOfflineFailureMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Service/SyncFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Service/SyncFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Service/SyncStartedMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Service/SyncStartedMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/PatioCelulosaApp/Actions/Service/UploadOffline.action","OnFailure":"/PatioCelulosaApp/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/Service/UploadOffline.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/Service/UploadOffline.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/PatioCelulosaApp/Services/PatioCelulosa_Destination.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/PatioCelulosaApp/Actions/Service/DownloadStartedMessage.action","OnFailure":"/PatioCelulosaApp/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/UpdateEntityFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/UpdateEntityFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Actions/UpdateEntitySuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Actions/UpdateEntitySuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","Message":"Entity updated","NumberOfLines":2,"Duration":2,"IsIconHidden":false,"Animated":true}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Globals/Application/AppDefinition_Version.global":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Globals/Application/AppDefinition_Version.global ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Globals/Application/ApplicationName.global":
/*!***************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Globals/Application/ApplicationName.global ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Globals/Application/SupportEmail.global":
/*!************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Globals/Application/SupportEmail.global ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Globals/Application/SupportPhone.global":
/*!************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Globals/Application/SupportPhone.global ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Services/PatioCelulosa_Destination.service":
/*!***************************************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Services/PatioCelulosa_Destination.service ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"PatioCelulosa_Destination","PathSuffix":"/odata/v4/catalog/","OfflineEnabled":true,"OfflineOptions":{"StoreParameters":{"StoreName":"cel"}},"SourceType":"Mobile","RestService":false}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let patiocelulosaapp_actions_application_appupdate_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/AppUpdate.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdate.action")
let patiocelulosaapp_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdateFailureMessage.action")
let patiocelulosaapp_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdateProgressBanner.action")
let patiocelulosaapp_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/AppUpdateSuccessMessage.action")
let patiocelulosaapp_actions_application_logout_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/Logout.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/Logout.action")
let patiocelulosaapp_actions_application_navtoabout_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/NavToAbout.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/NavToAbout.action")
let patiocelulosaapp_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/NavToActivityLog.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/NavToActivityLog.action")
let patiocelulosaapp_actions_application_navtosupport_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/NavToSupport.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/NavToSupport.action")
let patiocelulosaapp_actions_application_onwillupdate_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/OnWillUpdate.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/OnWillUpdate.action")
let patiocelulosaapp_actions_application_reset_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/Reset.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/Reset.action")
let patiocelulosaapp_actions_application_resetmessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/ResetMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/ResetMessage.action")
let patiocelulosaapp_actions_application_usermenupopover_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Application/UserMenuPopover.action */ "./build.definitions/PatioCelulosaApp/Actions/Application/UserMenuPopover.action")
let patiocelulosaapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/PatioCelulosaApp/Actions/CloseModalPage_Cancel.action")
let patiocelulosaapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/PatioCelulosaApp/Actions/CloseModalPage_Complete.action")
let patiocelulosaapp_actions_closepage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/ClosePage.action */ "./build.definitions/PatioCelulosaApp/Actions/ClosePage.action")
let patiocelulosaapp_actions_createentityfailuremessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/CreateEntityFailureMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/CreateEntityFailureMessage.action")
let patiocelulosaapp_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/CreateEntitySuccessMessage.action")
let patiocelulosaapp_actions_deleteconfirmation_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/DeleteConfirmation.action */ "./build.definitions/PatioCelulosaApp/Actions/DeleteConfirmation.action")
let patiocelulosaapp_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/DeleteEntityFailureMessage.action")
let patiocelulosaapp_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/DeleteEntitySuccessMessage.action")
let patiocelulosaapp_actions_descarga_apptimeoutdescarga_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/AppTimeOutDescarga.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/AppTimeOutDescarga.action")
let patiocelulosaapp_actions_descarga_appupdateprogressbanner1_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/AppUpdateProgressBanner1.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/AppUpdateProgressBanner1.action")
let patiocelulosaapp_actions_descarga_bannerdescarga_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/BannerDescarga.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/BannerDescarga.action")
let patiocelulosaapp_actions_descarga_descarga_createentity_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/Descarga_CreateEntity.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_CreateEntity.action")
let patiocelulosaapp_actions_descarga_descarga_deleteentity_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/Descarga_DeleteEntity.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_DeleteEntity.action")
let patiocelulosaapp_actions_descarga_descarga_updateentity2_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity2.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity2.action")
let patiocelulosaapp_actions_descarga_descarga_updateentity_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/Descarga_UpdateEntity.action")
let patiocelulosaapp_actions_descarga_navtodescarga_create_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/NavToDescarga_Create.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Create.action")
let patiocelulosaapp_actions_descarga_navtodescarga_detail_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/NavToDescarga_Detail.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Detail.action")
let patiocelulosaapp_actions_descarga_navtodescarga_edit_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/NavToDescarga_Edit.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_Edit.action")
let patiocelulosaapp_actions_descarga_navtodescarga_list_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/NavToDescarga_List.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_List.action")
let patiocelulosaapp_actions_descarga_navtodescarga_rumareal_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/NavToDescarga_RumaReal.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/NavToDescarga_RumaReal.action")
let patiocelulosaapp_actions_descarga_progressbannerdescarga_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Descarga/ProgressBannerDescarga.action */ "./build.definitions/PatioCelulosaApp/Actions/Descarga/ProgressBannerDescarga.action")
let patiocelulosaapp_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/PatioCelulosaApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let patiocelulosaapp_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/PatioCelulosaApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let patiocelulosaapp_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/PatioCelulosaApp/Actions/ErrorArchive/NavToErrorArchive_List.action")
let patiocelulosaapp_actions_genericbannermessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/GenericBannerMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/GenericBannerMessage.action")
let patiocelulosaapp_actions_genericmessagebox_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/GenericMessageBox.action */ "./build.definitions/PatioCelulosaApp/Actions/GenericMessageBox.action")
let patiocelulosaapp_actions_genericnavigation_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/GenericNavigation.action */ "./build.definitions/PatioCelulosaApp/Actions/GenericNavigation.action")
let patiocelulosaapp_actions_generictoastmessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/GenericToastMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/GenericToastMessage.action")
let patiocelulosaapp_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Logging/LogUploadFailure.action */ "./build.definitions/PatioCelulosaApp/Actions/Logging/LogUploadFailure.action")
let patiocelulosaapp_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/PatioCelulosaApp/Actions/Logging/LogUploadSuccessful.action")
let patiocelulosaapp_actions_logging_uploadlog_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Logging/UploadLog.action */ "./build.definitions/PatioCelulosaApp/Actions/Logging/UploadLog.action")
let patiocelulosaapp_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Logging/UploadLogProgress.action */ "./build.definitions/PatioCelulosaApp/Actions/Logging/UploadLogProgress.action")
let patiocelulosaapp_actions_parametro_navtoparametro_create_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Parametro/NavToParametro_Create.action */ "./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_Create.action")
let patiocelulosaapp_actions_parametro_navtoparametro_detail_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Parametro/NavToParametro_Detail.action */ "./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_Detail.action")
let patiocelulosaapp_actions_parametro_navtoparametro_edit_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Parametro/NavToParametro_Edit.action */ "./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_Edit.action")
let patiocelulosaapp_actions_parametro_navtoparametro_list_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Parametro/NavToParametro_List.action */ "./build.definitions/PatioCelulosaApp/Actions/Parametro/NavToParametro_List.action")
let patiocelulosaapp_actions_parametro_parametro_createentity_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Parametro/Parametro_CreateEntity.action */ "./build.definitions/PatioCelulosaApp/Actions/Parametro/Parametro_CreateEntity.action")
let patiocelulosaapp_actions_parametro_parametro_deleteentity_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Parametro/Parametro_DeleteEntity.action */ "./build.definitions/PatioCelulosaApp/Actions/Parametro/Parametro_DeleteEntity.action")
let patiocelulosaapp_actions_parametro_parametro_updateentity_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Parametro/Parametro_UpdateEntity.action */ "./build.definitions/PatioCelulosaApp/Actions/Parametro/Parametro_UpdateEntity.action")
let patiocelulosaapp_actions_recepcion_navtorecepcion_create_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Create.action */ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Create.action")
let patiocelulosaapp_actions_recepcion_navtorecepcion_detail_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Detail.action */ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Detail.action")
let patiocelulosaapp_actions_recepcion_navtorecepcion_edit_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Edit.action */ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_Edit.action")
let patiocelulosaapp_actions_recepcion_navtorecepcion_list_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_List.action */ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/NavToRecepcion_List.action")
let patiocelulosaapp_actions_recepcion_recepcion_createentity_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Recepcion/Recepcion_CreateEntity.action */ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/Recepcion_CreateEntity.action")
let patiocelulosaapp_actions_recepcion_recepcion_deleteentity_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Recepcion/Recepcion_DeleteEntity.action */ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/Recepcion_DeleteEntity.action")
let patiocelulosaapp_actions_recepcion_recepcion_updateentity_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Recepcion/Recepcion_UpdateEntity.action */ "./build.definitions/PatioCelulosaApp/Actions/Recepcion/Recepcion_UpdateEntity.action")
let patiocelulosaapp_actions_service_closeoffline_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Service/CloseOffline.action */ "./build.definitions/PatioCelulosaApp/Actions/Service/CloseOffline.action")
let patiocelulosaapp_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/Service/CloseOfflineFailureMessage.action")
let patiocelulosaapp_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/Service/CloseOfflineSuccessMessage.action")
let patiocelulosaapp_actions_service_downloadoffline_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Service/DownloadOffline.action */ "./build.definitions/PatioCelulosaApp/Actions/Service/DownloadOffline.action")
let patiocelulosaapp_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/Service/DownloadStartedMessage.action")
let patiocelulosaapp_actions_service_initializeoffline_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Service/InitializeOffline.action */ "./build.definitions/PatioCelulosaApp/Actions/Service/InitializeOffline.action")
let patiocelulosaapp_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/Service/InitializeOfflineFailureMessage.action")
let patiocelulosaapp_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/Service/InitializeOfflineSuccessMessage.action")
let patiocelulosaapp_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Service/SyncFailureMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/Service/SyncFailureMessage.action")
let patiocelulosaapp_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Service/SyncStartedMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/Service/SyncStartedMessage.action")
let patiocelulosaapp_actions_service_uploadoffline_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/Service/UploadOffline.action */ "./build.definitions/PatioCelulosaApp/Actions/Service/UploadOffline.action")
let patiocelulosaapp_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/UpdateEntityFailureMessage.action")
let patiocelulosaapp_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./PatioCelulosaApp/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/PatioCelulosaApp/Actions/UpdateEntitySuccessMessage.action")
let patiocelulosaapp_globals_application_appdefinition_version_global = __webpack_require__(/*! ./PatioCelulosaApp/Globals/Application/AppDefinition_Version.global */ "./build.definitions/PatioCelulosaApp/Globals/Application/AppDefinition_Version.global")
let patiocelulosaapp_globals_application_applicationname_global = __webpack_require__(/*! ./PatioCelulosaApp/Globals/Application/ApplicationName.global */ "./build.definitions/PatioCelulosaApp/Globals/Application/ApplicationName.global")
let patiocelulosaapp_globals_application_supportemail_global = __webpack_require__(/*! ./PatioCelulosaApp/Globals/Application/SupportEmail.global */ "./build.definitions/PatioCelulosaApp/Globals/Application/SupportEmail.global")
let patiocelulosaapp_globals_application_supportphone_global = __webpack_require__(/*! ./PatioCelulosaApp/Globals/Application/SupportPhone.global */ "./build.definitions/PatioCelulosaApp/Globals/Application/SupportPhone.global")
let patiocelulosaapp_i18n_i18n_properties = __webpack_require__(/*! ./PatioCelulosaApp/i18n/i18n.properties */ "./build.definitions/PatioCelulosaApp/i18n/i18n.properties")
let patiocelulosaapp_jsconfig_json = __webpack_require__(/*! ./PatioCelulosaApp/jsconfig.json */ "./build.definitions/PatioCelulosaApp/jsconfig.json")
let patiocelulosaapp_pages_application_about_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Application/About.page */ "./build.definitions/PatioCelulosaApp/Pages/Application/About.page")
let patiocelulosaapp_pages_application_support_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Application/Support.page */ "./build.definitions/PatioCelulosaApp/Pages/Application/Support.page")
let patiocelulosaapp_pages_application_useractivitylog_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Application/UserActivityLog.page */ "./build.definitions/PatioCelulosaApp/Pages/Application/UserActivityLog.page")
let patiocelulosaapp_pages_descarga_cargar_list_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Descarga/Cargar_List.page */ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Cargar_List.page")
let patiocelulosaapp_pages_descarga_descarga_create_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Descarga/Descarga_Create.page */ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Create.page")
let patiocelulosaapp_pages_descarga_descarga_detail2_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Descarga/Descarga_Detail2.page */ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Detail2.page")
let patiocelulosaapp_pages_descarga_descarga_detail_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Descarga/Descarga_Detail.page */ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Detail.page")
let patiocelulosaapp_pages_descarga_descarga_edit_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Descarga/Descarga_Edit.page */ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_Edit.page")
let patiocelulosaapp_pages_descarga_descarga_list2_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Descarga/Descarga_List2.page */ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_List2.page")
let patiocelulosaapp_pages_descarga_descarga_list_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Descarga/Descarga_List.page */ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_List.page")
let patiocelulosaapp_pages_descarga_descarga_rumareal_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Descarga/Descarga_RumaReal.page */ "./build.definitions/PatioCelulosaApp/Pages/Descarga/Descarga_RumaReal.page")
let patiocelulosaapp_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/PatioCelulosaApp/Pages/ErrorArchive/ErrorArchive_Detail.page")
let patiocelulosaapp_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/PatioCelulosaApp/Pages/ErrorArchive/ErrorArchive_List.page")
let patiocelulosaapp_pages_main_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Main.page */ "./build.definitions/PatioCelulosaApp/Pages/Main.page")
let patiocelulosaapp_pages_mainbuttonnavigation_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/MainButtonNavigation.page */ "./build.definitions/PatioCelulosaApp/Pages/MainButtonNavigation.page")
let patiocelulosaapp_pages_parametro_parametro_create_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Parametro/Parametro_Create.page */ "./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_Create.page")
let patiocelulosaapp_pages_parametro_parametro_detail_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Parametro/Parametro_Detail.page */ "./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_Detail.page")
let patiocelulosaapp_pages_parametro_parametro_edit_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Parametro/Parametro_Edit.page */ "./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_Edit.page")
let patiocelulosaapp_pages_parametro_parametro_list_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Parametro/Parametro_List.page */ "./build.definitions/PatioCelulosaApp/Pages/Parametro/Parametro_List.page")
let patiocelulosaapp_pages_recepcion_recepcion_create_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Recepcion/Recepcion_Create.page */ "./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_Create.page")
let patiocelulosaapp_pages_recepcion_recepcion_detail_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Recepcion/Recepcion_Detail.page */ "./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_Detail.page")
let patiocelulosaapp_pages_recepcion_recepcion_edit_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Recepcion/Recepcion_Edit.page */ "./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_Edit.page")
let patiocelulosaapp_pages_recepcion_recepcion_list_page = __webpack_require__(/*! ./PatioCelulosaApp/Pages/Recepcion/Recepcion_List.page */ "./build.definitions/PatioCelulosaApp/Pages/Recepcion/Recepcion_List.page")
let patiocelulosaapp_rules_application_appupdatefailure_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Application/AppUpdateFailure.js */ "./build.definitions/PatioCelulosaApp/Rules/Application/AppUpdateFailure.js")
let patiocelulosaapp_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/PatioCelulosaApp/Rules/Application/AppUpdateSuccess.js")
let patiocelulosaapp_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/PatioCelulosaApp/Rules/Application/ClientIsMultiUserMode.js")
let patiocelulosaapp_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/PatioCelulosaApp/Rules/Application/GetClientSupportVersions.js")
let patiocelulosaapp_rules_application_getclientversion_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Application/GetClientVersion.js */ "./build.definitions/PatioCelulosaApp/Rules/Application/GetClientVersion.js")
let patiocelulosaapp_rules_application_onwillupdate_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Application/OnWillUpdate.js */ "./build.definitions/PatioCelulosaApp/Rules/Application/OnWillUpdate.js")
let patiocelulosaapp_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/PatioCelulosaApp/Rules/Application/ResetAppSettingsAndLogout.js")
let patiocelulosaapp_rules_descarga_cancelardescarga_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Descarga/CancelarDescarga.js */ "./build.definitions/PatioCelulosaApp/Rules/Descarga/CancelarDescarga.js")
let patiocelulosaapp_rules_descarga_descarga_deleteconfirmation_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Descarga/Descarga_DeleteConfirmation.js */ "./build.definitions/PatioCelulosaApp/Rules/Descarga/Descarga_DeleteConfirmation.js")
let patiocelulosaapp_rules_descarga_findescarga_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Descarga/FinDescarga.js */ "./build.definitions/PatioCelulosaApp/Rules/Descarga/FinDescarga.js")
let patiocelulosaapp_rules_descarga_iniciodescarga_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Descarga/InicioDescarga.js */ "./build.definitions/PatioCelulosaApp/Rules/Descarga/InicioDescarga.js")
let patiocelulosaapp_rules_descarga_onloadedpage_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Descarga/onLoadedPage.js */ "./build.definitions/PatioCelulosaApp/Rules/Descarga/onLoadedPage.js")
let patiocelulosaapp_rules_descarga_tagcolor_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Descarga/TagColor.js */ "./build.definitions/PatioCelulosaApp/Rules/Descarga/TagColor.js")
let patiocelulosaapp_rules_descarga_timeout_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Descarga/TimeOut.js */ "./build.definitions/PatioCelulosaApp/Rules/Descarga/TimeOut.js")
let patiocelulosaapp_rules_descarga_updatesuccess_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Descarga/UpdateSuccess.js */ "./build.definitions/PatioCelulosaApp/Rules/Descarga/UpdateSuccess.js")
let patiocelulosaapp_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/PatioCelulosaApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let patiocelulosaapp_rules_logging_loglevels_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Logging/LogLevels.js */ "./build.definitions/PatioCelulosaApp/Rules/Logging/LogLevels.js")
let patiocelulosaapp_rules_logging_settracecategories_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Logging/SetTraceCategories.js */ "./build.definitions/PatioCelulosaApp/Rules/Logging/SetTraceCategories.js")
let patiocelulosaapp_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/PatioCelulosaApp/Rules/Logging/SetUserLogLevel.js")
let patiocelulosaapp_rules_logging_togglelogging_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Logging/ToggleLogging.js */ "./build.definitions/PatioCelulosaApp/Rules/Logging/ToggleLogging.js")
let patiocelulosaapp_rules_logging_tracecategories_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Logging/TraceCategories.js */ "./build.definitions/PatioCelulosaApp/Rules/Logging/TraceCategories.js")
let patiocelulosaapp_rules_logging_userlogsetting_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Logging/UserLogSetting.js */ "./build.definitions/PatioCelulosaApp/Rules/Logging/UserLogSetting.js")
let patiocelulosaapp_rules_parametro_parametro_deleteconfirmation_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Parametro/Parametro_DeleteConfirmation.js */ "./build.definitions/PatioCelulosaApp/Rules/Parametro/Parametro_DeleteConfirmation.js")
let patiocelulosaapp_rules_recepcion_recepcion_deleteconfirmation_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Recepcion/Recepcion_DeleteConfirmation.js */ "./build.definitions/PatioCelulosaApp/Rules/Recepcion/Recepcion_DeleteConfirmation.js")
let patiocelulosaapp_rules_utils_js = __webpack_require__(/*! ./PatioCelulosaApp/Rules/Utils.js */ "./build.definitions/PatioCelulosaApp/Rules/Utils.js")
let patiocelulosaapp_services_patiocelulosa_destination_service = __webpack_require__(/*! ./PatioCelulosaApp/Services/PatioCelulosa_Destination.service */ "./build.definitions/PatioCelulosaApp/Services/PatioCelulosa_Destination.service")
let patiocelulosaapp_styles_styles_css = __webpack_require__(/*! ./PatioCelulosaApp/Styles/Styles.css */ "./build.definitions/PatioCelulosaApp/Styles/Styles.css")
let patiocelulosaapp_styles_styles_less = __webpack_require__(/*! ./PatioCelulosaApp/Styles/Styles.less */ "./build.definitions/PatioCelulosaApp/Styles/Styles.less")
let patiocelulosaapp_styles_styles_light_css = __webpack_require__(/*! ./PatioCelulosaApp/Styles/Styles.light.css */ "./build.definitions/PatioCelulosaApp/Styles/Styles.light.css")
let patiocelulosaapp_styles_styles_light_json = __webpack_require__(/*! ./PatioCelulosaApp/Styles/Styles.light.json */ "./build.definitions/PatioCelulosaApp/Styles/Styles.light.json")
let patiocelulosaapp_styles_styles_light_nss = __webpack_require__(/*! ./PatioCelulosaApp/Styles/Styles.light.nss */ "./build.definitions/PatioCelulosaApp/Styles/Styles.light.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	patiocelulosaapp_actions_application_appupdate_action : patiocelulosaapp_actions_application_appupdate_action,
	patiocelulosaapp_actions_application_appupdatefailuremessage_action : patiocelulosaapp_actions_application_appupdatefailuremessage_action,
	patiocelulosaapp_actions_application_appupdateprogressbanner_action : patiocelulosaapp_actions_application_appupdateprogressbanner_action,
	patiocelulosaapp_actions_application_appupdatesuccessmessage_action : patiocelulosaapp_actions_application_appupdatesuccessmessage_action,
	patiocelulosaapp_actions_application_logout_action : patiocelulosaapp_actions_application_logout_action,
	patiocelulosaapp_actions_application_navtoabout_action : patiocelulosaapp_actions_application_navtoabout_action,
	patiocelulosaapp_actions_application_navtoactivitylog_action : patiocelulosaapp_actions_application_navtoactivitylog_action,
	patiocelulosaapp_actions_application_navtosupport_action : patiocelulosaapp_actions_application_navtosupport_action,
	patiocelulosaapp_actions_application_onwillupdate_action : patiocelulosaapp_actions_application_onwillupdate_action,
	patiocelulosaapp_actions_application_reset_action : patiocelulosaapp_actions_application_reset_action,
	patiocelulosaapp_actions_application_resetmessage_action : patiocelulosaapp_actions_application_resetmessage_action,
	patiocelulosaapp_actions_application_usermenupopover_action : patiocelulosaapp_actions_application_usermenupopover_action,
	patiocelulosaapp_actions_closemodalpage_cancel_action : patiocelulosaapp_actions_closemodalpage_cancel_action,
	patiocelulosaapp_actions_closemodalpage_complete_action : patiocelulosaapp_actions_closemodalpage_complete_action,
	patiocelulosaapp_actions_closepage_action : patiocelulosaapp_actions_closepage_action,
	patiocelulosaapp_actions_createentityfailuremessage_action : patiocelulosaapp_actions_createentityfailuremessage_action,
	patiocelulosaapp_actions_createentitysuccessmessage_action : patiocelulosaapp_actions_createentitysuccessmessage_action,
	patiocelulosaapp_actions_deleteconfirmation_action : patiocelulosaapp_actions_deleteconfirmation_action,
	patiocelulosaapp_actions_deleteentityfailuremessage_action : patiocelulosaapp_actions_deleteentityfailuremessage_action,
	patiocelulosaapp_actions_deleteentitysuccessmessage_action : patiocelulosaapp_actions_deleteentitysuccessmessage_action,
	patiocelulosaapp_actions_descarga_apptimeoutdescarga_action : patiocelulosaapp_actions_descarga_apptimeoutdescarga_action,
	patiocelulosaapp_actions_descarga_appupdateprogressbanner1_action : patiocelulosaapp_actions_descarga_appupdateprogressbanner1_action,
	patiocelulosaapp_actions_descarga_bannerdescarga_action : patiocelulosaapp_actions_descarga_bannerdescarga_action,
	patiocelulosaapp_actions_descarga_descarga_createentity_action : patiocelulosaapp_actions_descarga_descarga_createentity_action,
	patiocelulosaapp_actions_descarga_descarga_deleteentity_action : patiocelulosaapp_actions_descarga_descarga_deleteentity_action,
	patiocelulosaapp_actions_descarga_descarga_updateentity2_action : patiocelulosaapp_actions_descarga_descarga_updateentity2_action,
	patiocelulosaapp_actions_descarga_descarga_updateentity_action : patiocelulosaapp_actions_descarga_descarga_updateentity_action,
	patiocelulosaapp_actions_descarga_navtodescarga_create_action : patiocelulosaapp_actions_descarga_navtodescarga_create_action,
	patiocelulosaapp_actions_descarga_navtodescarga_detail_action : patiocelulosaapp_actions_descarga_navtodescarga_detail_action,
	patiocelulosaapp_actions_descarga_navtodescarga_edit_action : patiocelulosaapp_actions_descarga_navtodescarga_edit_action,
	patiocelulosaapp_actions_descarga_navtodescarga_list_action : patiocelulosaapp_actions_descarga_navtodescarga_list_action,
	patiocelulosaapp_actions_descarga_navtodescarga_rumareal_action : patiocelulosaapp_actions_descarga_navtodescarga_rumareal_action,
	patiocelulosaapp_actions_descarga_progressbannerdescarga_action : patiocelulosaapp_actions_descarga_progressbannerdescarga_action,
	patiocelulosaapp_actions_errorarchive_errorarchive_syncfailure_action : patiocelulosaapp_actions_errorarchive_errorarchive_syncfailure_action,
	patiocelulosaapp_actions_errorarchive_navtoerrorarchive_detail_action : patiocelulosaapp_actions_errorarchive_navtoerrorarchive_detail_action,
	patiocelulosaapp_actions_errorarchive_navtoerrorarchive_list_action : patiocelulosaapp_actions_errorarchive_navtoerrorarchive_list_action,
	patiocelulosaapp_actions_genericbannermessage_action : patiocelulosaapp_actions_genericbannermessage_action,
	patiocelulosaapp_actions_genericmessagebox_action : patiocelulosaapp_actions_genericmessagebox_action,
	patiocelulosaapp_actions_genericnavigation_action : patiocelulosaapp_actions_genericnavigation_action,
	patiocelulosaapp_actions_generictoastmessage_action : patiocelulosaapp_actions_generictoastmessage_action,
	patiocelulosaapp_actions_logging_loguploadfailure_action : patiocelulosaapp_actions_logging_loguploadfailure_action,
	patiocelulosaapp_actions_logging_loguploadsuccessful_action : patiocelulosaapp_actions_logging_loguploadsuccessful_action,
	patiocelulosaapp_actions_logging_uploadlog_action : patiocelulosaapp_actions_logging_uploadlog_action,
	patiocelulosaapp_actions_logging_uploadlogprogress_action : patiocelulosaapp_actions_logging_uploadlogprogress_action,
	patiocelulosaapp_actions_parametro_navtoparametro_create_action : patiocelulosaapp_actions_parametro_navtoparametro_create_action,
	patiocelulosaapp_actions_parametro_navtoparametro_detail_action : patiocelulosaapp_actions_parametro_navtoparametro_detail_action,
	patiocelulosaapp_actions_parametro_navtoparametro_edit_action : patiocelulosaapp_actions_parametro_navtoparametro_edit_action,
	patiocelulosaapp_actions_parametro_navtoparametro_list_action : patiocelulosaapp_actions_parametro_navtoparametro_list_action,
	patiocelulosaapp_actions_parametro_parametro_createentity_action : patiocelulosaapp_actions_parametro_parametro_createentity_action,
	patiocelulosaapp_actions_parametro_parametro_deleteentity_action : patiocelulosaapp_actions_parametro_parametro_deleteentity_action,
	patiocelulosaapp_actions_parametro_parametro_updateentity_action : patiocelulosaapp_actions_parametro_parametro_updateentity_action,
	patiocelulosaapp_actions_recepcion_navtorecepcion_create_action : patiocelulosaapp_actions_recepcion_navtorecepcion_create_action,
	patiocelulosaapp_actions_recepcion_navtorecepcion_detail_action : patiocelulosaapp_actions_recepcion_navtorecepcion_detail_action,
	patiocelulosaapp_actions_recepcion_navtorecepcion_edit_action : patiocelulosaapp_actions_recepcion_navtorecepcion_edit_action,
	patiocelulosaapp_actions_recepcion_navtorecepcion_list_action : patiocelulosaapp_actions_recepcion_navtorecepcion_list_action,
	patiocelulosaapp_actions_recepcion_recepcion_createentity_action : patiocelulosaapp_actions_recepcion_recepcion_createentity_action,
	patiocelulosaapp_actions_recepcion_recepcion_deleteentity_action : patiocelulosaapp_actions_recepcion_recepcion_deleteentity_action,
	patiocelulosaapp_actions_recepcion_recepcion_updateentity_action : patiocelulosaapp_actions_recepcion_recepcion_updateentity_action,
	patiocelulosaapp_actions_service_closeoffline_action : patiocelulosaapp_actions_service_closeoffline_action,
	patiocelulosaapp_actions_service_closeofflinefailuremessage_action : patiocelulosaapp_actions_service_closeofflinefailuremessage_action,
	patiocelulosaapp_actions_service_closeofflinesuccessmessage_action : patiocelulosaapp_actions_service_closeofflinesuccessmessage_action,
	patiocelulosaapp_actions_service_downloadoffline_action : patiocelulosaapp_actions_service_downloadoffline_action,
	patiocelulosaapp_actions_service_downloadstartedmessage_action : patiocelulosaapp_actions_service_downloadstartedmessage_action,
	patiocelulosaapp_actions_service_initializeoffline_action : patiocelulosaapp_actions_service_initializeoffline_action,
	patiocelulosaapp_actions_service_initializeofflinefailuremessage_action : patiocelulosaapp_actions_service_initializeofflinefailuremessage_action,
	patiocelulosaapp_actions_service_initializeofflinesuccessmessage_action : patiocelulosaapp_actions_service_initializeofflinesuccessmessage_action,
	patiocelulosaapp_actions_service_syncfailuremessage_action : patiocelulosaapp_actions_service_syncfailuremessage_action,
	patiocelulosaapp_actions_service_syncstartedmessage_action : patiocelulosaapp_actions_service_syncstartedmessage_action,
	patiocelulosaapp_actions_service_uploadoffline_action : patiocelulosaapp_actions_service_uploadoffline_action,
	patiocelulosaapp_actions_updateentityfailuremessage_action : patiocelulosaapp_actions_updateentityfailuremessage_action,
	patiocelulosaapp_actions_updateentitysuccessmessage_action : patiocelulosaapp_actions_updateentitysuccessmessage_action,
	patiocelulosaapp_globals_application_appdefinition_version_global : patiocelulosaapp_globals_application_appdefinition_version_global,
	patiocelulosaapp_globals_application_applicationname_global : patiocelulosaapp_globals_application_applicationname_global,
	patiocelulosaapp_globals_application_supportemail_global : patiocelulosaapp_globals_application_supportemail_global,
	patiocelulosaapp_globals_application_supportphone_global : patiocelulosaapp_globals_application_supportphone_global,
	patiocelulosaapp_i18n_i18n_properties : patiocelulosaapp_i18n_i18n_properties,
	patiocelulosaapp_jsconfig_json : patiocelulosaapp_jsconfig_json,
	patiocelulosaapp_pages_application_about_page : patiocelulosaapp_pages_application_about_page,
	patiocelulosaapp_pages_application_support_page : patiocelulosaapp_pages_application_support_page,
	patiocelulosaapp_pages_application_useractivitylog_page : patiocelulosaapp_pages_application_useractivitylog_page,
	patiocelulosaapp_pages_descarga_cargar_list_page : patiocelulosaapp_pages_descarga_cargar_list_page,
	patiocelulosaapp_pages_descarga_descarga_create_page : patiocelulosaapp_pages_descarga_descarga_create_page,
	patiocelulosaapp_pages_descarga_descarga_detail2_page : patiocelulosaapp_pages_descarga_descarga_detail2_page,
	patiocelulosaapp_pages_descarga_descarga_detail_page : patiocelulosaapp_pages_descarga_descarga_detail_page,
	patiocelulosaapp_pages_descarga_descarga_edit_page : patiocelulosaapp_pages_descarga_descarga_edit_page,
	patiocelulosaapp_pages_descarga_descarga_list2_page : patiocelulosaapp_pages_descarga_descarga_list2_page,
	patiocelulosaapp_pages_descarga_descarga_list_page : patiocelulosaapp_pages_descarga_descarga_list_page,
	patiocelulosaapp_pages_descarga_descarga_rumareal_page : patiocelulosaapp_pages_descarga_descarga_rumareal_page,
	patiocelulosaapp_pages_errorarchive_errorarchive_detail_page : patiocelulosaapp_pages_errorarchive_errorarchive_detail_page,
	patiocelulosaapp_pages_errorarchive_errorarchive_list_page : patiocelulosaapp_pages_errorarchive_errorarchive_list_page,
	patiocelulosaapp_pages_main_page : patiocelulosaapp_pages_main_page,
	patiocelulosaapp_pages_mainbuttonnavigation_page : patiocelulosaapp_pages_mainbuttonnavigation_page,
	patiocelulosaapp_pages_parametro_parametro_create_page : patiocelulosaapp_pages_parametro_parametro_create_page,
	patiocelulosaapp_pages_parametro_parametro_detail_page : patiocelulosaapp_pages_parametro_parametro_detail_page,
	patiocelulosaapp_pages_parametro_parametro_edit_page : patiocelulosaapp_pages_parametro_parametro_edit_page,
	patiocelulosaapp_pages_parametro_parametro_list_page : patiocelulosaapp_pages_parametro_parametro_list_page,
	patiocelulosaapp_pages_recepcion_recepcion_create_page : patiocelulosaapp_pages_recepcion_recepcion_create_page,
	patiocelulosaapp_pages_recepcion_recepcion_detail_page : patiocelulosaapp_pages_recepcion_recepcion_detail_page,
	patiocelulosaapp_pages_recepcion_recepcion_edit_page : patiocelulosaapp_pages_recepcion_recepcion_edit_page,
	patiocelulosaapp_pages_recepcion_recepcion_list_page : patiocelulosaapp_pages_recepcion_recepcion_list_page,
	patiocelulosaapp_rules_application_appupdatefailure_js : patiocelulosaapp_rules_application_appupdatefailure_js,
	patiocelulosaapp_rules_application_appupdatesuccess_js : patiocelulosaapp_rules_application_appupdatesuccess_js,
	patiocelulosaapp_rules_application_clientismultiusermode_js : patiocelulosaapp_rules_application_clientismultiusermode_js,
	patiocelulosaapp_rules_application_getclientsupportversions_js : patiocelulosaapp_rules_application_getclientsupportversions_js,
	patiocelulosaapp_rules_application_getclientversion_js : patiocelulosaapp_rules_application_getclientversion_js,
	patiocelulosaapp_rules_application_onwillupdate_js : patiocelulosaapp_rules_application_onwillupdate_js,
	patiocelulosaapp_rules_application_resetappsettingsandlogout_js : patiocelulosaapp_rules_application_resetappsettingsandlogout_js,
	patiocelulosaapp_rules_descarga_cancelardescarga_js : patiocelulosaapp_rules_descarga_cancelardescarga_js,
	patiocelulosaapp_rules_descarga_descarga_deleteconfirmation_js : patiocelulosaapp_rules_descarga_descarga_deleteconfirmation_js,
	patiocelulosaapp_rules_descarga_findescarga_js : patiocelulosaapp_rules_descarga_findescarga_js,
	patiocelulosaapp_rules_descarga_iniciodescarga_js : patiocelulosaapp_rules_descarga_iniciodescarga_js,
	patiocelulosaapp_rules_descarga_onloadedpage_js : patiocelulosaapp_rules_descarga_onloadedpage_js,
	patiocelulosaapp_rules_descarga_tagcolor_js : patiocelulosaapp_rules_descarga_tagcolor_js,
	patiocelulosaapp_rules_descarga_timeout_js : patiocelulosaapp_rules_descarga_timeout_js,
	patiocelulosaapp_rules_descarga_updatesuccess_js : patiocelulosaapp_rules_descarga_updatesuccess_js,
	patiocelulosaapp_rules_errorarchive_errorarchive_checkforsyncerror_js : patiocelulosaapp_rules_errorarchive_errorarchive_checkforsyncerror_js,
	patiocelulosaapp_rules_logging_loglevels_js : patiocelulosaapp_rules_logging_loglevels_js,
	patiocelulosaapp_rules_logging_settracecategories_js : patiocelulosaapp_rules_logging_settracecategories_js,
	patiocelulosaapp_rules_logging_setuserloglevel_js : patiocelulosaapp_rules_logging_setuserloglevel_js,
	patiocelulosaapp_rules_logging_togglelogging_js : patiocelulosaapp_rules_logging_togglelogging_js,
	patiocelulosaapp_rules_logging_tracecategories_js : patiocelulosaapp_rules_logging_tracecategories_js,
	patiocelulosaapp_rules_logging_userlogsetting_js : patiocelulosaapp_rules_logging_userlogsetting_js,
	patiocelulosaapp_rules_parametro_parametro_deleteconfirmation_js : patiocelulosaapp_rules_parametro_parametro_deleteconfirmation_js,
	patiocelulosaapp_rules_recepcion_recepcion_deleteconfirmation_js : patiocelulosaapp_rules_recepcion_recepcion_deleteconfirmation_js,
	patiocelulosaapp_rules_utils_js : patiocelulosaapp_rules_utils_js,
	patiocelulosaapp_services_patiocelulosa_destination_service : patiocelulosaapp_services_patiocelulosa_destination_service,
	patiocelulosaapp_styles_styles_css : patiocelulosaapp_styles_styles_css,
	patiocelulosaapp_styles_styles_less : patiocelulosaapp_styles_styles_less,
	patiocelulosaapp_styles_styles_light_css : patiocelulosaapp_styles_styles_light_css,
	patiocelulosaapp_styles_styles_light_json : patiocelulosaapp_styles_styles_light_json,
	patiocelulosaapp_styles_styles_light_nss : patiocelulosaapp_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "webpack/container/entry/bundle.js":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	".": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./build.definitions/application-index.js */ "./build.definitions/application-index.js")))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope) => {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/Styles/Styles.light.json":
/*!*********************************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/Styles/Styles.light.json ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"StyleStaticKeyItem":{"font-size":"large","font-weight":"bold","font-color":"lightcoral"}}');

/***/ }),

/***/ "./build.definitions/PatioCelulosaApp/jsconfig.json":
/*!**********************************************************!*\
  !*** ./build.definitions/PatioCelulosaApp/jsconfig.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = undefined;
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/bundle.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;