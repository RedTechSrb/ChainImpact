import "./App.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  Container,
  MantineProvider,
} from "@mantine/core";
import Header from "./components/Header";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import About from "./views/About";
import NotFound from "./views/NotFound";
import Home from "./views/Home";

const footerPlaceholder = [
  {
    title: "About",
    links: [
      {
        label: "Features",
        link: "#",
      },
      {
        label: "Pricing",
        link: "#",
      },
      {
        label: "Docs",
        link: "#",
      },
    ],
  },
  {
    title: "Project",
    links: [
      {
        label: "About",
        link: "#",
      },
      {
        label: "Contribute",
        link: "#",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        label: "Join Discord",
        link: "#",
      },
      {
        label: "Follow on Twitter",
        link: "#",
      },
      {
        label: "Email newsletter",
        link: "#",
      },
      {
        label: "GitHub",
        link: "#",
      },
    ],
  },
];

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<About />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>

        <Footer data={footerPlaceholder} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
