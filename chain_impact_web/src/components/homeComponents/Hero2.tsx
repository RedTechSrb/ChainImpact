import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

import image from "../../res/images/heroSave.png";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: 650,
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    "@media (max-width: 1440px)": {
      maxWidth: 750,
    },
    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "left",

    fontSize: 24,
    "@media (max-width: 1440px)": {
      fontSize: 18,
    },
    "@media (max-width: 520px)": {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },

  title: {
    fontWeight: 800,
    fontSize: 42,

    letterSpacing: -1,

    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "left",

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,
    //fontFamily: "Space Mono, monospace",
    backgroundColor: "#black",
    marginTop: "10px",
    color: "#3b3d44", //"#BBFD00",
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 1440px)": {
      fontSize: theme.fontSizes.sm,
      marginTop: "20px",
    },

    "@media (max-width: 520px)": {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },
  highlight: {
    color: "#BBFD00",
  },
  highlightsolana: {
    background: "linear-gradient(to right, #9945FF, #14F195)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  herocomponent: {
    marginTop: "40px",
  },
  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

export function Hero2() {
  const { classes } = useStyles();
  const { hovered, ref } = useHover();
  return (
    <div>
      <Container size="lg" className={classes.herocomponent}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <RouterLink to="/project/1" style={{ textDecoration: "none" }}>
                <Text
                  component="span"
                  inherit
                  className={classes.highlight}
                  ref={ref}
                  style={{
                    fontSize: hovered ? 84 : 42,
                    transition: "font-size 0.2s ease-in-out",
                  }}
                >
                  ESG
                </Text>
              </RouterLink>{" "}
              powered by{" "}
              <Text
                component="span"
                inherit
                className={classes.highlightsolana}
              >
                Solana Blockchain
              </Text>
            </Title>
            <Text size="lg" className={classes.description}>
              ChainImpact is a platform where people and companies work together
              to help the environment and society. They donate money towards
              projects that make a positive impact, and you can see exactly
              where your money goes.
              {/* A platform where companies collaborate with the community and
              donate to move towards a common goal <br></br> of creating a
              positive impact. <br></br> */}
            </Text>
            <Text size="lg" mt="xs">
              100% transparency, 0% excuses.
            </Text>

            <Group className={classes.control} style={{marginLeft: "0px"}}>
                <ScrollLink to="faq" spy={true} smooth={true} duration={2500}>
                  <Button className={classes.control} variant="white" size="xl">
                    Show me how to change the world!
                  </Button>
                </ScrollLink>
                <ScrollLink to="faq" spy={true} smooth={true} duration={2500}>
                <Button className={classes.control} size="xl" style={{backgroundColor: "#BBFD00"}}>
                  I want to donate!
                </Button>
              </ScrollLink>
            </Group>
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}
