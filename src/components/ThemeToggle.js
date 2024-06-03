import React, { useEffect } from 'react';
import { useColorMode, Switch, FormControl, FormLabel } from '@chakra-ui/react';

const ThemeToggle = () => {
  const { colorMode, setColorMode, toggleColorMode } = useColorMode();

  // Function to handle theme toggle and store it in local storage
  const handleToggle = () => {
    toggleColorMode();
    localStorage.setItem('color-mode', colorMode === 'light' ? 'dark' : 'light');
  };

  // Set the initial color mode from local storage
  useEffect(() => {
    const storedColorMode = localStorage.getItem('color-mode');
    if (storedColorMode && storedColorMode !== colorMode) {
      setColorMode(storedColorMode);
    }
  }, [colorMode, setColorMode]);

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel mb="0">Dark Mode</FormLabel>
      <Switch isChecked={colorMode === 'dark'} onChange={handleToggle} />
    </FormControl>
  );
};

export default ThemeToggle;
