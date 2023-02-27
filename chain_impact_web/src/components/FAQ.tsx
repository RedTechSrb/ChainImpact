import { createStyles, Image, Accordion, Grid, Col, Container, Title, Text } from '@mantine/core';
import image from '../res/images/faq_image.png';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,

    marginTop: theme.spacing.md,
  },

  componentTitle: {
    fontFamily: 'Sans-serif',
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "18px",
    letterSpacing: "0.05em",

    color: "#5C6574",
  },

  componentHeader: {
    fontFamily: 'Sans-serif',
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "32px",
    lineHeight: "140%",
    marginTop: "15px",
    marginBottom: "20px",

    color: "#0F111D",
  },

  desc: {
    fontFamily: 'DM Sans',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "175%",
    marginTop: "20px",

    color: "#5C6574",
  },

  readMore: {
    fontFamily: 'Sans-serif',
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "175%",

    marginTop: "30px",
    marginBottom: "50px",

    textAlign: "center",
    textDecoration: "underline",

    color: "#0F111D",
  },

  title: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Sans-serif`,
  },

  item: {
    fontFamily: "Sans-serif",
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
  },
}));

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

export default function FAQ() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Text className={classes.componentTitle}> 
            A WEB3 ESG PLATFORM
        </Text>
        <Text className={classes.componentHeader}> 
        Distribute aid <span style={{color: "rgba(19, 173, 183, 1)"}}>easily</span>,
                       <span style={{color: "rgba(19, 173, 183, 1)"}}>quickly</span>, and 
            <span style={{color: "rgba(19, 173, 183, 1)"}}> transparently with blockchain</span>
        </Text>
      </Container>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <Image src={image} alt="Frequently Asked Questions" />
          </Col>
          <Col span={12} md={6}>
            <Text className={classes.desc}>
            A corporate responsibility web3 platform that copy copy
             copy copy copy copy POWERED BY SOLANA.
              Copy copy copy Bullshit bulish WOW
               mega super EXTRA YAY. LESSS GO
            </Text>
            <Text className={classes.readMore}>
                Read more
            </Text>

            <Title order={2} align="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>Is Chain Impact trustless?</Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>Why use Chain Impact?</Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>Can Chain Impacts data be accessed by the public?</Accordion.Control>
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