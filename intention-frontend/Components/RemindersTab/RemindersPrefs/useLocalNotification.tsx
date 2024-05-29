import { useState, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";

export interface ILocalNotificationHook {
  notification: Notifications.Notification;
}

export const useLocalNotification = (): ILocalNotificationHook => {
  const [notification, setNotification] = useState({} as Notifications.Notification);
  const notificationListener = useRef<Notifications.Subscription | undefined>();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    return () => {
      if (notificationListener.current?.remove) {
        notificationListener.current.remove();
      }
    };
  }, []);

  return { notification };
};
