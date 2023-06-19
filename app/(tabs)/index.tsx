import {StyleSheet, TextInput, TouchableOpacity, Text, View, FlatList} from 'react-native';
import {useCallback, useEffect, useState} from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
import {useNavigation} from "expo-router";
import languages from "../../constants/Languages";
import {useRoute} from "@react-navigation/native";
import {translate} from "../../utils/translate";
import * as Clipboard from "expo-clipboard";
import {useDispatch, useSelector} from "react-redux";
import {addHistoryItem, setHistoryItems} from "../../store/historySlice";
import ResultItem from "../../components/ResultItem";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setSavedItem} from "../../store/savedSlice";
import {Keyboard} from 'react-native';

export default function Home() {
    const defaultFrom = {"name": "Czech", "value": "cs"};
    const defaultTo = {"name": "English", "value": "en"};

    const [languageFrom, setLanguageFrom] = useState(defaultFrom);
    const [languageTo, setLanguageTo] = useState(defaultTo);

    const [textFrom, setTextFrom] = useState("");
    const [textTranslated, setTextTranslated] = useState("");

    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    // @ts-ignore
    const history = useSelector(state => state.history.items);

    const params = route.params || {};
    // @ts-ignore
    const {from, to} = params;

    const findLanguage = (code: string) => {
        return languages.supported.find(language => {
            return language.value === code;
        });
    }

    useEffect(() => {
        if (from) {
            setLanguageFrom(findLanguage(from) || defaultFrom);
        }

        if (to) {
            setLanguageTo(findLanguage(to) || defaultTo);
        }
    }, [params, navigation]);

    useEffect(() => {
        loadData()
    }, []);

    useEffect(() => {
        saveHistory()
    }, [history]);

    const loadData = async () => {
        try {
            const historyString = await AsyncStorage.getItem('history')
            if (historyString !== null) {
                const history = JSON.parse(historyString);
                dispatch(setHistoryItems(history))
            }

            const savedString = await AsyncStorage.getItem('saved')
            if (savedString !== null) {
                const saved = JSON.parse(savedString);
                dispatch(setSavedItem(saved))
            }
        } catch (error) {
            console.error(error);
        }
    }

    const saveHistory = async () => {
        try {
            await AsyncStorage.setItem('history', JSON.stringify(history))
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = useCallback(async () => {
        try {
            const result = await translate(textFrom, languageFrom.value, languageTo.value)

            if (!result) {
                setTextTranslated("")
                return;
            }

            setTextTranslated(result.translations[0].translatedText);

            const id = uuid.v4();

            dispatch(addHistoryItem({
                item: {
                    id: id,
                    text: textFrom,
                    translatedText: result.translations[0].translatedText,
                    languageFrom: languageFrom,
                    languageTo: languageTo,
                }
            }));

            Keyboard.dismiss()
        } catch (error) {
            console.error(error);
        }
    }, [textFrom, languageFrom, languageTo])

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(textTranslated);
    };

    const switchLanguages = () => {
        const newFrom = languageTo;
        const newTo = languageFrom;

        setLanguageFrom(newFrom);
        setLanguageTo(newTo);
    }

    return (
        <View style={styles.container}>
            <View style={styles.languageContainer}>
                <TouchableOpacity
                    // @ts-ignore
                    onPress={() => navigation.navigate("languagesModal", {
                        title: "Translate language from",
                        selected: languageFrom,
                        mode: "from"
                    })}
                >
                    <Text>{languageFrom.name}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.arrowContainer}
                    onPress={switchLanguages}
                >
                    <FontAwesome
                        name="arrows-h"
                        size={25}
                        color={Colors.light.text}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    // @ts-ignore
                    onPress={() => navigation.navigate("languagesModal", {
                        title: "Translate language to",
                        selected: languageTo,
                        mode: "to"
                    })}
                >
                    <Text>{languageTo.name}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    placeholder='Enter text'
                    style={styles.textInput}
                    onChangeText={(text) => setTextFrom(text)}
                />

                <TouchableOpacity
                    disabled={textFrom === ""}
                    style={styles.textIcon}
                    onPress={handleSubmit}
                >
                    <FontAwesome
                        name="arrow-right"
                        size={25}
                        color={Colors.light.text}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textInput}>{textTranslated}</Text>

                <TouchableOpacity
                    disabled={textTranslated === ""}
                    style={styles.textIcon}
                    onPress={copyToClipboard}
                >
                    <FontAwesome
                        name="copy"
                        size={25}
                        color={Colors.light.text}
                    />
                </TouchableOpacity>
            </View>

            <View>

                <FlatList
                    data={history}
                    renderItem={itemData => {
                        return <ResultItem id={itemData.item.id}/>
                    }}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    languageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
    },
    arrowContainer: {
        margin: 15
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
    },
    textInput: {
        flex: 1,
        marginTop: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
        height: 90,
    },
    textIcon: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    }
});
