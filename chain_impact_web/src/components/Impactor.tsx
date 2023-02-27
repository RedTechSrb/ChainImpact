import { createStyles, Grid, SimpleGrid } from "@mantine/core";

const useStyles = createStyles((theme) => ({

    grid: {
        width: "100%",
        fontWeight: "bold",
        margin: "10px 0",
    },

    firstCol: {
        marginLeft: "20px",
    },

    centerCol: {
        marginLeft: "50px",
    },

    lastCol: {
        width: "50%",
        textAlign: "right",
        marginLeft: "25px",
    },

}));

export interface ImpactorProps {
    index: number,
    amount: number,
    name: string,
    address: string
}

export default function Impactor({index, amount, name, address}: ImpactorProps) {

    const { classes } = useStyles();

    return (
        <>

            <SimpleGrid cols={3} className={classes.grid}>
                <div className={classes.firstCol}>{index+1}. {name}</div>
                <div className={classes.centerCol}>{address}</div>
                <div className={classes.lastCol}>{amount}</div>
            </SimpleGrid>
            
        </>
    );
}