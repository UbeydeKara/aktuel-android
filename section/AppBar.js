import {useDispatch} from "react-redux";
import {switchPage} from "../redux/actions/NavigationAction";

import {styles} from "../constant/style";
import {HStack, IconButton, SweetText} from "../component";

export default function AppBar({title, onShare}) {
    const dispatch = useDispatch();

    const handlePageSwitch = () => {
        dispatch(switchPage("home"));
    }

    return (
        <HStack style={styles.appBar}>
            <IconButton name="chevron-back" onPress={handlePageSwitch}/>
            <SweetText size={22}>
                {title}
            </SweetText>
            <IconButton name="share-outline" onPress={onShare}/>
        </HStack>
    );
}