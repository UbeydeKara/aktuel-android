import {View} from "react-native";
import {styles} from "../constant/style";

export default function Card({children, spacing}) {
    const style = {gap: spacing}
    return(
      <View style={[styles.card_tmp, style]}>
          {children}
      </View>
    );
}