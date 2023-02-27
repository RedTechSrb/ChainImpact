import { createStyles, Grid } from "@mantine/core";
import { useGetRandomJoke } from "../repositories/JokesRepository";
import Impactor from "./Impactor";
import { ImpactorProps } from "./Impactor";
import Impactors from "./impactor/Impactors";


const useStyles = createStyles((theme) => ({

    // jokes: {
    //     border: "1px solid cyan",
    //     marginBottom: "30px",
    //     [theme.fn.smallerThan('md')]: {
    //         border: "1px solid yellow",
    //     }
    // },

    container: {
        //border: "1px solid red",
        width: "90%",
        margin: "auto",
    },

    gridColumn: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "uppercase",
        fontStyle: "italic",
        border: "2px solid black",
        backgroundColor: theme.colorScheme === 'dark' ? "#9945FF" : "#14F195",
        borderRadius: "50px",
        margin: "15px 0",
    },

    dissapearColumn: {
        [theme.fn.largerThan('lg')]: {
            display: "none",
        }
    },

    smallLeft: {
        [theme.fn.smallerThan('sm')]: {
            marginLeft: "15px",
        }
    },

    smallRight: {
        [theme.fn.smallerThan('sm')]: {
            marginRight: "15px",
        }
    },

}));

export default function BiggestImpactors(_props: any) {

    const { classes } = useStyles();
    //const joke = useGetRandomJoke("https://official-joke-api.appspot.com/random_joke");

    /*const com1 = companies.map((company, index) => {
        return(
            <Impactor 
                index = {index}
                amount = {company.amount}
                name = {company.name}
                address = {company.address}
            />
        );
    })*/

    return (
        <div style={{width: "100%"}}>
            {/* <div className={classes.jokes}>
            {
                joke ? (
                    <>
                        <h4>Joke of the day:</h4>
                            {joke?.setup}
                            {joke?.punchline}
                    </>
                ) : (
                    <>
                        <h4>Loading joke...</h4>
                    </>
                )
            }
            </div> */}


            <div className={classes.container}>
                <Grid>
                    <Grid.Col sm={2} lg={1}></Grid.Col>
                    <Grid.Col sm={8} lg={4} className={classes.gridColumn}>
                        <Impactors company={true}></Impactors>
                    </Grid.Col>
                    <Grid.Col sm={2} lg={0} className={classes.dissapearColumn}></Grid.Col>
                    <Grid.Col sm={2} lg={2}></Grid.Col>
                    <Grid.Col sm={8} lg={4} className={classes.gridColumn}>
                    <Impactors company={false}></Impactors>
                    </Grid.Col>
                    <Grid.Col sm={2} lg={1}></Grid.Col>
                </Grid>
            </div>
            
        </div>
    );
}