import './App.css';
import { ColorScheme, ColorSchemeProvider, Container, MantineProvider } from '@mantine/core';
import Header from './components/Header';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import Footer, { FooterSimpleProps } from './components/Footer';
import { Route, Routes } from "react-router-dom";
import About from './views/About';
import NotFound from './views/NotFound';
import Home from './views/Home';


const footerProps: FooterSimpleProps = {
  links: [
    { link: 'link1', label: 'Contact'},
    { link: 'link2', label: 'Terms & Conditions'},
  ]
}


function App() {

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{colorScheme}}>
        <Header />
          <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<About />} />
              <Route path="/*" element={<NotFound />} />
          </Routes>

        <Footer links={footerProps.links} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
