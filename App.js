import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert, CheckBox} from 'react-native';

import CustomButton from "./src/components/ui/CustomButton";
import TodoItem from "./src/components/TodoItem";
import TodoRosterItem from "./src/components/TodoRosterItem";
import {FontAwesome} from "@expo/vector-icons";
import AddModal from "./src/components/AddModal";
import EditModal from "./src/components/EditModal";

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

const data = {
    todoLists: [
        {
            id: 1, title: 'todoList 1',
            todos: [{id: 1, title: 'todo 1-1', date: 1589989334590, important: false, done: false},
                {id: 2, title: 'todo 1-2', date: 1589981334590, important: false, done: true},
                {id: 3, title: 'todo 1-3', date: 1589983334590, important: false, done: false}]
        },
        {
            id: 2, title: 'todoList 2',
            todos: [{id: 1, title: 'todo 2-1', date: 1584929334590, important: false, done: false},
                {id: 2, title: 'todo 2-2', date: 1585989334590, important: false, done: true},
                {id: 3, title: 'todo 2-3', date: 1586989334590, important: false, done: false}]
        },
        {
            id: 3, title: 'todoList 3',
            todos: [{id: 1, title: 'todo 3-1', date: 1589489334590, important: false, done: false},
                {id: 2, title: 'todo 3-2', date: 1589589334590, important: false, done: true},
                {id: 3, title: 'todo 3-3', date: 1589689334590, important: false, done: false}]
        },
        {
            id: 4, title: 'todoList 4',
            todos: [{id: 1, title: 'todo 4-1', date: 1589089334590, important: false, done: false},
                {id: 2, title: 'todo 4-2', date: 1589189334590, important: false, done: false},
                {id: 3, title: 'todo 4-3', date: 1589289334590, important: false, done: false}]
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
                done: false,
                date: Date.now()
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
    const openTodoEdit = (todo) => {
        setEditModal({visible: true, func: updateTodo, value: todo})
    }

    const openTodoRosterEdit = (todoRoster) => {
        setEditModal({visible: true, func: updateTodoRoster, value: todoRoster})
    }
    let currentTodoRosterTitle;
    if (currentTodoRoster) {
        currentTodoRosterTitle = state.find(item => item.id === currentTodoRoster).title;
    }
    let todos
    if (!currentTodoRoster) {
        todos = <Text>Выберите список дел</Text>;
    } else {
        const currentTodoRosterIndex = state.findIndex((todoList) => todoList.id === currentTodoRoster)
        todos = state[currentTodoRosterIndex].todos.map((todo) => <TodoItem key={todo.id} todo={todo}
                                                                            toggleProperty={toggleProperty}
                                                                            deleteTodo={deleteTodo}
                                                                            openEdit={openTodoEdit}/>)
    }
    const [addModal, setAddModal] = useState({
        visible: false, value: '', func: function () {
        }
    })
    const [editModal, setEditModal] = useState({
        visible: false, value: {}, func: function () {
        }
    })
    const [filterValue, setFilterValue] = useState('all')

    return (
        <View style={styles.container}>
            <AddModal visible={addModal.visible} onSave={addModal.func} value={addModal.value}
                      currentTodoRosterTitle={currentTodoRosterTitle}
                      onCancel={() => setAddModal({...addModal, visible: false})}/>
            <EditModal visible={editModal.visible} onSave={editModal.func} value={editModal.value}
                       onCancel={() => setEditModal({...editModal, visible: false})}/>
            <View style={styles.buttonGroup}>
                <CustomButton onPress={() => setFilterValue('all')}>
                    Все
                </CustomButton>
                <CustomButton onPress={() => setFilterValue('active')}>
                    Неисполненные
                </CustomButton>
                <CustomButton onPress={() => setFilterValue('done')}>
                    Исполненные
                </CustomButton>
            </View>
            <ScrollView style={styles.todoLists}>

                {filter(state, filterValue).sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                }).map((todoList) => {
                    let style = '';
                    if (todoList.id === currentTodoRoster) {
                        style = 'current';
                    }
                    if (todoList.todos.every((item) => item.done === true) && todoList.todos.length !== 0) {
                        style += '_done';
                    } else if (todoList.todos.some((item) => item.done === false)) {
                        style += '_active';
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
            <ScrollView style={styles.todoItems}>
                {todos}
                {currentTodoRoster ?
                    <CustomButton onPress={() => setAddModal({visible: true, func: addTodo, value: 'todo'})}>
                        <FontAwesome name="plus" size={24} color="green"/>
                    </CustomButton> : null}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        padding: 10,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    todoItems: {
        width: '100%',
        height: '40%',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 3,
        borderColor: 'gray',
        padding: 5

    },
    text: {
        fontSize: 20
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});
