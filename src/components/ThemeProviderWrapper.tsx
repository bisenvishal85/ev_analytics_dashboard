// import React, { createContext, useContext, useState } from "react";
// import { ThemeProvider, createGlobalStyle } from "styled-components";

// const GlobalStyle = createGlobalStyle`
//   :root { --smooth-shadow: 0 6px 18px rgba(15,15,15,0.06); }
//   body {
//     margin: 0;
//     font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
//     background-color: ${(p: any) => p.theme.bodyBg};
//     color: ${(p: any) => p.theme.textColor};
//     transition: background-color 0.25s ease, color 0.25s ease;
//   }
//   a { color: inherit; }
// `;

// const light = {
//   bodyBg: "#f7f8fb",
//   textColor: "#111827",
//   cardBg: "#ffffff",
//   primary: "#1976d2",
// };
// const dark = {
//   bodyBg: "#0b1220",
//   textColor: "#e6eef8",
//   cardBg: "#0f1724",
//   primary: "#60a5fa",
// };

// type ThemeCtx = {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
//   setPrimary: (c: string) => void;
// };

// const ThemeContext = createContext<ThemeCtx | null>(null);

// export const useTheme = () => {
//   const t = useContext(ThemeContext);
//   if (!t) throw new Error("useTheme must be used within ThemeProviderWrapper");
//   return t;
// };

// export const ThemeProviderWrapper: React.FC<{ children: any }> = ({ children }) => {
//   const [darkMode, setDarkMode] = useState<boolean>(false);
//   const [primary, setPrimary] = useState<string>(light.primary);

//   const toggleDarkMode = () => setDarkMode((d) => !d);
//   const setPrimaryColor = (c: string) => setPrimary(c);

//   const theme = {
//     ...(darkMode ? dark : light),
//     primary, 
//   };

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setPrimary: setPrimaryColor }}>
//       <ThemeProvider theme={theme}>
//         <GlobalStyle />
//         {children}
//       </ThemeProvider>
//     </ThemeContext.Provider>
//   );
// };


import React, { ReactNode } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Inter", sans-serif;
    background: ${(p: any) => p.theme.bodyBg};
    color: ${(p: any) => p.theme.text};
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  * {
    box-sizing: border-box;
  }
`;

const theme = {
  bodyBg: "#f9f9f9",
  text: "#333",
  cardBg: "#fff",
  primary: "#1976d2",
};

export default function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

