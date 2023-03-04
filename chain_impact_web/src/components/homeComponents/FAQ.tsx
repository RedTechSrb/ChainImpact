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

import image from "../../res/images/faq_image.png";

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
    marginTop: "50px",

    color: theme.colorScheme,
  },

  highlight: {
    color: theme.colorScheme === "dark" ? "#BBFD00" : theme.white,
  },

  componentHeader: {
    fontStyle: "normal",
    fontWeight: 900,
    fontSize: "2.2rem",
    lineHeight: "140%",
    marginTop: "15px",
    marginBottom: "20px",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    //color: "#0F111D",
  },

  gradientSpan: {
    background: "linear-gradient(to right, #9945FF, #14F195)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
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
      <div style={{ marginTop: "30" }}></div>
      <Container size="lg">
        <Text className={classes.componentTitle}>A WEB3 ESG PLATFORM</Text>
        <Text className={classes.componentHeader}>
          Donate to make a real change{" "}
          <span className={classes.highlight}>easily</span>,
          <span className={classes.highlight}> quickly</span> and
          <span className={classes.highlight}> transparently </span>
          and receive{" "}
          <span className={classes.gradientSpan}> Proof of Impact NFT </span>
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
              Join the revolution for a world you would like for your kids.
              Collaborate with companies and communities working together
              towards a better future.
              {/* excuses. Platform for{" "}
              <span className={classes.highlight}>verifiable reporting</span>{" "}
              and <span className={classes.highlight}>collaboration</span> on
              projects that help the environment and social causes powered by
              Solana. */}
            </Text>

            <Link
              to="project_explorer"
              spy={true}
              smooth={true}
              duration={2500}
            >
              <Button
                color="lime"
                radius="md"
                size="xl"
                compact
                mb="xl"
                mt="xl"
                style={{ fontFamily: "Space Mono, monospace", fontWeight: 100 }}
              >
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
                  How does it work? How can I make a difference today?
                </Accordion.Control>
                <Accordion.Panel>
                  You start by selecting a project that aligns with your values.
                  We've partnered with a number of charity organizations to
                  bring different ESG projects. Collaborate with the Angel
                  Impactors to bring a project to it's goal by donating.
                  Impactors will receive a Proof of Impact NFT.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>Why use Chain Impact?</Accordion.Control>
                <Accordion.Panel>
                  Investing in ESG projects not only helps create positive
                  impact on society and the environment, but it can also lead to
                  increased revenue opportunities and long-term sustainability
                  for your business. Our platform allows you to easily track and
                  showcase your ESG efforts, and connect with impact investors
                  and customers who share your values. <br></br>
                  Also it feels good to know you helped make a difference.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>Who are Angel Impactors?</Accordion.Control>
                <Accordion.Panel>
                  Angel Impactors are companies that are first to support a
                  certain charity project by making an initial donation to it.
                  They help ensure that the project is carried out successfully
                  by providing financial support. They are always showcased in
                  the project page. This way companies can truly show their
                  values.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  How do I know my money is going to the right place?
                </Accordion.Control>
                <Accordion.Panel>
                  At Chain Impact, we use blockchain technology to provide
                  transparency and accountability for every donation. Each
                  donation is recorded on the blockchain, which means that it
                  cannot be altered or tampered with. Additionally, we work with
                  trusted and vetted charity organizations to ensure that your
                  donations go to the right place and are used for their
                  intended purpose. You can also track the progress of the
                  projects you support and see how your donation is making an
                  impact in real-time.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
