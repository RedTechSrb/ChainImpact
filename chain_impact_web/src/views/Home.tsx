import { createStyles } from "@mantine/core";
import BiggestImpactors from "../components/BiggestImpactors";
import FAQ from "../components/FAQ";


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
            <BiggestImpactors />
            <FAQ />
        </>
    );
}