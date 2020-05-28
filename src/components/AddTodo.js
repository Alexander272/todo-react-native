import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Alert, Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { THEME } from '../theme'

export const AddTodo = props => {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if (value.trim()){
            props.onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        } else {
            Alert.alert('Название задачи не может быть пустым')
        }
    }

    return (
        <View style={ styles.block }>
            <TextInput 
                style={ styles.input }
                onChangeText={ setValue } 
                value={ value } 
                placeholder="Введите название задачи..."
                autoCorrect={ false }
            />
            <AntDesign.Button name="pluscircleo" onPress={ pressHandler } > Добавить </AntDesign.Button>
            {/* <Button style={ styles.btn } title='Добавить' onPress={ pressHandler } /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        flexBasis: '60%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
    },
    btn: {}
})