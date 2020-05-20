import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const TodoList = ({  }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
        >
            <View style={styles.todoList}>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todoList: {

    }
})

export default TodoList;
