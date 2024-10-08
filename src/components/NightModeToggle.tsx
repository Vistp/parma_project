import { Box, IconButton } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import { useThemeContext } from "app/ThemeContextProvaider"

const NightModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Box>
      <IconButton sx={{ ml:1 }} onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
      </IconButton>
    </Box>
  )
}

export default NightModeToggle;