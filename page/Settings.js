import {SweetText, VStack} from "../component";
import {TouchableOpacity} from "react-native";
import {useDispatch} from "react-redux";
import {set_lang} from "../redux/actions/SettingsAction";

export default function Settings() {
    const dispatch = useDispatch();

    return(
      <VStack style={{paddingVertical: 30, paddingHorizontal: 20}} space={15}>
          <SweetText size={36}>Ayarlar</SweetText>
          <TouchableOpacity onPress={() => dispatch(set_lang("en_US"))}>
              <SweetText>Değiştir</SweetText>
          </TouchableOpacity>
          <SweetText size={20} center>Aktuel Market from Hatitech</SweetText>
      </VStack>
    );
}