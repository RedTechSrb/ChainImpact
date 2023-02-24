import { createStyles } from "@mantine/core";


const useStyles = createStyles((theme) => ({

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        width: "100%",
    }

}));

export default function Home() {

    const { classes} = useStyles();

    return (
        <div className={classes.container}>
            <h2>Welcome to ChainImpact!</h2>
        </div>
    );
}