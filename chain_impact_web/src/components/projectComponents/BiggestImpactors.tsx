import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Text,
  Button,
  useMantineTheme,
  Image,
  Group,
  Card,
  Center,
  SimpleGrid,
  Flex,
} from "@mantine/core";
import { Donation } from "../../models/Donation";
import { BiggestDonators } from "../../models/dto/response/BiggestDonators";

const useStyles = createStyles((theme) => ({
  card: {
    height: "375px",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #BBFD00bb",
    //justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    minHeight: "150px",
    maxHeight: "150px",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${"1px"} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "1rem",
    marginTop: theme.spacing.xs,
  },

  image: {
    maxHeight: "120px",
    maxWidth: "120px",
  },
  category: {
    color: theme.white,

    opacity: 1,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${"1px"} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    marginTop: theme.spacing.md,
  },
}));

// const data = [
//   {
//     image:
//       "https://www.arweave.net/L2xx_TKhUOImmE3YF9q8aqO23KYTFO8FILERCdSeMwc?ext=PNG",
//     title: "Best forests to visit in North America",
//     category: "nature",
//   },
//   {
//     image:
//       "https://www.arweave.net/L2xx_TKhUOImmE3YF9q8aqO23KYTFO8FILERCdSeMwc?ext=PNG",
//     title: "Hawaii beaches review: better than you think",
//     category: "beach",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
//     title: "Mountains at night: 12 best locations to enjoy the view",
//     category: "nature",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
//     title: "Aurora in Norway: when to visit for best experience",
//     category: "nature",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
//     title: "Best places to visit this winter",
//     category: "tourism",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
//     title: "Active volcanos reviews: travel at your own risk",
//     category: "nature",
//   },
// ];

type BiggestImpactorsProps = {
    biggestImpactors: BiggestDonators[];
};

export default function BiggestImpactors(biggestImpactors: BiggestImpactorsProps) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const laptop = useMediaQuery(`(max-width: 1440px)`);
  const { classes } = useStyles();
  const slides = biggestImpactors.biggestImpactors.map((item) => (
    <Carousel.Slide key={item.impactor.name}>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image
            src={item.impactor.imageurl}
            alt="Tesla Model S"
            className={classes.image}
          />
        </Card.Section>

        <Group position="apart" mt="md" style={{minHeight: "70px"}}>
          <div>
            <Text fw={500}>{item.impactor.name}</Text>
            <Text fz="xs" c="dimmed">
              {item.impactor.description}
            </Text>
          </div>
        </Group>

        <Card.Section className={classes.section}>
          <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
            {item.amount}
          </Text>
          <Text
            fz="sm"
            c="dimmed"
            fw={500}
            sx={{ lineHeight: 1, marginTop: "0px", paddingTop: "0px" }}
          >
            Donated
          </Text>
        </Card.Section>
      </Card>
    </Carousel.Slide>
  ));

  return (
    <Flex style={{marginTop: "30px"}}>
      <SimpleGrid cols={1} style={{maxWidth: "100%"}}>
        <Carousel
          slideSize={laptop ? "50%" : "33.333%"}
          breakpoints={[{ maxWidth: "xl", slideSize: "100%", slideGap: "lg" }]}
          slideGap="xl"
          align="start"
          slidesToScroll={laptop ? 2 : 3}
          styles={{
            control: {
              "&[data-inactive]": {
                opacity: 0,
                cursor: "default",
              },
            },
          }}
        >
          {slides}
        </Carousel>
      </SimpleGrid>
    </Flex>
  );
}
