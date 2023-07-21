import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    vertical: {
        flexDirection: "column"
    },
    flat_button: {
        backgroundColor: "#000",
        alignSelf: 'flex-start',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 20
    },
    icon_button: {
        padding: 10,
        borderRadius: 20
    },
    paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: 'orange',
        marginHorizontal: 5,
        elevation: 1
    },

    // card
    appBar: {
        position: "absolute",
        justifyContent: "space-between",
        backgroundColor: "rgba(255,255,255,0.95)",
        paddingTop: 30,
        paddingBottom: 15,
        paddingHorizontal: 10,
        zIndex: 999,
        left: 0,
        right: 0,
        shadowColor: "#8f8f8f",
        elevation: 24
    },
    bottomBar: {
        position: "absolute",
        justifyContent: "space-evenly",
        backgroundColor: "rgba(255,255,255,0.95)",
        paddingVertical: 10,
        paddingHorizontal: 10,
        zIndex: 999,
        left: 0,
        right: 0,
        bottom: 0,
        shadowColor: "#000",
        elevation: 24
    },
    productCard: {
        height: 250,
        width: 300,
        margin: 5,
        alignSelf: "center",
        borderRadius: 10,
        shadowColor: "#8f8f8f",
        elevation: 4
    },
    card_tmp: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#8f8f8f",
        elevation: 4
    },
    card: {
        width: "45%",
        height: 250,
        marginVertical: 10,
        marginHorizontal: 10
    },
    card_footer: {
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: "absolute",
        bottom: 0,
        width: "100%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    shadowProp: {
        shadowColor: "#8f8f8f",
        elevation: 4
    },
    marketCard: {
        width: "45%",
        height: 150,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 40,
        padding: 20
    },

    // text
    subtitle: {
        fontSize: 24,
        fontFamily: 'PublicSans_500Medium'
    },
    subtitle2: {
        fontSize: 18,
        fontFamily: 'PublicSans_500Medium'
    },
    button_text: {
        color: "#fff",
        fontFamily: 'PublicSans_500Medium',
        fontSize: 18
    },

    // spacing
    py4: {
        paddingVertical: 40
    },
    pt4: {
        paddingTop: 40
    },
    py2: {
        paddingVertical: 20
    },
    px2: {
        paddingHorizontal: 20
    },
    my2: {
        marginVertical: 20
    }
});