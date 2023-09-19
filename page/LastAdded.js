import {useDispatch, useSelector} from "react-redux";
import {switchPage} from "../redux/actions/NavigationAction";

import {HStack, IconButton, SweetText} from "../component";
import {CatalogList} from "../section";
import {pixelRatio} from "../utils/pixelRatio";

export default function LastAdded() {
    const {messages, styles} = useSelector(state => state.settingsReducer);
    const {recentlyAdded} = useSelector(state => state.catalogReducer);
    const dispatch = useDispatch();

    const handlePageSwitch = (key, item) => {
        dispatch(switchPage(key, item));
    }

    return (
        <>
            <HStack space={15} style={{...styles.appBar, justifyContent: "flex-start"}}>
                <IconButton name="chevron-back" onPress={() => handlePageSwitch("back")}/>
                <SweetText size={24}>{messages.recentlyAdded}</SweetText>
            </HStack>
            <CatalogList data={recentlyAdded}
                         contentContainerStyle={{paddingTop: 100 * pixelRatio, paddingHorizontal: 15 * pixelRatio}}/>
        </>
    );
}
