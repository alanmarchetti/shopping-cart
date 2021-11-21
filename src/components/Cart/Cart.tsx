import { Wrapper } from "./Cart.styles";
import { CartItem } from "../CartItem/CartItem";
import { CartItemType } from "../../types/CartItemType";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clicked: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const total = (items: CartItemType[]) =>
    items.reduce((acum: number, item) => acum + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Shopping cart</h2>
      {cartItems.length === 0 ? <p> Sem itens no carrinho </p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: R${total(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
