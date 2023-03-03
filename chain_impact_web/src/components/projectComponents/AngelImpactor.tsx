import { Avatar, Text, Button, Paper } from "@mantine/core";

interface UserInfoActionProps {
  imageurl: string;
  name: string;
  wallet: string;
}

export default function AngelImpactor({
  imageurl,
  name,
  wallet,
}: UserInfoActionProps) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={imageurl} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        wallet
      </Text>

      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
}
