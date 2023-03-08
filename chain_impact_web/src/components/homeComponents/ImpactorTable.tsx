import {
  Avatar,
  Badge,
  createStyles,
  Group,
  Modal,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetImpactorsWithDonations } from "../../repositories/ImpactorRepository";

interface UsersTableProps {
  title: string;
  data: {
    avatar: string;
    name: string;
    job: string;
    wallet: string;
    role: string;
    amount: number;
  }[];
  titlecolor: string;
  type: string;
  isPrivate: boolean;
}

const rolesData = ["Manager", "Collaborator", "Contractor"];

const useStyles = createStyles((theme) => ({
  badge: {
    textAlign: "center",
    color: "titlecolor",
    cursor: "pointer",
  },

  link: {
    textDecoration: "none",
    "&:hover": {
      borderBottomColor: "#5A96AE",
    },
  },
}));

export default function ImpactorTable({
  data,
  title,
  titlecolor,
  type,
  isPrivate,
}: UsersTableProps) {
  const [hovered, setHovered] = useState(false);

  function arangeData(data: any, arangeFromAPI: boolean) {
    let impactorData = data;
    if (arangeFromAPI) {
      impactorData = data.map((impactor: any) => ({
        avatar: impactor.imageUrl
          ? impactor.imageUrl
          : "https://avatars.githubusercontent.com/u/1309537?v=4",
        name: impactor.name,
        job: "",
        wallet: impactor.wallet,
        role: "Company",
        amount: impactor.totalDonations,
      }));
    }

    const rows = impactorData.map((item: any) => (
      <tr key={item.name}>
        <td>
          <Link
            to={`/company/${item.wallet}`}
            style={{ textDecoration: "none", color: "#E4E5E8" }}
          >
            <Group spacing="sm">
              <Avatar size={40} src={item.avatar} radius={40} />
              <div>
                <Text size="sm" weight={500}>
                  {item.name}
                </Text>

                <Text
                  size="xs"
                  color="dimmed"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className={classes.link}
                >
                  {item.wallet.slice(0, 6) + "..." + item.wallet.slice(-6)}
                </Text>
              </div>
            </Group>
          </Link>
        </td>
        <td>
          <Text size="lg" fw={500}>
            ${item.amount}
          </Text>
        </td>
      </tr>
    ));

    return rows;
  }

  const dataAll = useGetImpactorsWithDonations(
    {
      pageNumber: null,
      pageSize: null,
      dto: {
        projectType: type,
      },
    },
    isPrivate
  );

  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  const rows = arangeData(data, false);
  const rowsModal = arangeData(dataAll, true);

  return (
    <div>
      <Modal
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? `rgba(37, 38, 43, 0.6)`
              : theme.white,
          color: "#C1C2C5",
        })}
        size="50%"
        opened={opened}
        onClose={close}
        title={"Top Impactors in " + type.toUpperCase() + " category"}
        centered
        radius={20}
      >
        <ScrollArea>
          <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
            <thead>
              <tr>
                <th>{isPrivate ? "Impactor" : "Company"}</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>{rowsModal}</tbody>
          </Table>
        </ScrollArea>
      </Modal>

      <Badge
        className={classes.badge}
        style={{ color: titlecolor, marginBottom: "15px" }}
        size="lg"
        onClick={open}
      >
        {title}
      </Badge>
      <ScrollArea
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        })}
        style={{ borderRadius: 20 }}
      >
        <Table
          sx={(theme) => ({
            minWidth: 400,
          })}
          verticalSpacing="sm"
        >
          <thead>
            <tr>
              <th>{isPrivate ? "Impactor" : "Company"}</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}
