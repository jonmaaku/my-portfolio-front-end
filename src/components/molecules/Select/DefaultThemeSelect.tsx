import { useCustomThemeContext } from '@/contexts/CustomThemeContext/CustomThemeContext';
import { FormControl, FormLabel, useColorScheme, Select, MenuItem } from '@mui/material';

export default function DefaultThemeSelect() {
  const { mode, setMode, systemMode } = useColorScheme();
  const { mode: customMode, setMode: setCustomMode } = useCustomThemeContext();

  return (
    <>
      <FormControl>
        <FormLabel id="demo-theme-toggle">Theme</FormLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          label="Theme"
          onChange={event => {
            setMode(event.target.value as 'system' | 'light' | 'dark');
            setCustomMode(event.target.value as 'system' | 'light' | 'dark');
          }}
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
