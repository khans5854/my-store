import {
  AppBar,
  IconButton,
  Menu,
  Stack,
  TextField,
  Toolbar,
  Typography,
  Badge
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { Cart } from "@modules/cart";
import { useHeader } from "./useHeader";
import { useCookiesState } from "@shared";

export const Header = () => {
  const {search, searchHandler,handleClick, anchorEl, handleClose} = useHeader();
  const {totalCount} = useCookiesState();


  return (
    <AppBar position="fixed">
      <Toolbar>
        <Stack flexDirection='row' justifyContent='space-between' alignItems='center' sx={{width: '100%'}}>
          <Typography variant="h6" component="div" sx={{
            whiteSpace: 'nowrap',
            mr: '8px'
          }}>
            My Store
          </Typography>
          <TextField
            id="product-search"
            variant="outlined"
            placeholder="Search for products"
            value={search}
            onChange={searchHandler}
            type='text'
            inputProps={{
              sx: {
                padding: "9.5px 14px",
              },
            }}
            InputProps={{
              startAdornment: <SearchIcon />
            }}
          />
          
          <IconButton onClick={handleClick}>
            <Badge badgeContent={totalCount} color="warning">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          
        </Stack>
      </Toolbar>
      <Menu
        id="cart view"
        aria-labelledby="cart view"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Cart/>
      </Menu>
    </AppBar>
  );
};
