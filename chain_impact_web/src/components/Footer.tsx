import { createStyles, Container, Group, Anchor, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconStar } from '@tabler/icons';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  footer: {
    //marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
    
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export interface FooterSimpleProps {
  links: { link: string; label: string }[];
}

export default function FooterSimple({ links }: FooterSimpleProps) {

const { classes } = useStyles();

  const theme = useMantineTheme();

  const items = links.map((link) => (
    <Container>
        <Link
        key={link.label}
        to={link.link}
        color={theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}
        style={{fontSize: "sm", textDecoration: "none", color: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.dark[5]}} 
        >
            {link.label}
        </Link>
    </Container>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <IconStar size={28} />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}