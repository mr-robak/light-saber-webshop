import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { store } from "../store/store.js";

export default function HomePage() {
  const { state } = useContext(store);

  // console.log(state.isLoading);

  const renderCards = () => {
    return state.sabers.map((product, index) => {
      console.log("rendered at HomePage", index, product.name);
      return <ProductCard data={product} key={index} />;
    });
  };

  return (
    <div className="HomePage">
      {state && state.isLoading ? <Loading /> : renderCards()}
    </div>
  );
}
