import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import BlogSlice from "./reducers/Blog/BlogSlice";

const reducer = combineReducers({
   blog: BlogSlice,
});

export const createStore = (preloadedState?: {}) => {
   const middlewares: any = [];

   return configureStore({
      reducer,
      preloadedState,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            serializableCheck: false,
         }).concat(...middlewares),
   });
};

let store: ReturnType<typeof createStore>;
const initializeStore = (preloadedState?: {}) => {
   let _store = store || createStore(preloadedState);

   if (preloadedState && store) {
      _store = createStore({ ...store.getState(), ...preloadedState });
      store = undefined!;
   }

   if (typeof window === "undefined") {
      return _store;
   }

   if (!store) {
      store = _store;
   }

   return _store;
};

export const useStore = (preloadedState?: {}) => initializeStore(preloadedState);
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof reducer>> = useSelector;
