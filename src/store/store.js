import React, { createContext, useReducer } from "react";

// const testData = {
//   sabers: [
//     {
//       id: 4456,
//       name: "Sith Saber",
//       available: 27,
//       crystal: {
//         name: "Kadril saber",
//         color: "red",
//         planet: 13,
//       },
//     },
//     {
//       id: 7766,
//       name: "Master Jedi Saber",
//       available: 13,
//       crystal: {
//         name: "Obi Wan saber",
//         color: "green",
//         planet: 12,
//       },
//     },
//   ],
// };

const initialState = {
  isLoading: true,
  cart: [],
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "PRODUCTS_FETCHED": {
        const sabers = { ...action.payload };
        // console.log("payload", action.payload);
        const newState = { ...state, ...sabers, isLoading: false };
        return newState;
      }
      case "USER_LOGIN": {
        const newState = { ...state, user: { ...action.payload } };
        // console.log("reducer", newState);
        return newState;
      }
      case "LOGOUT": {
        console.log("!!!!!!!!!!!", state);
        const newState = {
          isLoading: false,
          sabers: [...state.sabers],
          cart: [],
        };
        // console.log("oldState store", state);
        // console.log("newState store1", newState);
        return newState;
      }
      case "ADD_TO_CART": {
        const { id } = action.payload;

        // console.log("ADD_TO_CART", action.payload);
        const productInCart = state.cart.find((product) => product.id === id);
        if (productInCart) {
          const updatedCart = state.cart.map((product) =>
            product.id === id
              ? { ...product, amount: product.amount + 1 }
              : product
          );
          // console.log("newCart", updatedProduct);
          return { ...state, cart: [...updatedCart] };
        } else {
          return {
            ...state,
            cart: [...state.cart, { ...action.payload, amount: 1 }],
          };
        }
      }
      case "DEDUCT_FROM_CART": {
        const { id } = action.payload;
        console.log("DEDUCT_FROM_CART", action.payload);

        const productInCart = state.cart.find((product) => product.id === id);
        console.log("productInCart", productInCart);
        const updatedCart =
          parseInt(productInCart.amount) === 1
            ? state.cart.filter((i) => i.id !== id)
            : state.cart.map((i) =>
                i.id === id ? { ...i, amount: i.amount - 1 } : i
              );
        console.log("newCart after deduct", updatedCart);
        return { ...state, cart: [...updatedCart] };
      }
      case "EMPTY_CART": {
        console.log("EMPTY_CART");
        return { ...state, cart: [] };
      }

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
