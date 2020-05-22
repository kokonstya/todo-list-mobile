import React from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import CustomButton from "./ui/CustomButton";

const TodoRosterItem = ({todoRoster, onPress, deleteTodoRoster, openEdit, style}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{...styles.todoRoster, ...styles[style]}}>
                <Text style={{...styles.title, ...styles[`title${style}`]}}>{todoRoster.title}</Text>
                <View style={styles.buttons}>
                    <CustomButton onPress={() => openEdit(todoRoster)}>
                        <FontAwesome name="edit" size={20} color="blue"/>
                    </CustomButton>
                    <CustomButton onPress={() => deleteTodoRoster(todoRoster.id)}>
                        <FontAwesome name="remove" size={20} color="red"/>
                    </CustomButton>
                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    todoRoster: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10
    },
    title: {
        width: '65%',
        fontSize: 20,
    },
    title_current_default: {
        fontWeight: 'bold'
    },
    title_current_active: {
        fontWeight: 'bold'
    },
    title_current_done: {
        fontWeight: 'bold'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    _current_active: {
        borderStyle: 'solid',
        borderWidth: 4,
        backgroundColor: '#33FA33',
    },
    _current_done: {
        borderStyle: 'solid',
        borderWidth: 4,
        backgroundColor: '#aaa',
    },
    _current_default: {
        borderStyle: 'solid',
        borderWidth: 4,
        backgroundColor: '#fff',
    },
    _active: {
        backgroundColor: '#33FA33'
    },
    _done: {
        backgroundColor: '#aaa'
    }

})

export default TodoRosterItem;
