import React from 'react';
import { useColorMode, Switch, FormControl, FormLabel } from '@chakra-ui/react';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel mb="0">Dark Mode</FormLabel>
      <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
    </FormControl>
  );
};

export default ThemeToggle;
