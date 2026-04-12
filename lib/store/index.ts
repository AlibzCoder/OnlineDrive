import { configureStore } from '@reduxjs/toolkit'
import { ApiMiddleware, ApiReducer, ApiReducerPath } from '@/lib/api/createApiReducer';
import explorerSlice from './slices/explorerSlice';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const makeStore = () => {
  return configureStore({
    reducer: {
      explorer: explorerSlice,
      [ApiReducerPath]: ApiReducer
    },
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware().concat(ApiMiddleware),
  } as any)
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
