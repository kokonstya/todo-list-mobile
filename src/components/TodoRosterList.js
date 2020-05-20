import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native'
import TodoRosterItem from "./TodoRosterItem";
import CustomButton from "./ui/CustomButton";
import {FontAwesome} from "@expo/vector-icons";
import {getId} from "./utils";

const filter = (items, filter) => {
    switch (filter) {
        case 'all':
            return items;
        case 'active':
            return items.filter((list) => list.todos.some((todo) => todo.done === false));
        case 'done':
            return items.filter((list) => list.todos.every((todo) => todo.done === true));
        default:
            return items;
    }
};



const TodoRosterList = ({ state, currentTodoRoster, filterValue, setState,
                            setCurrentTodoRoster, setAddModal, openTodoRosterEdit }) => {
    const updateTodoRoster = (id, title) => {
        const oldRosterIndex = state.findIndex((todoList) => todoList.id === id)
        const oldRoster = state[oldRosterIndex];
        const newRoster = {
            ...oldRoster,
            title,
        }
        setState(prevState => [
            ...prevState.slice(0, oldRosterIndex),
            newRoster,
            ...prevState.slice(oldRosterIndex + 1)
        ])
    }
    const addTodoRoster = (title) => {
        setState(prevState => [
            ...prevState,
            {
                id: getId(state).toString(),
                title,
                todos: []
            }
        ])
    }
    const deleteTodoRoster = (id) => {
        const list = state.find(item => item.id === id)
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить "${list.title}"?`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                        if (currentTodoRoster === id) {
                            setCurrentTodoRoster(null)
                        }
                        setState(prev => prev.filter(list => list.id !== id))
                    }
                }
            ],
            {cancelable: true}
        )

    }
    return (
        <ScrollView style={styles.todoLists}>

            {filter(state, filterValue).sort(function (a, b) {
                return a.title.localeCompare(b.title);
            }).map((todoList) => {
                let style = '';
                if (todoList.id === currentTodoRoster) {
                    style += '_current';
                }
                if (todoList.todos.every((item) => item.done === true) && todoList.todos.length !== 0) {
                    style += '_done';
                } else if (todoList.todos.some((item) => item.done === false)) {
                    style += '_active';
                } else {
                    style += '_default'
                }

                return (<TodoRosterItem key={todoList.id} deleteTodoRoster={deleteTodoRoster}
                                        todoRoster={todoList} openEdit={openTodoRosterEdit}
                                        style={style}
                                        onPress={() => setCurrentTodoRoster(todoList.id)}/>)
            })}
            <CustomButton onPress={() => setAddModal({visible: true, func: addTodoRoster, value: 'todoRoster'})}>
                <FontAwesome name="plus" size={24} color="green"/>
            </CustomButton>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    todoLists: {
        height: 250,
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 3,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 5
    },
})

export default TodoRosterList;
