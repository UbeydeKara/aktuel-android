import {useDispatch, useSelector} from "react-redux";
import {switchPage} from "../redux/actions/NavigationAction";

import {HStack, IconButton, SweetText} from "../component";
import {CatalogList} from "../section";
import {pixelRatio} from "../utils/pixelRatio";

export default function Favorites() {
    const dispatch = useDispatch();

    // reducers
    const {catalogs, favorites} = useSelector(state => state.catalogReducer);
    const {messages, styles} = useSelector(state => state.settingsReducer);

    const favoriteCatalogs = catalogs?.filter(x => favorites.includes(x.catalogID));

    const handlePageSwitch = (key, item) => {
        dispatch(switchPage(key, item));
    }

    return (
        <>
            <HStack space={15} style={{...styles.appBar, justifyContent: "flex-start"}}>
                <IconButton name="chevron-back" onPress={() => handlePageSwitch("back")}/>
                <SweetText size={24}>{messages.favorites}</SweetText>
            </HStack>
            <CatalogList data={favoriteCatalogs} noResultDialog={messages.noFavoriteDialog}
                         contentContainerStyle={{paddingTop: 100 * pixelRatio, paddingHorizontal: 15 * pixelRatio}}/>
        </>
    );
}
