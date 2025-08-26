import {AppBar, Toolbar, Typography, Box, IconButton, Badge, Stack, Button} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router";

const links = [
  { label: "Home", path: "/" },
  { label: "Catalog", path: "/catalog" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Error", path: "/error" },
];

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': { color: 'text.primary' },
  '&.active': { color: 'warning.main' },
};

export default function Header(){
  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">
            E-Commerce App 
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginLeft: 4 }}>
            {links.map((link) => (
              <Button component={NavLink} to={link.path} key={link.label} sx={navStyles}>
                {link.label}
              </Button>
            ))}
          </Stack>
        </Box>

        <Box >
          <IconButton size="large" edge="end" color="inherit" >
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}