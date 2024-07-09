import '../styles/globals.css';
import '../styles/tailwind.style.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { NextUIProvider } from '@nextui-org/react';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default appWithTranslation(MyApp);