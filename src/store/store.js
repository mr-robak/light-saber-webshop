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
        // console.log("payload", sabers);
        const newState = { ...state, ...sabers, isLoading: false };
        return newState;
      }
      case "USER_LOGIN": {
        const newState = { ...state, user: { ...action.payload } };
        // console.log("reducer", newState);
        return newState;
      }
      case "LOGOUT": {
        const newState = {
          isLoading: true,
          saber: state.sabers,
        };
        console.log("oldState store", state);
        console.log("newState store1", newState);
        return newState;
      }
      case "ADD_TO_CART": {
        const itemId = action.payload;

        // if (!state.cart) {
        //   console.log("creating cart in store!");
        //   console.log("newState", {
        //     ...state,
        //     cart: [{ id: itemId, amount: 1 }],
        //   });
        //   return { ...state, cart: [{ id: itemId, amount: 1 }] };
        // }

        // state.cart.find(cartProd => cartProd.id === item.id);
        // const index = state.cart.findIndex(
        //   (cartItem) => (cartItem.id = itemId)
        // );
        // console.log("old state", state);
        // console.log("found product in cart at index", index);
        // if (state.cart && index !== -1) {
        //   console.log("if index !== -1");
        //   state.cart[index].amount += 1;
        //   const newState = { ...state, cart: [...state.cart] };
        //   console.log("New state after adding found by id", newState);
        //   return newState;
        // }
        // else {
        //   return { ...state, ...state.cart.push({ id: itemId, amount: 1 }) };
        // }
        const product = state.cart.find((p) => p.id === itemId);
        if (product) {
          const newCart = state.cart.map((p) =>
            p.id === itemId ? { ...p, amount: p.amount + 1 } : p
          );
          console.log("newCart", newCart);
          return { ...state, cart: newCart };
        } else {
          return { ...state, cart: [...state.cart, { id: itemId, amount: 1 }] };
        }
      }
      case "ADD_TO_CART1": {
        const itemId = action.payload;
        // console.log(itemId);

        // if (!state.cart) {
        //   return { ...state, cart: [itemId] };
        // }

        // // state.cart.find(cartProd => cartProd.id === item.id);
        // const index = state.cart.findIndex(
        //   (cartItem) => (cartItem.id = itemId)
        // );

        // if (index !== -1) {
        //   state.cart[index].amount += 1;
        //   const newState = { ...state, ...state.cart };
        //   return newState;
        // } else {
        //   return { ...state, ...state.cart.push({ id: itemId, amount: 1 }) };
        // }
        return state;
      }

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
