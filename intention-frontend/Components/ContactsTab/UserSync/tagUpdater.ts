import { createContext } from "react";

export const tagUpdater = createContext({
    tagStatus: false,
    setTagStatus: (tag)=> {}

});