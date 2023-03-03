import { createStyles } from "@mantine/core";
import BiggestImpactors from "../components/homeComponents/BiggestImpactors";
import FAQ from "../components/homeComponents/FAQ";
import Hero from "../components/homeComponents/Hero";
import { Hero2 } from "../components/homeComponents/Hero2";
import ProjectExplorer from "../components/homeComponents/ProjectExplorer";
import Stats from "../components/homeComponents/Stats";
import TagLeaderboard from "../components/homeComponents/TagLeaderboard";
import Testimonials from "../components/homeComponents/Testimonials";

const statsdata = {
  data: [
    {
      title: "Total donated",
      value: "$134,456",
      diff: 20,
    },
    {
      title: "Projects funded",
      value: "40",
      diff: 13,
    },
    {
      title: "Companies involved",
      value: "60",
      diff: 18,
    },
  ],
};

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
  return (
    <>
      <Hero2 />
      <TagLeaderboard />
      <BiggestImpactors />
      <ProjectExplorer />
      <FAQ />
      <Testimonials
        supTitle={testimonialsData.supTitle}
        description={testimonialsData.description}
        data={testimonialsData.data}
      />
      <Stats data={statsdata.data}></Stats>
    </>
  );
}
