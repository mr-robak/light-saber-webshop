import React from "react";

export default function ProductPage() {
  return (
    <div>
      <h1>ProductPage</h1>
    </div>
  );
}

// import React from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectProductById } from "../store/products/selectors";
// import Product from "../components/Product";

// export default function ProductPage() {
//   //get prod Id from route
//   const prodId = parseInt(useParams().id);
//   //get product details
//   const product = useSelector(selectProductById(prodId));
//   console.log("product", product);

//   return (
//     <div className="container my-3">
//       <Product
//         id={prodId}
//         url={product.imageUrl}
//         name={product.name}
//         price={product.price}
//         description={product.description}
//       />
//     </div>
//   );
// }
