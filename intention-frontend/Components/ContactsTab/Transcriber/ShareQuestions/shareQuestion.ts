import { Alert, Share } from "react-native";

/*
    Theoretically should copy the provided question, and open a sharing box- from where
    you can share the message to other applications
*/
const shareQuestion = async (msg: string)=> {
    try {
        const result = await Share.share({
            message: msg,
        });

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log(`Shared with ${result.activityType}.`);
            } else {
                console.log(`Shared somewhere?`);
            }

        } else if (result.activityType === Share.dismissedAction) {
            console.log(`Dismissed share.`)
        }
    }
    catch (err) {
        console.error(err.message);
    }
}

export {shareQuestion}