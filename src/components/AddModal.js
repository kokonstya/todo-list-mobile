import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Text, Modal, Alert} from 'react-native'
import CustomButton from "./ui/CustomButton";


const AddModal = ({ state, visible, onCancel, onSave, value, currentTodoRosterTitle}) => {
    const currentTodoRosterIndex = state.findIndex((todoList) => todoList.title === currentTodoRosterTitle)

    const [title, setTitle] = useState('')
    let text;
    if (value === 'todoRoster') {
        text = 'Добавить новый список дел'
    } else if (value === 'todo') {
        text = `Добавить новое дело в список ${currentTodoRosterTitle}`
    } else {
        text = 'Добавить'
    }
    const saveHandler = () => {
        if (value === 'todoRoster') {
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
                onSave(title.trim())
                onCancel()
                setTitle('')
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
                onSave(title.trim())
                onCancel()
                setTitle('')
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
                    maxLength={30}
                />
                <View style={styles.buttons}>
                    <CustomButton onPress={()=>{onCancel();setTitle('')}} color={'red'}>Отменить</CustomButton>
                    <CustomButton onPress={saveHandler} color={'green'}>Сохранить</CustomButton>
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
        width: '80%'
    },
    text: {
        width: '70%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default AddModal;
