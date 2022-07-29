import * as React from "react";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
export const TodoHistoryContext = createContext();


export function useTodoContext() {
    return useContext(TodoHistoryContext)
}

export const TodoHistoryContextProvider = ({children})=>{
    
}