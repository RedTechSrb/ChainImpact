import {
  createStyles,
  Image,
  Accordion,
  Grid,
  Col,
  Container,
  Title,
  Text,
  Button,
} from "@mantine/core";
import { Link } from "react-scroll";

import image from "../res/images/faq_image.png";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,

    marginTop: theme.spacing.md,
  },

  componentTitle: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "18px",
    letterSpacing: "0.05em",

    color: theme.colorScheme,
  },

  highlight: {
    color: theme.colorScheme === "dark" ? "#BBFD00" : theme.white,
  },

  componentHeader: {
    fontStyle: "normal",
    fontWeight: 900,
    fontSize: "2.5rem",
    lineHeight: "140%",
    marginTop: "15px",
    marginBottom: "20px",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    //color: "#0F111D",
  },

  desc: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "24px",
    lineHeight: "175%",
    marginTop: "20px",

    color: "white",
  },
  desc2: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "21px",
    lineHeight: "175%",
    marginTop: "20px",

    color: "white",
  },
  desc3: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "175%",
    marginTop: "20px",

    color: "white",
  },

  readMore: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "175%",

    marginTop: "30px",
    marginBottom: "50px",

    textAlign: "center",
    textDecoration: "underline",

    //color: "#0F111D",
  },

  title: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  item: {
    fontSize: theme.fontSizes.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
  },
}));

const placeholder =
  "It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.";

export default function FAQ() {
  const { classes } = useStyles();

  const executeScroll = (data: string) => {
    const element = document.getElementById(data);
    if (element) {
      element.scrollIntoView();
    }
  };

  return (
    <div className={classes.wrapper} id="faq">
      <Container size="lg">
        <Text className={classes.componentTitle}>A WEB3 ESG PLATFORM</Text>
        <Text className={classes.componentHeader}>
          Make a real change <span className={classes.highlight}>easily</span>,
          <span className={classes.highlight}> quickly</span> and
          <span className={classes.highlight}> transparently </span>
          with blockchain
        </Text>
      </Container>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <Image src={image} alt="Frequently Asked Questions" />
          </Col>
          <Col span={12} md={6}>
            <Text className={classes.desc}>
              <span className={classes.highlight}>
                {" "}
                Find new revenue streams
              </span>{" "}
              by investing into Environmental, Social, and Governance projects.
            </Text>
            <Text className={classes.desc2}>
              With{" "}
              <span
                style={{
                  marginLeft: "px",
                  fontFamily: "Space Mono, monospace",
                  color: "#BBFD00",
                  fontWeight: 100,
                }}
              >
                {" "}
                chainimpact&#8482;
              </span>
              , companies become{" "}
              <span className={classes.highlight}>Angel Impactors</span> on
              projects that they believe in, while other community members and
              companies help them reach their goal using crypto.
            </Text>
            <Text className={classes.desc3}>
              Platform for{" "}
              <span className={classes.highlight}>verifiable reporting</span>{" "}
              and <span className={classes.highlight}>collaboration</span> on
              projects that help the environment and social causes powered by
              Solana.
            </Text>

            <Link to="project_explorer" spy={true} smooth={true} duration={2500}>
              <Button color="lime" radius="md" size="xl" compact mb="xl" mt="xl">
                Find projects to support
              </Button>
            </Link>

            <Title order={2} align="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              variant="separated"
            >
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>
                  Is Chain Impact trustless?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>Why use Chain Impact?</Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>
                  Can Chain Impacts data be accessed by the public?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  Can Chain Impacts data be accessed by the public?
                </Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
