import { createContext, useState } from "react";

export const scoreContext = createContext({
    scoreValue: -1,
    setScoreValue: (score)=> {}

});