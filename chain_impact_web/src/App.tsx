import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import { ImpactorWalletSearch } from "./models/dto/request/ImpactorWalletSearch";
import {
  createNewImpactor,
  getSpecificImpactor,
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
  const [solana, setSolana] = useState<any>();



  const cookies = new Cookies();

  const getProvider = (): PhantomProvider | undefined => {
    if ("solana" in window) {
      // @ts-ignore
      const provider = window.solana as any;
      if (provider.isPhantom) return provider as PhantomProvider;
    }
  };

  /**
   * @description prompts user to connect wallet if it exists
   */
  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    // check if there is cookie containing a wallet
    let cookieWallet;
    let newUser;
    let response
    if ((cookieWallet = cookies.get("wallet"))) {
      if (solana)
        response = await solana.connect();
      setWalletKey(cookieWallet);
      return solana;
    }
    console.log("Eggo")

    if (solana) {
      try {
        const response = await solana.connect();
        setSolana(solana);

        // put wallet in cookie for next 365 days
        cookies.set("wallet", response.publicKey.toString(), {
          expires: new Date(Date.now() + 31536000000),
        });
        // if there is already impactor with this wallet, continue
        let impactor = getSpecificImpactor(
          new ImpactorWalletSearch(null, null, response.publicKey.toString())
        );
        if (await impactor) {
          setWalletKey(response.publicKey.toString());
          return;
        }

        // if not, create new impactor with this wallet
        newUser = {
          wallet: response.publicKey.toString(),
          type: 1,
          name: null,
          description: null,
          website: null,
          facebook: null,
          discord: null,
          twitter: null,
          instagram: null,
          imageurl: null,
          role: null,
        };

        createNewImpactor(newUser);
        setWalletKey(response.publicKey.toString());
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    } else {
      return;
    }
  };

  /**
   * @description disconnect Phantom wallet
   */
  const disconnectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if(cookies.get("wallet"))
      cookies.remove("wallet");
    setWalletKey(undefined);
    if (walletKey) {
      if (solana) await (solana as PhantomProvider).disconnect();
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
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
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
                connectWallet={connectWallet}
                disconnectWallet={disconnectWallet}
                solana={solana}
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
