import { configureStore } from '@reduxjs/toolkit'
import PosralBankSlice from './card-Slice'

export const store = configureStore({
    reducer:{
        portalBank: PosralBankSlice
    } 
})

export type RootSrate = ReturnType<typeof store.getState>
export type AppDispltch = typeof store.dispatch