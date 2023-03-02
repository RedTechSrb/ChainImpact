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

const testimonialsData = {
  supTitle: "They already trust investing into ESG",
  description:
    "Web2 companies are so reputable because of their long history of giving back.   Show them how we can do the same in Web3.",
  data: [
    {
      image: "google.png",
      title: "Google",
    },
    {
      image: "microsoft.png",
      title: "Microsoft",
    },
    {
      image: "apple.png",
      title: "Apple",
    },
    {
      image: "amazon.png",
      title: "Amazon",
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
      <Testimonials
        supTitle={testimonialsData.supTitle}
        description={testimonialsData.description}
        data={testimonialsData.data}
      />
    </>
  );
}