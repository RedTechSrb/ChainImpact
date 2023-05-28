import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { PublicKey, Transaction } from "@solana/web3.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import { ImpactorIdSearch } from "./models/dto/request/ImpactorIdSearch";
import { ImpactorWalletSearch } from "./models/dto/request/ImpactorWalletSearch";
import { Impactor } from "./models/Impactor";
import {
  createNewImpactor,
  getSpecificImpactor,
  getSpecificImpactorById,
} from "./repositories/ImpactorRepository";
import About from "./views/About";
import Charities from "./views/Charities";
import CompanyOverview from "./views/CompanyOverview";
import ESGFAQ from "./views/ESGFAQ";
import Home from "./views/Home";
import MobileVersionSoon from "./views/MobileVersionSoon";
import NotFound from "./views/NotFound";
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
        link: "#https://twitter.com/ChainImpactSOL",
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

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
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

  const cookies = new Cookies();

  //console.log(cookies.get("ChainImpactWallet"))

  const getProvider = (): PhantomProvider | undefined => {
    if ("phantom" in window) {
      const anyWindow: any = window;
      const provider = anyWindow.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }
  };

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
          cookies={cookies}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<About />} />
          <Route path="/company/:wallet" element={<CompanyOverview />} />
          <Route
            path="/project/:id"
            element={
              <ProjectOverview
                walletKey={walletKey}
                setWalletKey={setWalletKey}
                cookies={cookies}
              />
            }
          />
          <Route path="/charities" element={<Charities />} />
          <Route path="/esg" element={<ESGFAQ />} />
          <Route path="/mobile" element={<MobileVersionSoon />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>

        <Footer data={footerPlaceholder} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
