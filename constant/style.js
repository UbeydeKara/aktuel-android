import {StyleSheet} from "react-native";
import {pixelRatio} from "../utils/pixelRatio";

export const lightStyle = {
    primary: "#252836",
    secondary: "#F3F3F8",
    orange: "orange",
    fav: "#ff2063",
    alert: "#7A4F01",
    warning: "#FFC61A",
    light: "#F3F3F8",

    containerBg: "#F1F6F9",
    backgroundColor: "#fff",
    color: "#000",
    shadowColor: "#696969",
    dividerColor: "lightgray",
    barBg: "#FFFFFFF2",
    buttonBg: "#26282CF2",
    inverseTextColor: "#F8F6FA",
    inverseBg: "#26282C"
}

export const darkStyle = {
    primary: "#F3F3F8",
    secondary: "#252836",
    orange: "orange",
    fav: "#ff2063",
    alert: "#7A4F01",
    warning: "#FFC61A",
    light: "#F3F3F8",

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
            height: "100%",
            backgroundColor: currentStyle[theme].containerBg
        },

        // sweet_text
        sweet_text: {
            color: currentStyle[theme].primary
        },

        // buttons
        icon_button: {
            padding: 10 * pixelRatio,
            borderRadius: 20 * pixelRatio
        },
        flatButton: {
            padding: 12 * pixelRatio,
            borderRadius: 25 * pixelRatio,
            backgroundColor: currentStyle[theme].primary,
            color: currentStyle[theme].inverseTextColor,
            shadowColor: currentStyle[theme].shadowColor,
            elevation: 24
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
            width: 75 * pixelRatio,
            aspectRatio: 1,
            margin: 5 * pixelRatio,
            paddingHorizontal: 10 * pixelRatio,
            paddingVertical: 20 * pixelRatio,
            borderRadius: 25 * pixelRatio,
            shadowColor: currentStyle[theme].shadowColor,
            elevation: 4
        },

        // alert
        alertStyle: {
            position: "absolute",
            paddingVertical: 10 * pixelRatio,
            paddingLeft: 20 * pixelRatio,
            paddingRight: 10 * pixelRatio,
            marginHorizontal: 50 * pixelRatio,
            borderRadius: 20 * pixelRatio,
            left: 0,
            right: 0,
            bottom: 80 * pixelRatio,
            alignSelf: 'center',
            backgroundColor: "#FFF7CD",
            shadowColor: currentStyle[theme].shadowColor
        },

        // bottomBar
        bottomBar: {
            position: "absolute",
            justifyContent: "space-around",
            backgroundColor: currentStyle[theme].barBg,
            paddingVertical: 5 * pixelRatio,
            paddingHorizontal: 20 * pixelRatio,
            zIndex: 999,
            left: 0,
            right: 0,
            bottom: 0,
            shadowColor: currentStyle[theme].shadowColor,
            elevation: 24
        },
        navButton: {
            backgroundColor: currentStyle[theme].primary,
            color: currentStyle[theme].primary,
            inverseColor: currentStyle[theme].secondary,
            padding: 12 * pixelRatio,
            borderRadius: 25
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
            paddingTop: 30 * pixelRatio,
            paddingBottom: 15 * pixelRatio,
            paddingHorizontal: 10 * pixelRatio,
            zIndex: 999,
            left: 0,
            right: 0,
            shadowColor: currentStyle[theme].shadowColor,
            elevation: 24
        },
        productCard: {
            height: 250,
            width: 300,
            margin: 8 * pixelRatio,
            alignSelf: "center",
            borderRadius: 10,
            shadowColor: currentStyle[theme].shadowColor,
            elevation: 4
        },
        recentCard: {
            width: "43%",
            aspectRatio: 0.65,
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 10,
            shadowColor: currentStyle[theme].shadowColor,
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
            aspectRatio: 1,
            margin: 8,
            borderRadius: 40,
            padding: 20,
            shadowColor: currentStyle[theme].shadowColor,
            elevation: 4
        },

        menuBg: {
          backgroundColor: currentStyle[theme].backgroundColor,
            shadowColor: currentStyle[theme].shadowColor,
            elevation: 4
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
        },

        // utility
        posAbs: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
});
