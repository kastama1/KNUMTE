import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, useColorScheme, Text, View} from 'react-native';
import Colors from "../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {setSavedItem} from "../store/savedSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LanguageItemProps = {
    id: number
}
export default function ResultItem(props: LanguageItemProps) {
    const dispatch = useDispatch();

    // @ts-ignore
    const item = useSelector(state => state.history.items.find((item: { id: number; }) => item.id === props.id));
    // @ts-ignore
    const savedItems = useSelector(state => state.saved.items);

    const isSaved = savedItems.some((item: { id: number; }) => item.id === props.id);

    const saveItem = useCallback(async () => {
        let newSavedItems;

        if (isSaved === true) {
            newSavedItems = savedItems.filter((item: { id: number; }) => {
                return item.id !== props.id
            });
        } else {
            newSavedItems = savedItems.slice();
            newSavedItems.push(item);
        }

        dispatch(setSavedItem(newSavedItems));

        await AsyncStorage.setItem('saved', JSON.stringify(newSavedItems))
    }, [dispatch, savedItems]);

    return <View
        style={styles.container}
    >
        <View style={styles.textContainer}>
            <Text
                numberOfLines={4}
                style={styles.title}
            >{item.text}</Text>
            <Text
                numberOfLines={4}
                style={styles.title}
            >{item.translatedText}</Text>
        </View>

        <Text style={styles.text}>{}</Text>

        <TouchableOpacity
            onPress={saveItem}
        >
            <FontAwesome
                name="star"
                size={25}
                color={isSaved ? "#d4af37" : Colors.light.text}
            />
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginHorizontal: 10,
        marginTop: 10,
        flexDirection: "row",
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
        backgroundColor: "#fff",
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
    text: {
        flex: 1,
    },
    title: {}
});
