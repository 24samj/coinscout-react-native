import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation();
    const [masterData, setMasterData] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState("aed");

    useEffect(() => {
        const retrieveCoinData = async () => {
            try {
                const { data } = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/"
                );
                setMasterData(data);
            } catch (ex) {
                console.log(ex);
            }
        };

        retrieveCoinData();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.coinRow}
            onPress={() =>
                navigation.navigate("Details", {
                    coinId: item.id,
                    selectedCurrency: selectedCurrency,
                })
            }>
            <Image
                style={styles.coinImg}
                source={{
                    uri: item.image.small,
                }}
            />
            <Text style={styles.coinItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.intro}>Cryptocurrency List</Text>
            <View style={styles.searchAndSort}>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={[
                            styles.searchBar,
                            searchQuery
                                ? { borderRadius: 25 }
                                : { borderRadius: 25, marginRight: 0 },
                        ]}
                        placeholder="Search by coin name"
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                        inputMode="text"
                    />
                    {searchQuery && (
                        <TouchableOpacity
                            style={styles.clearBtn}
                            onPress={() => setSearchQuery("")}>
                            <Text style={styles.clearBtnText}>❌</Text>
                        </TouchableOpacity>
                    )}
                    {/* <Text style={styles.currencyText}>Currency</Text> */}
                    <Picker
                        style={styles.currencyPicker}
                        selectedValue={selectedCurrency}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedCurrency(itemValue)
                        }
                        label="Select">
                        {masterData &&
                            Object.keys(
                                masterData[0]?.market_data.current_price
                            ).map((currency) => (
                                <Picker.Item
                                    label={currency.toUpperCase()}
                                    value={currency}
                                />
                            ))}
                    </Picker>
                </View>
            </View>
            <FlatList
                data={masterData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(20, 22, 25)",
    },
    intro: {
        color: "white",
        fontSize: 20,
        margin: 10,
    },
    searchAndSort: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        width: "100",
    },
    searchBar: {
        margin: 10,
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "white",
        padding: 8,
        flex: 1,
    },

    clearBtn: {
        backgroundColor: "rgb(17, 18, 20)",
        borderRadius: 25,
        padding: 8,
    },
    clearBtnText: {
        color: "white",
    },
    sortSelectContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "40%",
    },
    sortSelectLabel: {
        color: "white",
        marginRight: 10,
    },
    sortSelect: {
        backgroundColor: "white",
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: "white",
        borderRadius: 25,
        padding: 8,
    },
    sortSelectText: {
        color: "white",
    },
    sortDropdown: {
        backgroundColor: "rgb(17, 18, 20)",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 8,
    },
    coinTableContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "",
    },
    coinRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "white",
        padding: 5,
        marginBottom: 10,
        padding: 10,
    },
    coinItemText: {
        color: "white",
        fontSize: 16,
    },
    coinImg: {
        height: 50,
        width: 50,
    },
    currencyText: {
        color: "white",
    },
    currencyPicker: {
        width: "50%",
        color: "white",
    },
    pickerCurrency: {},
});

export default HomeScreen;
