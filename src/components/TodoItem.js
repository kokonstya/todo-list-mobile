import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import CustomButton from "./ui/CustomButton";
import {CheckBox} from 'react-native-elements'

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
                              containerStyle={{margin: 0, padding: 0}}
                              onPress={() => toggleProperty('done', todo.id)}
                    />
                    <Text style={{...styles.title, ...importantStyle}}>{todo.title} - {todo.id}</Text>
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
        borderRadius: 10
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }

})

export default TodoItem;
