import {useDispatch, useSelector} from "react-redux";

import {SvgCssUri} from "react-native-svg";
import {switchPage} from "../redux/actions/NavigationAction";

import {HStack, IconButton} from "../component";
import {CatalogList} from "../section";
import {pixelRatio} from "../utils/pixelRatio";

export default function MarketCatalogs() {
    const dispatch = useDispatch();

    // reducers
    const {selectedMarket, markets} = useSelector(state => state.marketReducer);
    const {catalogs} = useSelector(state => state.catalogReducer);
    const {messages, styles} = useSelector(state => state.settingsReducer);

    const market = markets.find(x => x.marketID === selectedMarket);
    const catalogsByMarket = catalogs?.filter(x => x.market?.marketID === selectedMarket);

    const handlePageSwitch = (key, item) => {
        dispatch(switchPage(key, item));
    }

    return (
        <>
            <HStack space={5} style={{...styles.appBar, justifyContent: "flex-start"}}>
                <IconButton name="chevron-back" onPress={() => handlePageSwitch("back")}/>
                <SvgCssUri
                    width="20%"
                    height="80%"
                    uri={market?.img_path}
                />
            </HStack>
            <CatalogList data={catalogsByMarket} noResultDialog={messages.noResultDialog}
                         contentContainerStyle={{paddingTop: 100 * pixelRatio, paddingHorizontal: 15 * pixelRatio}}/>
        </>
    );
}
