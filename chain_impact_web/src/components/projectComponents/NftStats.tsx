import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
  Image,
  Grid,
  Flex,
} from "@mantine/core";
import { IconCurrencyDollar, IconPictureInPicture } from "@tabler/icons";
import { useEffect, useState } from "react";
import { ImpactorWalletSearch } from "../../models/dto/request/ImpactorWalletSearch";
import { Impactor } from "../../models/Impactor";
import { getSpecificImpactor } from "../../repositories/ImpactorRepository";
import { useGetNextTierNFTs } from "../../repositories/NFTRepository";

interface StatsRingProps {
  projectId: number;
  wallet: string;
  donationAmount: number;
  primaryType: string;
}


export function NftStats({ projectId, wallet, donationAmount, primaryType }: StatsRingProps) {
  
  const [impactor, setImpactor] = useState<Impactor>();
  let impactorData: Promise<any>;
  
  const nextTierNftSearch = {
    projectId: projectId,
    wallet: wallet
  }
  console.log(nextTierNftSearch)

  let dataNftNew: any[] = useGetNextTierNFTs(nextTierNftSearch);
  console.log(dataNftNew);

  function setImpactorData() {
    impactorData = getSpecificImpactor(
        new ImpactorWalletSearch(null, null, wallet)
      )
    impactorData.then(data => {
      setImpactor(data);
    });
  }
  console.log(impactor)


  useEffect(() => {
    setImpactorData()
  }, []);

  const companyTiers = [ 1000, 5000, 20000, 50000 ];
  const nonCompanyTiers = [ 50, 200, 1000, 5000 ];

  const stats = dataNftNew.map((stat, index) => {
    return (
      <Paper withBorder p="xs" key={(Math.random()*1000000+1)} style={{display: "flex"}}>
        <Grid style={{justifyContent: "center", margin: "auto"}}>
          { stat.amountleft > 0 &&
            (<Grid.Col span={6} style={{margin: "auto"}}>
              <Image
                src={stat.imageurl}
                mx="auto"
              />
            </Grid.Col>)}
          
          { stat.amountleft > 0 &&
            (<Grid.Col span={6}>
              <Center>
                <Flex
                  mih={50}
                  gap="xs"
                  justify="flex-start"
                  align="flex-start"
                  direction="column"
                  wrap="wrap"
                >
                  <RingProgress
                    size={60}
                    roundCaps
                    thickness={8}
                    sections={[{ value:
                        (impactor?.type === 0   // if impactor is company
                          ? ((companyTiers[stat.tier - 1] - stat.amountleft + donationAmount)
                            / companyTiers[stat.tier - 1]) * 100
                          : ((nonCompanyTiers[stat.tier - 1] - stat.amountleft + donationAmount)
                            / nonCompanyTiers[stat.tier - 1]) * 100
                          ), color: (donationAmount < stat.amountleft) ? "red" : "#33860c" }]}
                    label={
                      <Center>
                        <IconCurrencyDollar size="1.4rem" stroke={1.5} />
                      </Center>
                    }
                  />

                  <div>
                    <Text
                      color="dimmed"
                      size="xs"
                      transform="uppercase"
                      weight={700}
                      align="center"
                    >
                      {index === 0 ? " "+primaryType.toUpperCase() : " GENERAL"}
                    </Text>
                    { donationAmount < stat.amountleft ? (
                      <Text weight={700} size="md" align="center">
                        You need {stat.amountleft - donationAmount} {" "}
                        more to claim Tier {stat.tier} NFT for this cause
                      </Text>
                    ) : (
                      <Text weight={700} size="md" align="center">
                        You can now claim your Tier {stat.tier} NFT!
                      </Text>
                    )}
                  </div>
                </Flex>
              </Center>
            </Grid.Col> )}
          { stat.amountleft === 0 &&
            <Grid.Col span={12} style={{margin: "auto"}}>
                <Flex align="center" direction="column" justify="center" style={{margin: "0px auto"}}>
                  <Text color="dimmed"
                      size="xs"
                      transform="uppercase"
                      weight={700}
                      align="center"
                      style={{justifyContent: "center"}}>
                    {index === 0 ? " "+primaryType.toUpperCase() : " GENERAL"}
                  </Text>
                  <Text weight={700} size="lg" align="center">
                    You already have MAX Tier NFT
                  </Text>
                </Flex>
            </Grid.Col>
          }
        </Grid>
      </Paper>
    );
  });

  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
}
