import React, { createContext, useReducer } from "react";

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
        const newState = { ...state, ...sabers, isLoading: false };
        return newState;
      }
      case "ORDERS_FETCHED": {
        const orders = { ...action.payload };
        const newState = { ...state, ...orders, isLoading: false };
        return newState;
      }
      case "USER_LOGIN": {
        const newState = { ...state, user: { ...action.payload } };
        return newState;
        // return state;
      }
      case "LOGOUT": {
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
        const productInCart = state.cart.find((product) => product.id === id);
        const updatedCart =
          parseInt(productInCart.amount) === 1
            ? state.cart.filter((i) => i.id !== id)
            : state.cart.map((i) =>
                i.id === id ? { ...i, amount: i.amount - 1 } : i
              );
        return { ...state, cart: [...updatedCart] };
      }
      case "EMPTY_CART": {
        return { ...state, cart: [] };
      }
      case "ADD_TO_STOCK": {
        const id = parseInt(action.payload);

        const newStock = state.sabers.map((saber) => {
          return saber.id === id
            ? { ...saber, available: saber.available + 1 }
            : saber;
        });
        return { ...state, sabers: newStock };
      }
      case "DEDUCT_FROM_STOCK": {
        const id = parseInt(action.payload);

        const newStock = state.sabers.map((saber) => {
          return saber.id === id
            ? saber.available === 0
              ? { ...saber, available: 0 }
              : { ...saber, available: saber.available - 1 }
            : saber;
        });
        return { ...state, sabers: newStock };
      }

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
