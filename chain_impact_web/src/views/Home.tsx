import { createStyles } from "@mantine/core";
import BiggestImpactors from "../components/BiggestImpactors";
import FAQ from "../components/FAQ";
import Hero from "../components/Hero";
import TagLeaderboard from "../components/TagLeaderboard";


const useStyles = createStyles((theme) => ({

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "400px",
        width: "100%",
    }

}));

export default function Home() {

    const { classes} = useStyles();

    return (
            <>
            <Hero/>
            <TagLeaderboard />
            <BiggestImpactors />
            <FAQ />
            
            </>
    );
}