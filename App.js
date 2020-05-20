import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Alert, CheckBox} from 'react-native';

import CustomButton from "./src/components/ui/CustomButton";
import TodoItem from "./src/components/TodoItem";
import TodoRosterItem from "./src/components/TodoRosterItem";
import AddForm from "./src/components/AddForm";


const data = {
    todoLists: [
        {
            id: 1, title: 'todoList 1',
            todos: [{id: 1, title: 'todo 1-1'}, {id: 2, title: 'todo 1-2'}, {id: 3, title: 'todo 1-3'}]
        },
        {
            id: 2, title: 'todoList 2',
            todos: [{id: 1, title: 'todo 2-1'}, {id: 2, title: 'todo 2-2'}, {id: 3, title: 'todo 2-3'}]
        },
        {
            id: 3, title: 'todoList 3',
            todos: [{id: 1, title: 'todo 3-1'}, {id: 2, title: 'todo 3-2'}, {id: 3, title: 'todo 3-3'}]
        },
        {
            id: 4, title: 'todoList 4',
            todos: [{id: 1, title: 'todo 4-1'}, {id: 2, title: 'todo 4-2'}, {id: 3, title: 'todo 4-3'}]
        },
        {
            id: 5, title: 'todoList 5',
            todos: [{id: 1, title: 'todo 5-1'}, {id: 2, title: 'todo 5-2'}, {id: 3, title: 'todo 5-3'}]
        },
        {
            id: 6, title: 'todoList 6',
            todos: [{id: 1, title: 'todo 6-1'}, {id: 2, title: 'todo 6-2'}, {id: 3, title: 'todo 6-3'}]
        },
        {
            id: 7, title: 'todoList 7',
            todos: [{id: 1, title: 'todo 7-1'}, {id: 2, title: 'todo 7-2'}, {id: 3, title: 'todo 7-3'}]
        },
        {
            id: 8, title: 'todoList 8',
            todos: [{id: 1, title: 'todo 8-1'}, {id: 2, title: 'todo 8-2'}, {id: 3, title: 'todo 8-3'}]
        },
        {
            id: 9, title: 'todoList 9',
            todos: [{id: 1, title: 'todo 9-1'}, {id: 2, title: 'todo 9-2'}, {id: 3, title: 'todo 9-3'}]
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
                title
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

    let todos
    if (!currentTodoRoster) {
        todos = <Text>Выберите список дел</Text>;
    } else {
        const currentTodoRosterIndex = state.findIndex((todoList) => todoList.id === currentTodoRoster)
        todos = state[currentTodoRosterIndex].todos.map((todo) => <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo}/>)
    }
    const [checkbox, setCheckbox] = useState(false)
    return (
        <View style={styles.container}>
            <ScrollView style={styles.todoLists}>
                <CheckBox value={checkbox} onChange={()=>setCheckbox((prevState) => !prevState)}/>
                {state.map((todoList) => <TodoRosterItem key={todoList.id} deleteTodoRoster={deleteTodoRoster}
                                                         todoRoster={todoList}
                                                         onPress={() => setCurrentTodoRoster(todoList.id)}/>)}
                <AddForm onSubmit={addTodoRoster} />
            </ScrollView>
            <ScrollView style={styles.todoItems}>
                {todos}
                <AddForm onSubmit={addTodo} />
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
        height: '45%',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 3,
        borderColor: 'gray'
    },
    todoItems: {
        width: '100%',
        height: 300,
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 3,
        borderColor: 'gray'
    },
    text: {
        fontSize: 20
    }
});
