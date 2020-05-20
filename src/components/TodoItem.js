import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import CustomButton from "./ui/CustomButton";
import {CheckBox} from 'react-native-elements'

const getDate = (timeInMs) => {
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

const TodoItem = ({todo, deleteTodo, openEdit, toggleProperty}) => {
    let importantStyle;
    if (todo.important) {
        importantStyle = {
            fontWeight: 'bold',
            color: 'red'
        }
    } else {
        importantStyle = {}
    }

    return (
        <TouchableWithoutFeedback onLongPress={() => toggleProperty('important', todo.id)}>
            <View style={styles.todo}>
                <View style={styles.content}>
                    <CheckBox checked={todo.done} size={30} checkedColor={'green'}
                              containerStyle={{margin: 0, padding: 0, justifyContent: 'center',}}
                              onPress={() => toggleProperty('done', todo.id)}
                    />
                    <View style={styles.text}>
                    <Text style={{...styles.title, ...importantStyle}}>{todo.title}</Text>
                    <Text style={styles.date}>{getDate(todo.date)}</Text>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <CustomButton onPress={() => openEdit(todo)}>
                        <FontAwesome name="edit" size={20} color="blue"/>
                    </CustomButton>
                    <CustomButton onPress={() => deleteTodo(todo.id)}>
                        <FontAwesome name="remove" size={20} color="red"/>
                    </CustomButton>

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    text: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: 200,
        marginLeft: -15
    },
    title: {
        fontSize: 20
    },
    date: {
        fontSize: 12,
    },
    buttons: {
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }

})

export default TodoItem;
