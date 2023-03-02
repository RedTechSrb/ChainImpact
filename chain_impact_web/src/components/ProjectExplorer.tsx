import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  TextInput,
  ActionIcon,
  useMantineTheme,
  Title,
  SegmentedControl,
  Center,
  Flex,
  Pagination,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconSearch } from "@tabler/icons";
import { useState, useEffect } from "react";
import Project from "./Project";

const mockdata = [
  {
    image: "https://picsum.photos/id/1000/400/300",
    title: "Project One",

    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod velit at bibendum feugiat. Nulla sollicitudin tellus sed turpis dapibus, ut efficitur elit lacinia. Mauris vel mi eget est volutpat commodo.",
    primarytag: "Education",
    secondarytag: "STEM",
    angelimapctor: {
      name: "John Doe",
      image: "https://picsum.photos/id/1015/200/200",
      address: "1234 Main St, New York, NY 10001",
    },
    charity: {
      name: "Bob Johnson",
      image: "https://picsum.photos/id/1018/200/200",
      address: "12345 Main St, New York, NY 10001",
    },
    totaldonated: 15000,
    goal: 20000,
  },
  {
    image: "https://picsum.photos/id/1001/400/300",
    title: "Project Two",

    description:
      "Vivamus at ex nec felis tristique venenatis eu vitae lectus. Proin sed lorem id mi ultricies feugiat. Nam vitae lectus eget sapien facilisis luctus. Morbi sed justo ut mauris fermentum fringilla nec sit amet nisl. ",
    primarytag: "Health",
    secondarytag: "Cancer Research",
    angelimapctor: {
      name: "Jane Smith",
      image: "https://picsum.photos/id/1016/200/200",
      address: "12345 Main St, New York, NY 10001",
    },
    charity: {
      name: "Bob Johnson",
      image: "https://picsum.photos/id/1018/200/200",
      address: "12345 Main St, New York, NY 10001",
    },
    totaldonated: 8000,
    goal: 10000,
  },
  {
    image: "https://picsum.photos/id/1002/400/300",
    title: "Project Three",

    description:
      "Praesent ultricies augue sed turpis congue, id suscipit est malesuada. Duis sit amet enim eget arcu commodo tincidunt eu eget augue. In hac habitasse platea dictumst. Nam in turpis id felis facilisis aliquet. ",
    primarytag: "Environment",
    secondarytag: "Sustainability",
    angelimapctor: {
      name: "Bob Johnson",
      image: "https://picsum.photos/id/1018/200/200",
      address: "12345 Main St, New York, NY 10001",
    },
    charity: {
      name: "Bob Johnson",
      image: "https://picsum.photos/id/1018/200/200",
      address: "12345 Main St, New York, NY 10001",
    },
    totaldonated: 12000,
    goal: 15000,
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  herotitle: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#BBFD00",
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  active: {
    backgroundImage: theme.fn.gradient({ from: "black", to: "#BBFD00" }),
  },

  control: {
    border: "0 !important",
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));

export default function ProjectExplorer() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [activePage, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState(mockdata);
  const [tag, setTag] = useState("General");
  var projects = filteredData.map((article) => (
    <Project
      title={article.title}
      image={article.image}
      angelimapctor={article.angelimapctor}
      description={article.description}
      primarytag={article.primarytag}
      secondarytag={article.secondarytag}
      totaldonated={article.totaldonated}
      goal={article.goal}
      charity={article.charity}
    ></Project>
    // <Card
    //   key={article.title}
    //   p="md"
    //   radius="md"
    //   component="a"
    //   href="#"
    //   className={classes.card}
    // >
    //   <AspectRatio ratio={1920 / 1080}>
    //     <Image src={article.image} />
    //   </AspectRatio>
    //   <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
    //     {article.date}
    //   </Text>
    //   <Text mt={5}>{article.title}</Text>
    // </Card>
  ));

  useEffect(() => {
    const startIndex = activePage === 1 ? 0 : 4 * (activePage - 1);
    const endIndex = 4 * activePage;
    setFilteredData(mockdata.slice(startIndex, endIndex));

    projects = filteredData.map((article) => (
      <Project
        title={article.title}
        image={article.image}
        angelimapctor={article.angelimapctor}
        description={article.description}
        primarytag={article.primarytag}
        secondarytag={article.secondarytag}
        totaldonated={article.totaldonated}
        goal={article.goal}
        charity={article.charity}
      ></Project>
    ));

    return () => {
      // cleanup function here
    };
  }, [activePage, tag]);

  return (
    <Container py="xl" size="lg" id="project_explorer">
      <Title
        order={2}
        className={classes.herotitle}
        align="center"
        mt="sm"
        style={{ marginTop: "70px" }}
      >
        Support what you believe in.
      </Title>
      <Text
        color="white"
        className={classes.description}
        align="center"
        mt="md"
      >
        Find a project to support, back other Impactors and make a real change.
      </Text>
      <TextInput
        icon={<IconSearch size={18} stroke={1.5} color="#BBFD00" />}
        radius="xl"
        size="md"
        mt="xl"
        mb="md"
        rightSection={
          <ActionIcon size={32} radius="xl" color="#BBFD00">
            {theme.dir === "ltr" ? (
              <IconArrowRight size={18} stroke={1.5} color="white" />
            ) : (
              <IconArrowLeft size={18} stroke={1.5} color="white" />
            )}
          </ActionIcon>
        }
        placeholder="Search questions"
        rightSectionWidth={42}
      />
      <Flex
        mih={50}
        gap="lg"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        mb="lg"
      >
        <SegmentedControl
          radius="xl"
          size="md"
          data={[
            "General",
            "Environment",
            "Social",
            "Disaster Relief",
            "Education",
          ]}
          classNames={classes}
          value={tag}
          onChange={setTag}
        />
      </Flex>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {projects}
      </SimpleGrid>
      <Pagination
        total={mockdata.length / 4 + 1}
        color="lime"
        mt="lg"
        page={activePage}
        // onChange={() => {
        //   setPage();
        //   console.log(activePage);
        // }}
        onChange={(page) => {
          setPage(page);
          console.log(page);
        }} // this works
      />
    </Container>
  );
}
