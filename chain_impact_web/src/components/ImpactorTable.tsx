import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Select,
  ScrollArea,
  Title,
} from "@mantine/core";

interface UsersTableProps {
  title: string;
  data: {
    avatar: string;
    name: string;
    job: string;
    email: string;
    role: string;
    amount: number;
  }[];
  titlecolor: string;
}

const rolesData = ["Manager", "Collaborator", "Contractor"];

export default function ImpactorTable({
  data,
  title,
  titlecolor,
}: UsersTableProps) {
  const rows = data.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.avatar} radius={40} />
          <div>
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
            <Text size="xs" color="dimmed">
              {item.email}
            </Text>
          </div>
        </Group>
      </td>
      <td>{item.amount}</td>
    </tr>
  ));

  return (
    <div>
      <Badge style={{ textAlign: "center", color: titlecolor }} size="lg">
        {title}
      </Badge>
      <ScrollArea>
        <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>Company</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}
