
export default class Utils {

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

    static ConvertirHoraAMinutos = async (hora) => {
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
    }
}
