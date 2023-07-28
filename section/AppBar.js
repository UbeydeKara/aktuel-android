import {useDispatch, useSelector} from "react-redux";
import {switchPage} from "../redux/actions/NavigationAction";
import {HStack, IconButton, SweetText} from "../component";

export default function AppBar({title, onShare}) {
    const dispatch = useDispatch();
    const {styles} = useSelector(state => state.settingsReducer);

    const handlePageSwitch = () => {
        dispatch(switchPage("back"));
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