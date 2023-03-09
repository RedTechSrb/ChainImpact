import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  createStyles,
  Divider,
  Drawer,
  Group,
  Header,
  HoverCard,
  Loader,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
  IconWallet,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { ImpactorWalletSearch } from "../models/dto/request/ImpactorWalletSearch";
import {
  createNewImpactor,
  getSpecificImpactor,
} from "../repositories/ImpactorRepository";
import LightDarkMode from "./LightDarkMode";

const useStyles: any = createStyles((theme) => ({
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

    "@media (max-width: 1200px)": {
      fontsize: theme.fontSizes.md,
      paddingLeft: 0,
      paddingRight: 0,
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
  connectWallet,
  disconnectWallet,
  setSolana
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

  // detect phantom provider exists
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const provider = getProvider();
      if (provider) setProvider(provider);
      else setProvider(undefined);
      setIsLoading(false);
      console.log(isLoading, walletKey, provider)
    }, 2000);

    let cookieWallet;
    if ((cookieWallet = cookies.get("wallet"))) {
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
        {isLoading && (
          <Button className={classes.phantomButton}>
            Loading
            <Loader variant="dots" style={{ marginLeft: "15px" }} />
          </Button>
        )}

        {!isLoading && provider && !walletKey && (
          <Button
            className={classes.phantomButton}
            onClick={connectWallet}
            leftIcon={<IconWallet></IconWallet>}
          >
            Connect wallet
          </Button>
        )}

        {!isLoading && provider && walletKey && (
          <Button className={classes.phantomButton} onClick={disconnectWallet}>
            Disconnect wallet
          </Button>
        )}

        {!isLoading && !provider && (
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
              <Link
                to="https://twitter.com/ChainImpactSOL"
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Text
                  style={{
                    marginLeft: "px",
                    fontFamily: "Space Mono, monospace",
                    fontSize: "2rem",
                    color: "#BBFD00",
                  }}
                >
                  chainimpact<span style={{ fontSize: "2rem" }}>&#8482;</span>
                </Text>
              </Link>
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
              <a href="/esg" className={classes.link}>
                What is ESG?
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
