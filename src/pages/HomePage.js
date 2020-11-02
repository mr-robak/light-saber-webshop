import React from "react";
import ProductCard from "../components/ProductCard";
import data from "../data/sabers.json";

// let data = {
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

export default function HomePage() {
  const renderCard = (data) => {
    return data.sabers.map((product, index) => {
      // console.log("rendered at HomePage", index, product.name);
      return <ProductCard data={product} key={index} />;
    });
  };

  return (
    <div className="HomePage">
      {data ? renderCard(data) : console.log("loading...")}
      {/* {data && renderCard(data)} */}
      {/* <p>{data.sabers[0].name}</p> */}
    </div>
  );
}
