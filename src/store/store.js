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
      case "LOGIN": {
        const newState = { ...state, user: { ...action.payload } };
        console.log("newState", newState);
        // return newState;
        // console.log("reducer", action.payload);
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
