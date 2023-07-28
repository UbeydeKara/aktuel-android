import {View} from "react-native";

export default function VStack({children, space, centerX, ...params}) {
    return(
      <View style={{flexDirection: "column", alignItems: centerX && "center"}} {...params}>
          {children?.map((item, index) => {
              return <View key={index} style={{marginBottom: space || 0}}>{item}</View>
          })}
      </View>
    );
}