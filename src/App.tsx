import { useState } from "react";
import { CartItemType } from "./types/CartItemType";
import getApi from './service/api';
import { useQuery } from "react-query";

// components
import { Item } from "./components/Item/Item";
import Cart from "./components/Cart/Cart";

// material ui
import { Drawer } from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { AddShoppingCart } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

// styles
import { Wrapper, StyledButton } from "./App.styles";

const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItem, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getApi
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acum: number, item) => acum + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acum, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acum;
          return [...acum, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acum, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;

  if (error) return <div>Algo deu errado!</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItem}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItem)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
