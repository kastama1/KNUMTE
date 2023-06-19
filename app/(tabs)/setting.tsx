import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Colors from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {deleteHistory} from "../../store/historySlice";
import {deleteSavedItem} from "../../store/savedSlice";

export default function Setting() {
    const dispatch = useDispatch();

    const handleDeleteHistory = useCallback(async () => {
        try {
            await AsyncStorage.setItem('history', JSON.stringify([]));
            dispatch(deleteHistory());
        } catch (error) {
            console.error(error);
        }
    }, [dispatch]);

    const handleDeleteSaved = useCallback(async () => {
        try {
            await AsyncStorage.setItem('saved', JSON.stringify([]));
            dispatch(deleteSavedItem());
        } catch (error) {
            console.error(error);
        }
    }, [dispatch]);


    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleDeleteHistory}
            >
                <Text
                    style={styles.textButton}
                    numberOfLines={1}
                >Delete history</Text>
                <FontAwesome
                    name="trash"
                    size={25}
                    color={Colors.light.text}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleDeleteSaved}
            >
                <Text
                    style={styles.textButton}
                    numberOfLines={1}
                >Delete saved</Text>
                <FontAwesome
                    name="trash"
                    size={25}
                    color={Colors.light.text}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        backgroundColor: "#fff"
    },
    textButton: {
        flex: 1,
        marginRight: 8
    }
});
