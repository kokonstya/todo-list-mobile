import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert, CheckBox} from 'react-native';

import CustomButton from "./src/components/ui/CustomButton";
import TodoItem from "./src/components/TodoItem";
import TodoRosterItem from "./src/components/TodoRosterItem";
import AddForm from "./src/components/AddForm";
import {FontAwesome} from "@expo/vector-icons";
import AddModal from "./src/components/AddModal";
import EditModal from "./src/components/EditModal";


const data = {
    todoLists: [
        {
            id: 1, title: 'todoList 1',
            todos: [{id: 1, title: 'todo 1-1', important: false, done: false},
                {id: 2, title: 'todo 1-2', important: false, done: true},
                {id: 3, title: 'todo 1-3', important: false, done: false}]
        },
        {
            id: 2, title: 'todoList 2',
            todos: [{id: 1, title: 'todo 2-1', important: false, done: false},
                {id: 2, title: 'todo 2-2', important: false, done: true},
                {id: 3, title: 'todo 2-3', important: false, done: false}]
        },
        {
            id: 3, title: 'todoList 3',
            todos: [{id: 1, title: 'todo 3-1', important: false, done: false},
                {id: 2, title: 'todo 3-2', important: false, done: true},
                {id: 3, title: 'todo 3-3', important: false, done: false}]
        },
        {
            id: 4, title: 'todoList 4',
            todos: [{id: 1, title: 'todo 4-1', important: false, done: false},
                {id: 2, title: 'todo 4-2', important: false, done: false},
                {id: 3, title: 'todo 4-3', important: false, done: false}]
        }]
}

export default function App() {
    const [currentTodoRoster, setCurrentTodoRoster] = useState(null);
    const [state, setState] = useState(data.todoLists)

    const getId = (arr) => {
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
            `Вы уверены, что хотите удалить "${list.title} ${list.id}"?`,
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

    const addTodo = (title) => {
        const currentTodoRosterIndex = state.findIndex((todoList) => todoList.id === currentTodoRoster)
        const oldRoster = state[currentTodoRosterIndex];
        const newRoster = {
            ...oldRoster, todos: [...oldRoster.todos, {
                id: getId(oldRoster.todos),
                title,
                important: false,
                done: false
            }]
        }
        setState(prevState => [
            ...prevState.slice(0, currentTodoRosterIndex),
            newRoster,
            ...prevState.slice(currentTodoRosterIndex + 1)
        ])
    }
    const deleteTodo = (id) => {
        const currentTodoRosterIndex = state.findIndex((todoList) => todoList.id === currentTodoRoster)
        const todo = state[currentTodoRosterIndex].todos.find(item => item.id === id)
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить "${todo.title} ${todo.id}"?`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                        const oldRoster = state[currentTodoRosterIndex];
                        const newRoster = {
                            ...oldRoster, todos: [...oldRoster.todos.filter(todo => todo.id !== id)]
                        }
                        setState(prevState => [
                            ...prevState.slice(0, currentTodoRosterIndex),
                            newRoster,
                            ...prevState.slice(currentTodoRosterIndex + 1)
                        ])
                    }
                }
            ],
            {cancelable: true}
        )

    }

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
    const updateTodo = (id, title, important) => {
        console.log('success')
        const currentTodoRosterIndex = state.findIndex((todoList) => todoList.id === currentTodoRoster)
        const oldTodo = state[currentTodoRosterIndex].todos.find(item => item.id === id)
        const currentTodoIndex = state[currentTodoRosterIndex].todos.findIndex(item => item.id === oldTodo.id)
        const oldRoster = state[currentTodoRosterIndex];
        const newTodo = {...oldTodo, title, important}
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
    const openEdit = (todo) => {
        setEditModal({visible: true, func: updateTodo, value: todo})
    }
    let todos
    if (!currentTodoRoster) {
        todos = <Text>Выберите список дел</Text>;
    } else {
        const currentTodoRosterIndex = state.findIndex((todoList) => todoList.id === currentTodoRoster)
        todos = state[currentTodoRosterIndex].todos.map((todo) => <TodoItem key={todo.id} todo={todo}
                                                                            toggleProperty={toggleProperty}
                                                                            deleteTodo={deleteTodo}
                                                                            openEdit={openEdit}/>)
    }
    const [addModal, setAddModal] = useState({
        visible: false, value: '', func: function () {
        }
    })
    const [editModal, setEditModal] = useState({
        visible: false, value: {}, func: function () {
        }
    })


    return (
        <View style={styles.container}>
            <AddModal visible={addModal.visible} onSave={addModal.func}
                      onCancel={() => setAddModal({...addModal, visible: false})}/>
            <EditModal visible={editModal.visible} onSave={editModal.func} value={editModal.value}
                       onCancel={() => setEditModal({...editModal, visible: false})}/>
            <ScrollView style={styles.todoLists}>
                {state.map((todoList) => <TodoRosterItem key={todoList.id} deleteTodoRoster={deleteTodoRoster}
                                                         todoRoster={todoList}
                                                         onPress={() => setCurrentTodoRoster(todoList.id)}/>)}
                <CustomButton onPress={() => setAddModal({visible: true, func: addTodoRoster})}>
                    <FontAwesome name="plus" size={24} color="green"/>
                </CustomButton>
            </ScrollView>
            <ScrollView style={styles.todoItems}>
                {todos}
                {currentTodoRoster ?
                    <CustomButton onPress={() => setAddModal({visible: true, func: addTodo})}>
                        <FontAwesome name="plus" size={24} color="green"/>
                    </CustomButton> : null}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoLists: {
        height: '40%',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 3,
        borderColor: 'gray',
        marginBottom: 10
    },
    todoItems: {
        width: '100%',
        height: '40%',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 3,
        borderColor: 'gray'
    },
    text: {
        fontSize: 20
    }
});
