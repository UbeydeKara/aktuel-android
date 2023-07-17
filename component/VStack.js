import {View} from "react-native";
import {styles} from "../constant/style";

export default function VStack({children, ...params}) {
    return(
      <View style={styles.vertical} {...params}>
          {children.map((item, index) => {
              return <View key={index} style={{marginBottom: 10}}>{item}</View>
          })}
      </View>
    );
}