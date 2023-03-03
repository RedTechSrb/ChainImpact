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
import { useGetAllProjects } from "../../repositories/ProjectRepository";
import ProjectComponent from "../ProjectComponent";

/*const mockdata = [
  {
    id: 4,
    charity: {
      id: 4,
      name: "The Ocean Cleanup",
      wallet: "0x222222",
      website: "https://www.theoceancleanup.com/",
      facebook: "social media",
      discord: "social media",
      twitter: "social media",
      instagram: "social media",
      imageurl: "https://picsum.photos/id/1025/200/200",
      description:
        "The Ocean Cleanup develops advanced technologies to rid the world's oceans of plastic. We aim to remove 90% of the floating plastic with our systems that are fueled by the natural ocean currents.",
    },
    name: "Plastic Free Seas",
    description:
      "This project aims to clean up the oceans and prevent further pollution from plastic waste.",
    milestones:
      "1. Develop new plastic cleanup technology, 2. Deploy cleanup systems in ocean hotspots, 3. Remove millions of tons of plastic from the ocean.",
    financialGoal: 1000000,
    totaldonated: 250000,
    website: "https://example.com/",
    facebook: "social media",
    discord: "social media",
    twitter: "social media",
    instagram: "social media",
    imageurl: "https://picsum.photos/id/1025/200/200",
    angelimpactor: {
      wallet: "0x333333",
      name: "John Doe",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      website: "https://example.com",
      facebook: "social media",
      discord: null,
      twitter: null,
      instagram: "social media",
      imageurl: "https://picsum.photos/id/1005/400/300",
      role: 1,
      type: 2,
    },
    primarycausetype: {
      id: 2,
      name: "Environment",
    },
    secondarycausetype: {
      id: 5,
      name: "Ecosystem",
    },
  },

  {
    id: 5,
    charity: {
      id: 5,
      name: "Doctors Without Borders",
      wallet: "0x222222",
      website: "https://www.doctorswithoutborders.org/",
      facebook: "social media",
      discord: "social media",
      twitter: "social media",
      instagram: "social media",
      imageurl: "https://picsum.photos/id/1000/400/300",
      description:
        "Doctors Without Borders provides emergency medical assistance to people affected by conflict, epidemics, disasters, or exclusion from healthcare.",
    },
    name: "Emergency Medical Assistance",
    description:
      "This project aims to provide emergency medical assistance to people affected by conflict, epidemics, disasters, or exclusion from healthcare.",
    milestones:
      "1. Deploy emergency medical teams to crisis areas, 2. Treat patients and provide necessary medical supplies, 3. Save lives and alleviate suffering.",
    financialGoal: 5000000,
    totaldonated: 1200000,
    website: "https://example.com/",
    facebook: "social media",
    discord: "social media",
    twitter: "social media",
    instagram: "social media",
    imageurl: "https://picsum.photos/id/1000/400/300",
    angelimpactor: {
      wallet: "0x444444",
      name: "Jane Smith",
      description: null,
      website: null,
      facebook: "social media",
      discord: "social media",
      twitter: null,
      instagram: null,
      imageurl: "https://picsum.photos/id/1028/200/200",
      role: 2,
      type: 1,
    },

    primarycausetype: {
      id: 3,
      name: "Disaster Relief",
    },
    secondarycausetype: {
      id: 1,
      name: "Social",
    },
  },
  {
    id: 6,
    charity: {
      id: 5,
      name: "Doctors Without Borders",
      wallet: "0x222222",
      website: "https://www.doctorswithoutborders.org/",
      facebook: "social media",
      discord: "social media",
      twitter: "social media",
      instagram: "social media",
      imageurl: "https://picsum.photos/id/1000/400/200",
      description:
        "Doctors Without Borders provides emergency medical assistance to people affected by conflict, epidemics, disasters, or exclusion from healthcare.",
    },
    name: "Solana Education",
    description:
      "This project aims to educate people about the benefits of Solana and how to use it.",
    milestones:
      "1. Deploy emergency medical teams to crisis areas, 2. Treat patients and provide necessary medical supplies, 3. Save lives and alleviate suffering.",
    financialGoal: 5000000,
    totaldonated: 1200000,
    website: "https://example.com/",
    facebook: "social media",
    discord: "social media",
    twitter: "social media",
    instagram: "social media",
    imageurl: "https://picsum.photos/id/237/500/600",
    angelimpactor: {
      wallet: "0x444444",
      name: "Jane Smith",
      description: null,
      website: null,
      facebook: "social media",
      discord: "social media",
      twitter: null,
      instagram: null,
      imageurl: "https://picsum.photos/id/1028/200/200",
      role: 2,
      type: 1,
    },

    primarycausetype: {
      id: 3,
      name: "Education",
    },
    secondarycausetype: {
      id: 1,
      name: "Social",
    },
  },
  {
    id: 6,
    charity: {
      id: 5,
      name: "Turkey DAO",
      wallet: "0x222222",
      website: "https://www.doctorswithoutborders.org/",
      facebook: "social media",
      discord: "social media",
      twitter: "social media",
      instagram: "social media",
      imageurl: "https://picsum.photos/id/1000/400/300",
      description:
        "Doctors Without Borders provides emergency medical assistance to people affected by conflict, epidemics, disasters, or exclusion from healthcare.",
    },
    name: "Turkey Emergency Relief",
    description:
      "This project aims to provide asistance to people affected by the recent earthquake in Turkey.",
    milestones:
      "1. Deploy emergency medical teams to crisis areas, 2. Treat patients and provide necessary medical supplies, 3. Save lives and alleviate suffering.",
    financialGoal: 100000,
    totaldonated: 50000,
    website: "https://example.com/",
    facebook: "social media",
    discord: "social media",
    twitter: "social media",
    instagram: "social media",
    imageurl: "https://picsum.photos/id/500/400/300",
    angelimpactor: {
      wallet: "0x444444",
      name: "Jane Smith",
      description: null,
      website: null,
      facebook: "social media",
      discord: "social media",
      twitter: null,
      instagram: null,
      imageurl: "https://picsum.photos/id/1028/200/200",
      role: 2,
      type: 1,
    },

    primarycausetype: {
      id: 3,
      name: "Disaster Relief",
    },
    secondarycausetype: {
      id: 1,
      name: "Social",
    },
  },
];*/

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
  const dbMockData = useGetAllProjects();
  const [filteredData, setFilteredData] = useState(/*mockdata*/ dbMockData);
  const [filteredDataNum, setFilteredDataNum] = useState(dbMockData.length);
  const [resetPage, setResetPage] = useState(false);
  const [searchQuery, setSearch] = useState("");
  const [tag, setTag] = useState("General");
  var projects = filteredData.map((article) => (
    <ProjectComponent
      name={article.name}
      description={article.description}
      imageurl={article.imageurl}
      financialgoal={article.financialgoal}
      totaldonated={article.totaldonated}
      primarycausetype={article.primarycausetype}
      secondarycausetype={article.secondarycausetype}
      charity={article.charity}
      id={article.id}
      milestones={null}
      website={null}
      facebook={null}
      discord={null}
      twitter={null}
      instagram={null}
      angelimpactor={article.angelimpactor}
    ></ProjectComponent>
  ));

  useEffect(() => {
    const startIndex = activePage === 1 ? 0 : 4 * (activePage - 1);
    const endIndex = 4 * activePage;

    const filterProjects = (tag: string, searchQuery: string) => {
      const dbFiltered = /*mockdata*/ dbMockData.filter((project) => {
        const { primarycausetype, secondarycausetype, name, description } =
          project;

        if (
          tag.toLowerCase() === "general" ||
          secondarycausetype.name === tag.toLowerCase() ||
          primarycausetype.name === tag.toLowerCase()
        ) {
          if (!searchQuery) {
            return true;
          }

          const lowerCaseQuery = searchQuery.toLowerCase();
          const lowerCaseName = name.toLowerCase();
          const lowerCaseDescription = description?.toLowerCase() ?? "";

          return (
            lowerCaseName.includes(lowerCaseQuery) ||
            lowerCaseDescription.includes(lowerCaseQuery)
          );
        }

        return false;
      });

      setFilteredDataNum(Math.ceil(dbFiltered.length / 4))
      return dbFiltered;
    };

    setFilteredData(
      filterProjects(tag, searchQuery).slice(startIndex, endIndex)
    );

    projects = filteredData.map((article) => (
      <ProjectComponent
        name={article.name}
        description={article.description}
        imageurl={article.imageurl}
        financialgoal={article.financialgoal}
        totaldonated={article.totaldonated}
        primarycausetype={article.primarycausetype}
        secondarycausetype={article.secondarycausetype}
        charity={article.charity}
        id={article.id}
        milestones={null}
        website={null}
        facebook={null}
        discord={null}
        twitter={null}
        instagram={null}
        angelimpactor={article.angelimpactor}
      ></ProjectComponent>
    ));

    if (resetPage) {
      setPage(1)
      setResetPage(false)
    }
    
    return () => {
      // cleanup function here
    };
  }, [activePage, tag, searchQuery, dbMockData]);

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
        value={searchQuery}
        onChange={(event) => setSearch(event.currentTarget.value)}
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
            "Ecosystem",
          ]}
          classNames={classes}
          value={tag}
          onChange={(tag) => { setResetPage(true); setTag(tag)}}
        />
      </Flex>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {projects}
      </SimpleGrid>
      <Pagination
        total={filteredDataNum}
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
