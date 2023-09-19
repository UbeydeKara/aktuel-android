import {NativeModules, Platform} from 'react-native';
import * as Notifications from 'expo-notifications';
import {registerDevice} from "../service/notification-service";
import {storage} from "./Storage";

const expoProjectId = "8d81dae7-8d45-4573-bfa2-fcec3b3776e1";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
    }),
});

export async function registerForPushNotificationsAsync() {
    if (storage.contains("notifyToken"))
        return false;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('catalog', {
            name: 'catalog',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#212121',
        });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return false;
    }

    const token = (await Notifications.getExpoPushTokenAsync(
        {projectId: expoProjectId}
    )).data;

    await registerDevice({
        notificationToken: token,
        preferredLanguage: storage.getString("language") || NativeModules.I18nManager.localeIdentifier
    });

    storage.set("notifyToken", token);

    return token;
}
