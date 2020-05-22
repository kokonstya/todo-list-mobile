import CustomButton from "./ui/CustomButton";
import {StyleSheet, View} from "react-native";
import React from "react";

const ButtonGroup = ({filterAll, filterActive, filterDone, setFilterValue}) => {
    return (
        <View style={styles.buttonGroup}>
            <CustomButton color={filterAll} onPress={() => setFilterValue('all')}>
                Все
            </CustomButton>
            <CustomButton color={filterActive} onPress={() => setFilterValue('active')}>
                Неисполненные
            </CustomButton>
            <CustomButton color={filterDone} onPress={() => setFilterValue('done')}>
                Исполненные
            </CustomButton>
        </View>)
}

const styles = StyleSheet.create({
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});

export default ButtonGroup;
