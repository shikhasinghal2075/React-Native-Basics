import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    useColorScheme
} from "react-native"

// Using typeScript here --> : JSX.Element means it will return a JSX.Element type only

function AppPro() : JSX.Element{
    const isDarkMode = useColorScheme() === "dark"
    return(
        // <SafeAreaView>
            <View style={customStyle.container}>
                <Text style={isDarkMode ? customStyle.whiteText : customStyle.darkText}>
                    Hello World
                </Text>
            </View>
        // </SafeAreaView>
    )
}

const customStyle = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',       //alignItems works from left to right
        justifyContent: 'center'    //justifyContents works from top to bottom
    },
    whiteText: {
        color: '#FFFFFF'
    },
    darkText: {
        color: '#000000'
    }
})

export default AppPro