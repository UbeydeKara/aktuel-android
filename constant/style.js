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

    // card
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
        shadowColor: "#000",
        elevation: 24,
    },

    // text
    subtitle: {
        fontSize: 28,
        fontFamily: 'Belanosima'
    },
    subtitle2: {
        fontSize: 18,
        fontFamily: 'Belanosima'
    },
    button_text: {
        color: "#fff",
        fontFamily: 'Belanosima',
        fontSize: 18
    },

    // spacing
    py4: {
        paddingVertical: 40
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