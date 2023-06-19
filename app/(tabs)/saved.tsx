import {FlatList, StyleSheet, View} from 'react-native';
import ResultItem from "../../components/ResultItem";
import {useSelector} from "react-redux";

export default function Saved() {
    // @ts-ignore
    const savedItems = useSelector(state => state.saved.items);

    return (
        <View style={styles.container}>

            <FlatList
                data={savedItems}
                renderItem={itemData => {
                    return <ResultItem id={itemData.item.id}/>
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
