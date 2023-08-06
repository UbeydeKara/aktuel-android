import {Dimensions} from "react-native";

const {width} = Dimensions.get("window");

export const pixelRatio = width <= 370 ? 0.8 : 1;

export const imageRatio = width <= 370 ? 0.5 : 1;

export const adsRatio = width <= 370 ? 0.9 : 1;
