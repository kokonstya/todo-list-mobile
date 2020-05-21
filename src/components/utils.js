import {Alert} from "react-native";

export const getId = (arr) => {
    let newId;
    newId = Math.floor(Math.random() * 100);
    const search = arr.some((item) => item.id === newId);
    if (arr.length >= 95) {
        return 0;
    }
    if (search) {
        return getId(arr);
    } else {
        return newId;
    }
};

export const getDate = (timeInMs) => {
    const date = new Date(timeInMs);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = (month < 10) ? '0' + month : month;
    let day = date.getDate();
    day = (day < 10) ? '0' + day : day;
    let hours = date.getHours();
    hours = (hours < 10) ? '0' + hours : hours;
    let minute = date.getMinutes();
    minute = (minute < 10) ? '0' + minute : minute;
    return `${day}.${month}.${year} ${hours}:${minute}`
};

export const checkBeforeSubmit = (onSave, onCancel, setTitle, value, currentTodoRosterIndex, currentTodoRosterTitle ,title) => {
    if (value === 'todoRoster') {
        if (title.trim().length < 1) {
            Alert.alert(
                'Ошибка!',
                `Минимальная длина названия списка дел 1 символ.`
            )
        } else if (title.length >= 30) {
            Alert.alert(
                'Ошибка!',
                `Максимальная длина названия списка дел 30 символов. Сейчас ${
                    title.length
                } символов.`
            )
        } else if (state.some((item) => item.title === title.trim())) {
            Alert.alert(
                'Ошибка!',
                `Список дел "${title}" уже существует!`
            )
        } else {
            onSave(title.trim())
            onCancel()
            setTitle('')
        }
    } else {
        if (title.trim().length < 1) {
            Alert.alert(
                'Ошибка!',
                `Минимальная длина названия дела 1 символ.`
            )
        } else if (title.length >= 30) {
            Alert.alert(
                'Ошибка!',
                `Максимальная длина названия дела 30 символов. Сейчас ${
                    title.length
                } символов.`
            )
        } else if (state[currentTodoRosterIndex].todos.some((item) => item.title === title.trim())) {
            Alert.alert(
                'Ошибка!',
                `Дело "${title}" уже существует в списке ${currentTodoRosterTitle}`
            )
        } else {
            onSave(title.trim())
            onCancel()
            setTitle('')
        }
    }
}
