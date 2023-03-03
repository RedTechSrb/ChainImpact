import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  createStyles,
  useMantineTheme,
  Grid,
  Flex,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import { Link } from "react-scroll";
import HeroImage from "../../res/images/hero_image.png";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 80,
    paddingBottom: 80,
    backgroundImage: `url(${HeroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",

    "@media (max-width: 1440px)": {
      paddingTop: 80,
      paddingBottom: 30,
    },
  },

  inner: {
    position: "relative",
    width: "100%",
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 48,

    "@media (max-width: 1440px)": {
      fontSize: 36,
    },

    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  highlight: {
    color: "#BBFD00",
  },

  flexbox: {
    color: theme.colors.gray[0],
    textAlign: "center",
    width: "80%",
    justifyContent: "center",
    //alignItems: "center",
    fontSize: 24,
    gap: "md",
    margin: "3em auto",
    display: "flex",

    "@media (max-width: 720px)": {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
      flexDirection: "column",
      height: "200px",
    },

    "@media (max-width: 540px)": {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
      flexDirection: "column",
      height: "200px",
    },

    "@media (max-width: 1440px)": {
      fontSize: 18,
    },
  },

  gridCol: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "33%",
    backgroundColor: "#BBFD0040",
    //color: "#3b3d44",
    color: "#dcdcdc",
    fontWeight: 750,
    fontSize: 20,
    margin: "15px 20px",
    padding: "0 5px",
    borderRadius: "20px",

    "@media (max-width: 720px)": {
      fontSize: theme.fontSizes.md,
      margin: "10px auto",
      width: "80%",
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,
    fontFamily: "Space Mono, monospace",
    backgroundColor: "#black",
    color: "#3b3d44", //"#BBFD00",
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    "@media (max-width: 1440px)": {
      fontSize: theme.fontSizes.sm,
    },

    "@media (max-width: 520px)": {
      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: "rgba(255, 255, 255, .4)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .45) !important",
    },
  },
}));

export default function Hero() {
  const { classes, cx } = useStyles();
  const isSmallerThanMd = useMediaQuery("(max-width: 767px)");

  return (
    <div className={classes.wrapper} id="hero">
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          <Text component="span" inherit className={classes.highlight}>
            ESG
          </Text>{" "}
          powered by{" "}
          <Text component="span" inherit className={classes.highlight}>
            Solana Blockchain
          </Text>
        </Title>

        <Flex className={classes.flexbox}>
          <Text className={classes.gridCol} >
            Platform where companies collaborate with the community and donate.
          </Text>
          <Text className={classes.gridCol} >
            Move towards a common goal of creating a positive impact.
          </Text>
          <Text className={classes.gridCol} >
            100% transparency, 0% excuses.
          </Text>
        </Flex>
            {/*<Text size="lg" className={classes.description}>
            Platform where companies collaborate with the community and donate.{" "}
            <br></br>
            Move towards a common goal of creating a positive impact. <br></br>
            100% transparency, 0% excuses.
            {/* impact on the environment and society. Be a part of real impact by
            investing into Environmental, Social and Governance that is 100%
            transparent.
          </Text>*/}

        <div className={classes.controls}>
          <Link to="faq" spy={true} smooth={true} duration={2500}>
            <Button className={classes.control} variant="white" size="xl">
              Show me how to change the world!
            </Button>
          </Link>
          {/* <Button
            className={cx(classes.control, classes.secondaryControl)}
            size="lg"
          >
            Watch video
          </Button> */}
        </div>
      </div>
    </div>
  );
}
