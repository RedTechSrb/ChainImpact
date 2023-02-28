import './App.css';
import { ColorScheme, ColorSchemeProvider, Container, MantineProvider } from '@mantine/core';
import Header from './components/Header';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import Footer, { FooterSimpleProps } from './components/Footer';
import { Route, Routes } from "react-router-dom";
import About from './views/About';
import NotFound from './views/NotFound';
import Home from './views/Home';
import { useState } from 'react';
import React from 'react';

import { Program, Provider, web3 } from '@coral-xyz/anchor';
console.log(window);
const { SystemProgram, Keypair } = web3;
const footerProps: FooterSimpleProps = {
  links: [
    { link: 'link1', label: 'Contact'},
    { link: 'link2', label: 'Terms & Conditions'},
  ]
}

declare global {
  interface Window {
      solana: any;
  }
}

window.solana = require('@solana/web3.js');


function App() {

  // Theme settings
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  // theme settings


  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{
          globalStyles: (theme) => ({
            'body': {
              backgroundColor: colorScheme === 'dark' ? "yellow" : "white",
              color: colorScheme === 'dark' ? "white" : "yellow",
              
            },
          }),
          colorScheme, 
          fontFamilyMonospace: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
          }}
          withCSSVariables withGlobalStyles withNormalizeCSS
      >
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
