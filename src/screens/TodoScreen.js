import React, { useState, useContext } from 'react'
import { StyleSheet, View, Button, Dimensions } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { THEME } from './../theme';
import { AppCard } from '../components/UI/AppCard';
import { EditModal } from '../components/EditModal';
import { AppTextBold } from '../components/UI/AppTextBold';
import { AppButton } from './../components/UI/AppButton';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

export const TodoScreen = () => {
    const { todos, removeTodo, updateTodo } = useContext(TodoContext)
    const { todoId, changeScreen } = useContext(ScreenContext)

    const [modal, setModal] = useState(false)

    const saveHandler = async title => {
        await updateTodo(todo.id, title)
        setModal(false)
    }

    const todo = todos.find(t => t.id === todoId)

    return (
        <View>
            <EditModal 
                value={ todo.title } 
                visible={ modal } 
                onCancel={ () => setModal(false) } 
                onSave={ saveHandler } 
            />
            <AppCard style={ styles.card }>
                <AppTextBold style={ styles.title }>{ todo.title }</AppTextBold>
                {/* <Button title='Редактировать' /> */}
                <AppButton onPress={ () => setModal(true) } >
                    <FontAwesome name='edit' size={ 20 } />
                </AppButton>
            </AppCard>
            <View style={ styles.buttons }>
                <View style={ styles.button }>
                    {/* <Button title="Назад" color={ THEME.GRAY_COLOR } onPress={ goBack } /> */}
                    <AppButton color={ THEME.GRAY_COLOR } onPress={() => changeScreen(null) } >
                        <AntDesign name='back' size={ 20 } color='#fff' />
                    </AppButton>
                </View>
                <View style={ styles.button }>
                    {/* <Button title="Удалить" color={ THEME.DANGER_COLOR } onPress={ onDelete.bind(null, todo.id) } /> */}
                    <AppButton color={ THEME.DANGER_COLOR } onPress={ removeTodo.bind(null, todo.id) } >
                        <FontAwesome name='remove' size={ 20 } />
                    </AppButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        marginBottom: 20,
        padding: 15
    },
    button: {
        flexBasis: '45%'
        // width: Dimensions.get('window').width / 3
    },
    title: {
        fontSize: 20,
        width: '50%',
        marginRight: 10
    }
})