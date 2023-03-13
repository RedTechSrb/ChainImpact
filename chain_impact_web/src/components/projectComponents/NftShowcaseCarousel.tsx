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
    opacity: 0.3,
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
          {category}
        </Text>
      </div>
    </Paper>
  );
}

const data = [
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/generalnft.JPG?raw=true",
    title: "Best forests to visit in North America",
    category: "General",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/educationnft.JPG?raw=true",
    title: "Hawaii beaches review: better than you think",
    category: "Education",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/disasternft.JPG?raw=true",
    title: "Mountains at night: 12 best locations to enjoy the view",
    category: "Disaster Relief",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/environmentnft.JPG?raw=true",
    title: "Aurora in Norway: when to visit for best experience",
    category: "Environment",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/healthnft.JPG?raw=true",
    title: "Best places to visit this winter",
    category: "Health",
  },
  {
    image:
      "https://github.com/RedTechSrb/ChainImpact/blob/master/ChainImpactSmartContract/NFT/NFTsMetadata/socialnft.JPG?raw=true",
    title: "Active volcanos reviews: travel at your own risk",
    category: "Social",
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
