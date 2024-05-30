import React from 'react';
import { View, Text, FlatList, Button } from "react-native";

const ScheduledNotificationsList: React.FC<{ scheduledNotifications: any[], handleCancelNotification: any, selectedContact: any }> = ({ scheduledNotifications, handleCancelNotification, selectedContact }) => {
    return (
        <View style={{}}>
            <FlatList
                data={scheduledNotifications}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: '#bcbcbc', marginTop: 5, borderRadius: 10 }}>
                        <Text style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>{item.content?.title}</Text>
                        <Text style={{ color: 'white', textAlign: 'center' }}>{item.content?.body}</Text>
                        <Button title="Cancel Notification" onPress={() => handleCancelNotification(item.identifier, selectedContact)} />
                    </View>
                )}
                keyExtractor={(item) => item.identifier.toString()} />
        </View>
    );
}

export  {ScheduledNotificationsList};
