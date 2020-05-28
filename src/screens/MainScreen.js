import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../components/UI/AppLoader';
import { AppText } from '../components/UI/AppText';
import { THEME } from '../theme';
import { AppButton } from '../components/UI/AppButton';


export const MainScreen = () => {
    const { todos, loading, error, addTodo, removeTodo, fetchTodos } = useContext(TodoContext)
    const { changeScreen } = useContext(ScreenContext)

    const [deviceWidth, setDeviceWidth] = useState(
        Dimensions.get('window').width - 60
    )

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

    useEffect(() => {
        loadTodos()
    }, [])

    useEffect(() => {
        const update = () => {
            setDeviceWidth(Dimensions.get('window').width - 60)
        }

        Dimensions.addEventListener('change', update)

        return () => Dimensions.removeEventListener('change', update)
    })

    if (loading) return <AppLoader />

    if (error) return (
        <View style={ styles.center }>
            <AppText style={ styles.error }> { error } </AppText>
            <AppButton onPress={ loadTodos }>Повторить</AppButton>
        </View>
    )

    let content = (
        <View style={{ width: deviceWidth }}>
            <FlatList
                data={ todos }
                renderItem={({ item }) => <Todo onDelete={ removeTodo } todo={ item } onOpen={ changeScreen } />}
                keyExtractor={item => item.id}
            />
        </View>
    )

    if (todos.length === 0) {
        content = (
            <View style={ styles.imgWrap }>
                <Image style={ styles.img } source={ require('../../assets/no-items.png') } />
            </View>
        )
    }

    return (
        <View>
            <AddTodo onSubmit={ addTodo } />
            { content }
        </View>
    )
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR,
        marginBottom: 15
    }
})