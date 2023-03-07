import {
    Avatar,
    Text,
    Button,
    Paper,
    SimpleGrid,
    Container,
    Grid,
    createStyles,
    Image,
    Divider,
  } from "@mantine/core";
  import { Impactor } from "../../models/Impactor";
  import NftShowcaseCarousel from "../projectComponents/NftShowcaseCarousel";
  import RecentImpactors from "../projectComponents/RecentImpactors";
import ProofOfImpacts from "./ProofOfImpacts";
import SupportedProjects from "./SupportedProjects";
  
  interface CompanyDataProps {
    impactor: Impactor | null;
    totalbacked: number;
    totaldonated: number;
  }
  
  const useStyles = createStyles((theme) => ({
    angelimpactor: {
      fontSize: "2.2rem",
    },
    image: {
      maxHeight: "140px",
      maxWidth: "140px",
    },
  }));
  
  export default function CompanyData({
    impactor,
    totalbacked,
    totaldonated,
  }: CompanyDataProps) {
    const { classes } = useStyles();
  
    return (
      <Paper
        radius="md"
        p="md"
        // sx={(theme) => ({
        //   backgroundColor:
        //     theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        // })}
      >
        <Grid>
          <Grid.Col span={3}>
            <Image
              src="https://picsum.photos/id/1/200" //{impactor?.imageurl}
              radius={10}
              mx="auto"
              className={classes.image}
              style={{marginLeft: "0"}}
              pl={0}
            />
          </Grid.Col>
          <Grid.Col span={9} >
            <div>
              <Text ta="left" weight={500} className={classes.angelimpactor}>
                {impactor?.name}
              </Text>
              <Text ta="left" c="dimmed" fz="xl">
                Total donated: {totaldonated}
              </Text>
              <Text ta="left" c="dimmed" fz="lg">
                Projects involved in: {totalbacked}
              </Text>
              <Text ta="left" c="dimmed" fz="lg">
                Proof of Impact NFT's: 3
              </Text>
            </div>
          </Grid.Col>


          <Grid.Col span={12}>
            <Divider my="xs" label="Proof of Impacts" labelPosition="center" />
          </Grid.Col>
          
          <Grid.Col span={12} style={{width: "100%"}}>
            <ProofOfImpacts />
          </Grid.Col>

          <Grid.Col span={12}>
            <Divider my="xs" label="Supported projects" labelPosition="center" />
          </Grid.Col>

          <Grid.Col span={12}>
            <SupportedProjects></SupportedProjects>
          </Grid.Col>
        </Grid>
  
      </Paper>
    );
  }
  