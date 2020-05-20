import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, Modal, Alert } from 'react-native'
import CustomButton from "./ui/CustomButton";

const AddModal = ({ visible, onCancel, onSave, value, currentTodoRosterTitle }) => {
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
        if (title.trim().length < 3) {
            Alert.alert(
                'Ошибка!',
                `Минимальная длинна названия 3 символа. Сейчас ${
                    title.trim().length
                } символов.`
            )
        } else {
            onSave(title)
            onCancel()
            setTitle('')
        }
    }

    return (
        <Modal visible={visible} animationType='slide' transparent={false}>
            <View style={styles.wrap}>
                <Text>{text}</Text>
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
                    <CustomButton onPress={onCancel} color={'red'}>Отменить</CustomButton>
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
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default AddModal;
