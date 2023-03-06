import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  ColorSchemeProvider,
  useMantineColorScheme,
  Container,
  Loader,
} from "@mantine/core";
import { IconStar, IconWallet } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons";
import LightDarkMode from "./LightDarkMode";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import Cookies from 'universal-cookie';
import { createNewImpactor, getSpecificImpactor } from "../repositories/ImpactorRepository";
import axios from "axios";
import { Impactor } from "../models/Impactor";
import { useGetSpecificProject } from "../repositories/ProjectRepository";
import { ImpactorWalletSearch } from "../models/dto/request/ImpactorWalletSearch";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[2],

    //margin: 0,
    //position: "fixed",
    //top: 0,
    width: "100%",
    //zIndex: 100,
  },

  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[4],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[4],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[4],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  phantomButton: {
    fontSize: "lg",
    padding: "10px",
    fontWeight: "bold",

    backgroundColor: theme.colorScheme === "dark" ? "#BBFD00" : "black",
    color: theme.colorScheme === "light" ? "dark" : "black",
    ":hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? "rgb(97, 163, 0)" : "rgb(105, 105, 105)",
    },
  },

  hidden: {
    display: "none",
  },
}));

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

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

export default function HeaderResponsive({
  provider,
  setProvider,
  walletKey,
  setWalletKey,
}: any) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(true);
  const { classes, theme } = useStyles();
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
    if (cookieWallet = cookies.get("wallet")){
      setWalletKey(cookieWallet);
      return;
    }

    if (solana) {
      try {
        const response = await solana.connect();

        // put wallet in cookie for next 365 days
        cookies.set("wallet", response.publicKey.toString(), {expires: new Date(Date.now()+31536000000)})
        // if there is already impactor with this wallet, continue
        let impactor = getSpecificImpactor(new ImpactorWalletSearch(null, null, response.publicKey.toString()));
        if (await impactor){
            setWalletKey(response.publicKey.toString());
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
          role: null
        }

        setWalletKey(response.publicKey.toString());
        createNewImpactor(newUser);
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
    else{
      return;
    }
  };

  /**
   * @description disconnect Phantom wallet
   */
  const disconnectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (walletKey && solana) {
      await (solana as PhantomProvider).disconnect();
      setWalletKey(undefined);
      cookies.remove("wallet");
    }
  };

  // detect phantom provider exists
  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      const provider = getProvider();
      if (provider) setProvider(provider);
      else setProvider(undefined);
      setIsLoading(false);
    }, 2000);

    let cookieWallet;
    if (cookieWallet = cookies.get("wallet")){
      setWalletKey(cookieWallet);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [provider, walletKey]);

  function PhantomWrapper() {
    const { classes } = useStyles();
    return (
      <>
        { isLoading && 
          <Button
            className={classes.phantomButton}
          >
            Loading
            <Loader variant="dots" style={{marginLeft: "15px"}} />
          </Button>
        }

        { !isLoading && provider && !walletKey && (
          <Button
            className={classes.phantomButton}
            onClick={connectWallet}
            leftIcon={<IconWallet></IconWallet>}
          >
            Connect wallet
          </Button>
        )}

        { !isLoading && provider && walletKey && (
          <Button className={classes.phantomButton} onClick={disconnectWallet}>
            Disconnect wallet
          </Button>
        )}

        { !isLoading && !provider && (
          <>
            <Anchor href="https://phantom.app/">
              <Button className={classes.phantomButton}>Install Phantom</Button>
            </Anchor>
          </>
        )}
      </>
    );
  }

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size="sm" weight={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Header height={60} px="md" className={classes.header} id="header">
        <Group position="apart" sx={{ height: "100%" }}>
          <Group
            sx={{ height: "100%", margin: "auto", width: "75%" }}
            spacing={0}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "100",
              }}
            >
              <Text
                style={{
                  marginLeft: "px",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "2rem",
                }}
              >
                chainimpact<span style={{ fontSize: "2rem" }}>&#8482;</span>
              </Text>
            </div>

            <Group
              className={classes.hiddenMobile}
              style={{ marginLeft: "50px" }}
              sx={{ height: "100%" }}
            >
              <Link to="/" className={classes.link}>
                Home
              </Link>
              <HoverCard
                width={600}
                position="bottom"
                radius="md"
                shadow="md"
                withinPortal
              >
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                      <Link to="/charities" className={classes.link}>
                        Charities
                      </Link>
                      </Box>
                      {/*<IconChevronDown
                        size={16}
                        color={theme.fn.primaryColor()}
                        />*/}
                    </Center>
                  </a>
                </HoverCard.Target>

                {/*<HoverCard.Dropdown sx={{ overflow: "hidden" }}>
                  <Group position="apart" px="md">
                    <Text weight={500}>Features</Text>
                    <Anchor href="#" size="xs">
                      View all
                    </Anchor>
                  </Group>

                  <Divider
                    my="sm"
                    mx="-md"
                    color={theme.colorScheme === "dark" ? "dark.5" : "gray.2"}
                  />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>

                  <div className={classes.dropdownFooter}>
                    <Group position="apart">
                      <div>
                        <Text weight={500} size="sm">
                          Get started
                        </Text>
                        <Text size="xs" color="dimmed">
                          Their food sources have decreased, and their numbers
                        </Text>
                      </div>
                      <Button variant="default">Get started</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>*/}
              </HoverCard>
              <a href="#" className={classes.link}>
                Whitepaper
              </a>
              <a href="#" className={classes.link}>
                I'm confused
              </a>
            </Group>
          </Group>

          <Group className={classes.hiddenMobile}>
            {PhantomWrapper()}
            <div className={classes.hidden}>
              <LightDarkMode />
            </div>
          </Group>
          <Group position="center" className={classes.hiddenDesktop}>
            <Burger opened={drawerOpened} onClick={toggleDrawer} />
            <div className={classes.hidden}>
              <LightDarkMode />
            </div>
          </Group>
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.2"}
          />

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.2"}
          />

          <Group
            position="center"
            grow
            pb="xl"
            px="md"
            className={classes.hiddenDesktop}
          >
            {PhantomWrapper()}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
