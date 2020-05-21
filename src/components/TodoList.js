import React from 'react'
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import CustomButton from "./ui/CustomButton";
import {FontAwesome} from "@expo/vector-icons";
import TodoItem from "./TodoItem";

const TodoList = ({ currentTodoRoster, state, openTodoEdit, deleteTodo, setAddModal, addTodo, setState  }) => {
    const toggleProperty = (property, id) => {
        const currentTodoRosterIndex = state.findIndex((todoList) => todoList.id === currentTodoRoster)
        const oldTodo = state[currentTodoRosterIndex].todos.find(item => item.id === id)
        const currentTodoIndex = state[currentTodoRosterIndex].todos.findIndex(item => item.id === oldTodo.id)
        const oldRoster = state[currentTodoRosterIndex];
        const newTodo = {...oldTodo, [property]: !oldTodo[property]}
        const newRosterTodos = [
            ...oldRoster.todos.slice(0, currentTodoIndex),
            newTodo,
            ...oldRoster.todos.slice(currentTodoIndex + 1)
        ]
        const newRoster = {...oldRoster, todos: newRosterTodos}
        setState(prevState => [
            ...prevState.slice(0, currentTodoRosterIndex),
            newRoster,
            ...prevState.slice(currentTodoRosterIndex + 1)
        ])
    }
    let todos;
    if (!currentTodoRoster) {
        todos = <Text>Выберите список дел</Text>;
    } else {
        const currentTodoRosterIndex = state.findIndex((todoList) => todoList.id === currentTodoRoster)
        todos = state[currentTodoRosterIndex].todos.map((todo) => <TodoItem key={todo.id} todo={todo}
                                                                            toggleProperty={toggleProperty}
                                                                            deleteTodo={deleteTodo}
                                                                            openEdit={openTodoEdit}/>)
    }
    return (
        <ScrollView style={styles.todoItems}>
            {todos}
            {currentTodoRoster ?
                <CustomButton onPress={() => setAddModal({visible: true, func: addTodo, value: 'todo'})}>
                    <FontAwesome name="plus" size={24} color="green"/>
                </CustomButton> : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    todoItems: {
        paddingBottom: 15,
        width: '100%',
        height: '40%',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 3,
        borderColor: 'gray',
        padding: 5
    },
})

export default TodoList;
