import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import EditModal from "./src/components/EditModal";
import TodoRosterList from "./src/components/TodoRosterList";
import TodoList from "./src/components/TodoList";
import ButtonGroup from "./src/components/ButtonGroup";

import {getId} from "./src/components/utils";

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
    const updateTodo = (id, title, important) => {
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
    const addTodo = (title, important) => {
        const currentTodoRosterIndex = state.findIndex((todoList) => todoList.id === currentTodoRoster)
        const oldRoster = state[currentTodoRosterIndex];
        const newRoster = {
            ...oldRoster, todos: [...oldRoster.todos, {
                id: getId(oldRoster.todos),
                title,
                important,
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
            `Вы уверены, что хотите удалить "${todo.title}"?`,
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
    const openTodoEdit = (todo) => {
        setEditModal({visible: true, func: updateTodo, value: todo})
    }

    const openTodoRosterEdit = (todoRoster) => {
        setEditModal({visible: true, func: updateTodoRoster, value: todoRoster})
    }
    const openTodoEditAdd = (todo) => {
        setEditModal({visible: true, func: addTodo, value: 'todo'})
    }

    const openTodoRosterEditAdd = (todoRoster) => {
        setEditModal({visible: true, func: addTodoRoster, value: 'todoRoster'})
    }

    let currentTodoRosterTitle;
    if (currentTodoRoster) {
        currentTodoRosterTitle = state.find(item => item.id === currentTodoRoster).title;
    }

    const [editModal, setEditModal] = useState({
        visible: false, value: '', func: () => {
        }
    })
    const [filterValue, setFilterValue] = useState('all')
    let filterAll, filterActive, filterDone;
    if (filterValue === 'all') {
        filterAll = '#DDDD00'
    } else if (filterValue === 'active') {
        filterActive = '#DDDD00'
    } else if (filterValue === 'done') {
        filterDone = '#DDDD00'
    }

    return (
        <View style={styles.container}>
            <EditModal state={state} visible={editModal.visible} onSave={editModal.func} value={editModal.value}
                       currentTodoRosterTitle={currentTodoRosterTitle}
                       onCancel={() => setEditModal({...editModal, visible: false})}/>
            <ButtonGroup filterActive={filterActive} filterAll={filterAll} filterDone={filterDone}
                         setFilterValue={setFilterValue}/>
            <TodoRosterList currentTodoRoster={currentTodoRoster}
                            filterValue={filterValue}
                            setState={setState} state={state}
                            setCurrentTodoRoster={setCurrentTodoRoster}
                            openTodoRosterEditAdd={openTodoRosterEditAdd}
                            openTodoRosterEdit={openTodoRosterEdit}/>
            <TodoList currentTodoRoster={currentTodoRoster}
                      state={state} openTodoEdit={openTodoEdit} deleteTodo={deleteTodo}
                      setState={setState} openTodoEditAdd={openTodoEditAdd} addTodo={addTodo}/>
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
    text: {
        fontSize: 20
    },
});
