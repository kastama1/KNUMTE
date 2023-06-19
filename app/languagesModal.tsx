import {FlatList, StyleSheet, View} from 'react-native';
import languages from "../constants/Languages";
import LanguageItem from "../components/LanguageItem";
import {useNavigation, useRouter} from "expo-router";
import {useCallback, useEffect} from "react";
import {useRoute} from "@react-navigation/native";

export default function LanguagesModal() {
    const navigation = useNavigation();
    const route = useRoute();

    // @ts-ignore
    const {title, selected, mode} = route.params;

    useEffect(() => {
        navigation.setOptions({
            headerTitle: title
        })
    }, [navigation]);

    const handleSelectLanguage = useCallback((code: string) => {
        const dataKey = mode === 'to' ? 'to' : 'from';
        // @ts-ignore
        navigation.navigate('index', {[dataKey]: code})
    }, [route.params, navigation])

    return (
        <View style={styles.container}>

            <FlatList
                style={styles.list}
                data={Object.values(languages.supported)}
                renderItem={(data) => {
                    return <LanguageItem
                        onPress={() => handleSelectLanguage(data.item['value'])}
                        text={data.item['name']}
                        selected={data.item['value'] === selected.value}
                    />
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        width: "100%"
    }
});