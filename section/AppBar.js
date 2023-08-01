import {useDispatch, useSelector} from "react-redux";
import {switchPage} from "../redux/actions/NavigationAction";
import {HStack, IconButton, SweetText} from "../component";
import {useMemo} from "react";
import {getStyles} from "../constant/style";

export default function AppBar({title, onShare}) {
    const dispatch = useDispatch();

    const {theme} = useSelector(state => state.settingsReducer);
    const styles = useMemo(() => getStyles(theme), [theme]);

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
