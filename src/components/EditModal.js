import React, { useState } from 'react'
import { StyleSheet, View, Modal, TextInput, Button, Alert } from 'react-native';
import { THEME } from '../theme';
import { AppButton } from './UI/AppButton';

export const EditModal = ({ value, visible, onCancel, onSave }) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Ошибка', `Минимальная длина названия 3 символа. Сейчас ${title.trim().length} символов`)
        } else {
            onSave(title)
        }
    }

    const cancelHandler = () => {
        setTitle(value)
        onCancel()
    }

    return (
        <Modal visible={ visible } animationType='slide' transparent={ false } >
            <View style={ styles.wrapper }>
                <TextInput 
                    style={ styles.input } 
                    placeholder="Введите название" 
                    autoCorrect={ false } 
                    maxLength={ 64 }
                    value={ title }
                    onChangeText={ setTitle }
                />
                <View style={ styles.buttons }>
                    <View style={ styles.button }>
                        {/* <Button title="Отменить" onPress={ onCancel } color={ THEME.DANGER_COLOR } /> */}
                        <AppButton onPress={ cancelHandler } color={ THEME.DANGER_COLOR } >Отменить</AppButton>
                    </View>
                    <View style={ styles.button }>
                        {/* <Button title="Сохранить" onPress={ saveHandler } /> */}
                        <AppButton onPress={ saveHandler } >Сохранить</AppButton>
                    </View>
                </View>
                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '36%',
        marginRight: '7%',
        marginLeft: '7%'
    }
})