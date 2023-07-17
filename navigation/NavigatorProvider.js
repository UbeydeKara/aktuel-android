import {createContext, useEffect, useState} from "react";
import {BackHandler} from "react-native";

export const NavigatorContext = createContext(0);

export const NavigatorProvider = (props) => {
    const [page, setPage] = useState(0);
    const [item, setItem] = useState(0);

    const switchPage = (newPage, item) => {
        setPage(newPage);
        setItem(item);
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => switchPage(0, null)
        );

        return () => backHandler.remove();
    }, []);

    return (
        <NavigatorContext.Provider value={{
            page,
            item,
            switchPage
        }}>
            {props.children}
        </NavigatorContext.Provider>
    )
}