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

