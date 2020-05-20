import React, {useEffect, useState} from 'react'
import { View, StyleSheet, TextInput, Text, Modal, Alert } from 'react-native'
import CustomButton from "./ui/CustomButton";
import {CheckBox} from 'react-native-elements'

const EditModal = ({ visible, onCancel, value, onSave }) => {
    console.log(value.title)
    const [title, setTitle] = useState('')
    const [important, setImportant] = useState(false)
    useEffect(()=> {
        setTitle(value.title)
        setImportant(value.important)
    }, [value])
    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert(
                'Ошибка!',
                `Минимальная длинна названия 3 символа. Сейчас ${
                    title.trim().length
                } символов.`
            )
        } else {
            onSave(value.id, title, important)
            onCancel()
            setTitle('')
        }
    }

    return (
        <Modal visible={visible} animationType='fade' transparent={false}>
            <View style={styles.wrap}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder='Введите название'
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64}
                />

                {value.todos ? null : <>
                    <Text style={styles.importantText}>Срочно?</Text>
                    <CheckBox checked={important} size={40} checkedColor={'green'}
                              containerStyle={{margin: 0, padding: 0}}
                              onPress={() => setImportant(!important)} />
                  </>
                }

                <View style={styles.buttons}>
                    <CustomButton onPress={onCancel}>Отменить</CustomButton>
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
    }
})

export default EditModal;
