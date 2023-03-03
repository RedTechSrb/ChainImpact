import "./App.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  Container,
  MantineProvider,
} from "@mantine/core";
import Header from "./components/Header";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import About from "./views/About";
import NotFound from "./views/NotFound";
import Home from "./views/Home";
import "./index.css";
import { useEffect, useRef, useState } from "react";
import Charities from "./views/Charities";
import { useEffect, useState } from "react";
import ProjectOverview from "./views/ProjectOverview";

const footerPlaceholder = [
  {
    title: "About",
    links: [
      {
        label: "Features",
        link: "#",
      },
      {
        label: "Pricing",
        link: "#",
      },
      {
        label: "Docs",
        link: "#",
      },
    ],
  },
  {
    title: "Project",
    links: [
      {
        label: "About",
        link: "#",
      },
      {
        label: "Contribute",
        link: "#",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "Join Discord",
        link: "#",
      },
      {
        label: "Follow on Twitter",
        link: "#",
      },
      {
        label: "Email newsletter",
        link: "#",
      },
      {
        label: "GitHub",
        link: "#",
      },
    ],
  },
];

declare global {
  interface Window {
    solana: any;
  }
}

function App() {

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  //useHotkeys([["mod+J", () => toggleColorScheme()]]);
  // theme settings

  const [provider, setProvider] = useState<any>(undefined);
  const [walletKey, setWalletKey] = useState<any>(undefined);

  useEffect(() => {
    window.scrollTo({ top: 0});
  }, []);
  
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          globalStyles: (theme) => ({
            body: {
              backgroundColor: colorScheme === "dark" ? "dark" : "#BBFD00",
              color: colorScheme === "dark" ? "#BBFD00" : "dark",
            },
          }),
          colorScheme,
          fontFamilyMonospace:
            "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
        }}
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
      >
        <Header
          provider={provider}
          setProvider={setProvider}
          walletKey={walletKey}
          setWalletKey={setWalletKey}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<About />} />
          <Route path="/project" element={<ProjectOverview />} />
          <Route path="/charities" element={<Charities />}/>
          <Route path="/*" element={<NotFound />} />
        </Routes>

        <Footer data={footerPlaceholder} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
