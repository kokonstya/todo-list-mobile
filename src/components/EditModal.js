import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TextInput, Text, Modal, Alert} from 'react-native'
import CustomButton from "./ui/CustomButton";
import {CheckBox} from 'react-native-elements'

const EditModal = ({state, visible, onCancel, value, onSave, currentTodoRosterTitle}) => {
    const [title, setTitle] = useState('')
    const [important, setImportant] = useState(false)

    let currentTodoRosterIndex;
    if (currentTodoRosterTitle) {
        currentTodoRosterIndex = state.findIndex((todoList) => todoList.title === currentTodoRosterTitle)
    } else {
        currentTodoRosterIndex = 0
    }

    useEffect(() => {
        setTitle(value.title)
        setImportant(value.important)
    }, [value])

    let text;
    if (value === 'todoRoster') {
        text = 'Добавить новый список дел'
    } else if (value === 'todo') {
        text = `Добавить новое дело в список ${currentTodoRosterTitle}`
    } else if (value.todos) {
        text = 'Изменить список дел'
    } else {
        text = 'Изменить дело'
    }

    const saveHandler = () => {
        if (value === 'todoRoster' || value.todos) {
            if (title.trim().length < 1) {
                Alert.alert(
                    'Ошибка!',
                    `Минимальная длина названия списка дел 1 символ.`
                )
            } else if (title.length >= 30) {
                Alert.alert(
                    'Ошибка!',
                    `Максимальная длина названия списка дел 30 символов. Сейчас ${
                        title.length
                    } символов.`
                )
            } else if (state.some((item) => item.title === title.trim())) {
                Alert.alert(
                    'Ошибка!',
                    `Список дел "${title}" уже существует!`
                )
            } else {
                if (value === 'todoRoster') {
                    onSave(title)
                    onCancel()
                    setTitle('')
                } else {
                    onSave(value.id, title)
                    onCancel()
                    setTitle('')
                }
            }
        } else {
            if (title.trim().length < 1) {
                Alert.alert(
                    'Ошибка!',
                    `Минимальная длина названия дела 1 символ.`
                )
            } else if (title.length >= 30) {
                Alert.alert(
                    'Ошибка!',
                    `Максимальная длина названия дела 30 символов. Сейчас ${
                        title.length
                    } символов.`
                )
            } else if (state[currentTodoRosterIndex].todos.some((item) => item.title === title.trim())) {
                Alert.alert(
                    'Ошибка!',
                    `Дело "${title}" уже существует в списке ${currentTodoRosterTitle}`
                )
            } else {
                if (value === 'todo') {
                    onSave(title, important)
                    onCancel()
                    setTitle('')
                    setImportant(false)
                } else {
                    onSave(value.id, title, important)
                    onCancel()
                    setTitle('')
                }
            }
        }

    }

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                <Text style={styles.text}>{text}</Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder='Введите название'
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                {value.todos || value === 'todoRoster' ? null : <>
                    <Text style={styles.importantText}>Срочно?</Text>
                    <CheckBox checked={important} size={40} checkedColor={'green'}
                              containerStyle={{margin: 0, padding: 0}}
                              onPress={() => setImportant(!important)}/>
                </>
                }

                <View style={styles.buttons}>
                    <CustomButton onPress={() => {
                        onCancel();
                        setTitle('')
                    }}>Отменить</CustomButton>
                    <CustomButton onPress={saveHandler}>Сохранить</CustomButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        borderBottomWidth: 2,
        width: '80%',
        fontSize: 20
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    importantText: {
        margin: 10,
        fontSize: 20
    },
    text: {
        fontSize: 15
    }
})

export default EditModal;
