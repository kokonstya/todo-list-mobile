import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import CustomButton from "./ui/CustomButton";

const TodoItem = ({todo, deleteTodo}) => {
    return (

        <View style={styles.todo}>
            <Text style={styles.title}>{todo.title} - {todo.id}</Text>
            <View style={styles.buttons}>
                <CustomButton color={'yellow'}>
                    <FontAwesome name="edit" size={20} color="black"/>
                </CustomButton>
                <CustomButton color={'green'} onPress={() => deleteTodo(todo.id)}>
                    <FontAwesome name="remove" size={20} color="black"/>
                </CustomButton>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    todo: {
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
        fontSize: 20

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }

})

export default TodoItem;
