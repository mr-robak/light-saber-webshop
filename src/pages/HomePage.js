import React, { useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { store } from "../store/store.js";
import data from "../data/sabers.json";

export default function HomePage() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    dispatch({ type: "PRODUCTS_FETCHED", payload: data });
  }, [dispatch]);

  const renderCard = (data) => {
    return data.sabers.map((product, index) => {
      // console.log("rendered at HomePage", index, product.name);
      return <ProductCard data={product} key={index} />;
    });
  };

  return (
    <div className="HomePage">{data ? renderCard(data) : <Loading />}</div>
  );
}
