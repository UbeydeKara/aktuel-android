import {StyleSheet} from "react-native";

export const lightStyle = {
    containerBg: "#F8F6FA",
    backgroundColor: "#fff",
    color: "#000",
    shadowColor: "#8f8f8f",
    dividerColor: "lightgray",
    barBg: "#FFFFFFF2",
    buttonBg: "#ffe8cd",
    inverseTextColor: "#F8F6FA",
    inverseBg: "#26282C"
}

export const darkStyle = {
    containerBg: "#1D1E20",
    backgroundColor: "#26282C",
    color: "#F8F6FA",
    shadowColor: "#000",
    dividerColor: "gray",
    barBg: "#26282CF2",
    buttonBg: "#817669",
    inverseTextColor: "#000",
    inverseBg: "#F8F6FA"
}

export const currentStyle = {
    light: lightStyle,
    dark: darkStyle
}

export const getStyles = (theme) =>
    StyleSheet.create({
        // container
        container: {
            flex: 1,
            backgroundColor: currentStyle[theme].containerBg
        },

        // sweet_text
        sweet_text: {
            color: currentStyle[theme].color
        },

        // buttons
        icon_button: {
            padding: 10,
            borderRadius: 20
        },

        // menus
        radioGroup: {
            backgroundColor: currentStyle[theme].backgroundColor,
            borderRadius: 20,
            shadowColor: currentStyle[theme].shadowColor,
            elevation: 4
        },

        // divider
        divider: {
            height: 1,
            backgroundColor: currentStyle[theme].dividerColor
        },

        // carousel
        carouselItem: {
            width: 80,
            height: 80,
            margin: 5,
            padding: 10,
            borderRadius: 30,
            shadowColor: "#8f8f8f",
            elevation: 4
        },

        // alert
        alertStyle: {
            position: "absolute",
            paddingVertical: 10,
            paddingLeft: 20,
            paddingRight: 10,
            marginHorizontal: 50,
            borderRadius: 20,
            left: 0,
            right: 0,
            bottom: 80,
            alignSelf: 'center',
            backgroundColor: "#FFF7CD",
            shadowColor: "#8f8f8f"
        },

        // bottombar
        bottomBar: {
            position: "absolute",
            justifyContent: "space-evenly",
            backgroundColor: currentStyle[theme].barBg,
            paddingVertical: 10,
            paddingHorizontal: 10,
            zIndex: 999,
            left: 0,
            right: 0,
            bottom: 0,
            shadowColor: "#000",
            elevation: 24
        },
        navButton: {
            padding: 12,
            borderRadius: 25,
            width: "30%",
            backgroundColor: currentStyle[theme].buttonBg
        },

        // image
        imageContainer: {
            width: '100%',
            height: '100%',
            borderRadius: 10,
            resizeMode: "stretch",
            backgroundColor: currentStyle[theme].backgroundColor,
        },

        // card
        appBar: {
            position: "absolute",
            justifyContent: "space-between",
            backgroundColor: currentStyle[theme].barBg,
            paddingTop: 30,
            paddingBottom: 15,
            paddingHorizontal: 10,
            zIndex: 999,
            left: 0,
            right: 0,
            shadowColor: "#8f8f8f",
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
        recentCard: {
            width: "45%",
            height: 250,
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            shadowColor: "#8f8f8f",
            elevation: 4
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
        marketCard: {
            width: "45%",
            height: 150,
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 40,
            padding: 20,
            shadowColor: "#8f8f8f",
            elevation: 4
        },

        flatButton: {
            padding: 12,
            borderRadius: 25,
            backgroundColor: currentStyle[theme].inverseBg,
            color: currentStyle[theme].inverseTextColor,
            shadowColor: currentStyle[theme].shadowColor,
            elevation: 24
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
