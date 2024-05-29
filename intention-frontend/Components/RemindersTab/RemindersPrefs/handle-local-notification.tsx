import * as Notifications from 'expo-notifications';

export interface NotificationContent {
  title: string;
  body: string;
}

export const scheduleLocalNotification = async (
  content: NotificationContent,
  trigger: Notifications.NotificationTriggerInput
): Promise<string> => {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content,
      trigger,
    });

    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
};

export const cancelScheduledNotification = async (identifier: string) => {
  await Notifications.cancelScheduledNotificationAsync(identifier);
};

export const checkNotificationPermission = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  return existingStatus === 'granted';
};

export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};
