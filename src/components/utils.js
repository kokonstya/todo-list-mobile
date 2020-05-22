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
