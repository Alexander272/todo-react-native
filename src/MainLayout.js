import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'
import { Navbar } from './components/Navbar'
import { ScreenContext } from './context/screen/screenContext'

export const MainLayout = () => {
    const { todoId } = useContext(ScreenContext)

    return (
        <View style={ styles.wrap }>
			<Navbar />
			<View style={ styles.container }>
				{ !todoId 
					? <MainScreen />
					: <TodoScreen />
				}
			</View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
		paddingVertical: 20,
		flex: 1
	},
	wrap: {
		flex: 1
	}
});