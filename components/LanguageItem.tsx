import React from 'react';
import {StyleSheet, TouchableOpacity, useColorScheme, Text, View} from 'react-native';
import Colors from "../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../constants/Colors";

type LanguageItemProps = {
    onPress: any;
    text: string
    selected: boolean
}
export default function LanguageItem(props: LanguageItemProps) {
    const colorScheme = useColorScheme();

    return <TouchableOpacity
        style={styles.container}
        onPress={props.onPress}
    >
        <View style={styles.iconContainer}>
            {
                props.selected &&
                <FontAwesome
                    name="check"
                    size={25}
                    color={Colors.light.text}
                />
            }
        </View>
        <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: "row",
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1
    },
    iconContainer: {
        paddingRight: 7,
        alignItems: "center",
        justifyContent: "center",
        width: 40
    },
    text: {
        flex: 1,

    }
});
