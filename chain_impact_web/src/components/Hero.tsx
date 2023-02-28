import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  createStyles,
} from "@mantine/core";
import { useEffect } from "react";
import { Link } from "react-scroll";
import HeroImage from '../res/images/hero_image.png';


const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: 80,
    paddingBottom: 80,
    backgroundImage: `url(${HeroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",

    "@media (max-width: 520px)": {
      paddingTop: 80,
      paddingBottom: 50,
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
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
    color: "rgba(19, 173, 183, 1)",
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "center",

    "@media (max-width: 520px)": {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 1.0,
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    "@media (max-width: 520px)": {
      flexDirection: "column",
    },
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
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

  const executeScroll = (data: string) => {
    const element = document.getElementById(data);
    if (element) {
      element.scrollIntoView();
    }
  };

  useEffect(() => {
    executeScroll("hero");
  }, []);

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
            Blockchain
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Be a part of real impact by investing into Environmental and Social
            Governance that is 100% transparent
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            variant="white"
            size="xl"
          >
            <Link to="faq" spy={true} smooth={true} duration={2000}>
              I want to change the world
            </Link>
          </Button>
          <Button
            className={cx(classes.control, classes.secondaryControl)}
            size="lg"
          >
            Watch video
          </Button>
        </div>
      </div>
    </div>
  );
}
