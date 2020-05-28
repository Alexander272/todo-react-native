import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { THEME } from '../theme';
import { AppTextBold } from './UI/AppTextBold';


export const Navbar = props => {
    return (
        <View style={{ ...styles.navbar, ...Platform.select({
            ios: styles.navbarIOS,
            android: styles.navbarAndroid
        }) }} >
            <AppTextBold style={ styles.text } >Todo App</AppTextBold>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    navbarAndroid: {
        backgroundColor: THEME.MAIN_COLOR,
    },
    navbarIOS: {
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 1
    },
    text: {
        color: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
        fontSize: 20
    }
})