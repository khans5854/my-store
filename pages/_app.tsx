import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { createCustomTheme, ProductProvider } from "@shared";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createCustomTheme("light");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CookiesProvider>
        <ProductProvider>
          <Component {...pageProps} />
        </ProductProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}
