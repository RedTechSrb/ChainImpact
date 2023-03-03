import { createStyles, Title } from "@mantine/core";
import CharityExplorer from "../components/charitiesComponents/CharityExplorer";

const useStyles = createStyles((theme) => ({

    title: {
        textAlign: "center",
        minHeight: "500px"
    }

}));

export default function Charities() {

    const { classes } = useStyles();

    return (
        <div className={classes.title}>
            <CharityExplorer />
        </div>
    );
}