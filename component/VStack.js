import {View} from "react-native";
import {styles} from "../constant/style";

export default function VStack({children, space, centerX, ...params}) {
    return(
      <View style={[styles.vertical, {alignItems: centerX ? "center" : "stretch"}]} {...params}>
          {children?.map((item, index) => {
              return <View key={index} style={{marginBottom: space || 0}}>{item}</View>
          })}
      </View>
    );
}