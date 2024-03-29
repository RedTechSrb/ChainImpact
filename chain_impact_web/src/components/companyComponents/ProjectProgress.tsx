import { Text, Progress, Card, Container } from "@mantine/core";
import { Project } from "../../models/Project";

type ProgressProjectProps = {
  projectData: Project;
  mtVal: string;
  mbVal: string;
};

export function ProjectProgress({
  projectData,
  mtVal,
  mbVal,
}: ProgressProjectProps) {
  return (
    <Card
      withBorder
      radius="md"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      })}
      mt={mtVal}
      mb={mbVal}
    >
      <Text size="xl" weight={500} color={"#BBFD00"}>
        Currently donated: ${projectData.totaldonated.toLocaleString()}
      </Text>
      <Text size="sm" weight={100} color="white" mb="xs">
        Out of $USDC {projectData.financialgoal.toLocaleString()}
      </Text>
      <Progress
        value={
          ((projectData.totaldonated * 1.0) / projectData.financialgoal) * 100
        }
        label={
          Math.round(
            (((projectData.totaldonated * 1.0) / projectData.financialgoal) *
              100 +
              Number.EPSILON) *
              100
          ) /
            100 +
          "%"
        }
        size="xl"
        radius="xl"
      />
      <Text size="xl" weight={500} color={"#BBFD00"} mt="xs">
        Total backers: {projectData.totalbackers}
      </Text>
    </Card>
  );
}
