import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  Grid,
  SimpleGrid,
  Container,
  Center,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: "1rem",
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.1,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  containercss: {
    maxWidth: "100%",
  },

  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
}));

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xs"
      radius="md"
      sx={{
        backgroundImage: `url(${image})`,
        flexDirection: "column",
        flexBasis: "33.3333%",
        flexShrink: 0,
      }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="sm">
          IMPACT
        </Text>
      </div>
    </Paper>
  );
}

const data = [
  {
    image:
      "https://www.arweave.net/L2xx_TKhUOImmE3YF9q8aqO23KYTFO8FILERCdSeMwc?ext=PNG",
    title: "Best forests to visit in North America",
    category: "nature",
  },
  {
    image:
      "https://www.arweave.net/XuW3IePl-7omXSkY8cqcwupcbQYMg5u8ebh2viTBayU?ext=PNG",
    title: "Hawaii beaches review: better than you think",
    category: "beach",
  },
  {
    image:
      "https://www.arweave.net/iu44EnygpiLm12r_nbe5aOgh9SnWIFzm8p5dfoZlT4A?ext=PNG",
    title: "Mountains at night: 12 best locations to enjoy the view",
    category: "nature",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Aurora in Norway: when to visit for best experience",
    category: "nature",
  },
  {
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Best places to visit this winter",
    category: "tourism",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Active volcanos reviews: travel at your own risk",
    category: "nature",
  },
];

export default function NftShowcaseCarousel() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Center>
      <SimpleGrid cols={1}>
        <Carousel
          slideSize="33.3333%"
          breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: "lg" }]}
          slideGap="xs"
          align="start"
          slidesToScroll={mobile ? 1 : 3}
          classNames={classes}
          nextControlIcon={<IconArrowRight size={16} />}
          previousControlIcon={<IconArrowLeft size={16} />}
          p="5px"
        >
          {slides}
        </Carousel>
      </SimpleGrid>
    </Center>
  );
}
