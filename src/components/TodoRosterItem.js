import React from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import CustomButton from "./ui/CustomButton";

const TodoRosterItem = ({todoRoster, onPress, deleteTodoRoster, openEdit}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>

            <View style={styles.todoRoster}>
                <Text style={styles.title}>{todoRoster.title}</Text>
                <View style={styles.buttons}>
                    <CustomButton color={'#eaeaea'} onPress={()=>openEdit(todoRoster)}>
                        <FontAwesome name="edit" size={20} color="blue"/>
                    </CustomButton>
                    <CustomButton color={'#eaeaea'} onPress={() => deleteTodoRoster(todoRoster.id)}>
                        <FontAwesome name="remove" size={20} color="red"/>
                    </CustomButton>

                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    todoRoster: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 10
    },
    title: {
        fontSize: 20

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }

})

export default TodoRosterItem;
