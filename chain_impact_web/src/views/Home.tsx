import { createStyles } from "@mantine/core";
import BiggestImpactors from "../components/BiggestImpactors";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";
import ProjectExplorer from "../components/ProjectExplorer";
import TagLeaderboard from "../components/TagLeaderboard";
import Testimonials from "../components/Testimonials";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "400px",
    width: "100%",
  },
}));

const testimonialsData =
  {
    supTitle: "Use cases",
    description:
      "Its lungs contain an organ that creates electricity. The crackling sound of electricity can be heard when it exhales. Azurill’s tail is large and bouncy. It is packed full of the nutrients this Pokémon needs to grow.",
    data: [
      {
        image: "auditors",
        title: "Pharmacists",
        description:
          "Azurill can be seen bouncing and playing on its big, rubbery tail",
      },
      {
        image: "lawyers",
        title: "Lawyers",
        description:
          "Fans obsess over the particular length and angle of its arms",
      },
      {
        image: "accountants",
        title: "Bank owners",
        description:
          "They divvy up their prey evenly among the members of their pack",
      },
      {
        image: "others",
        title: "Others",
        description: "Phanpy uses its long nose to shower itself",
      },
    ],
  };

export default function Home() {
  const { classes } = useStyles();

  return (
    <>
      <Hero />
      <TagLeaderboard />
      <BiggestImpactors />
      <ProjectExplorer />
      <FAQ />
      <Testimonials supTitle={testimonialsData.supTitle} description={testimonialsData.description} data={testimonialsData.data} />
    </>
  );
}
