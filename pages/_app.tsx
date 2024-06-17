import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { useStore } from "@/store";

export default function App({ Component, pageProps }: AppProps) {
   const router = useRouter();
   const store = useStore(pageProps);
   return (
      <Provider store={store}>
         <NextUIProvider navigate={router.push}>
            <NextThemesProvider>
               <Component {...pageProps} />
            </NextThemesProvider>
         </NextUIProvider>
      </Provider>
   );
}

export const fonts = {
   sans: fontSans.style.fontFamily,
   mono: fontMono.style.fontFamily,
};
