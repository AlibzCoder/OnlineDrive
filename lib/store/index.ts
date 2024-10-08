import { configureStore } from '@reduxjs/toolkit'
import { ApiMiddleware, ApiReducer, ApiReducerPath } from '@/lib/api/createApiReducer';
import explorerSlice from './slices/explorerSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      explorer: explorerSlice,
      [ApiReducerPath]: ApiReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(ApiMiddleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']