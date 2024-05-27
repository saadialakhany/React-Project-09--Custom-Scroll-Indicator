import React, { useState, useEffect } from "react";
import "./style.css";

const CustomScrollIndicator = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://dummyjson.com/products?limit=194&select=title"
      );
      const data = await response.json();

      if (data && data.products && data.products.length > 0) {
        setProductList(data.products);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="scroll--container">
        <h1>Custom Scroll Indicator</h1>
      </div>
      <div className="scroll-bar"></div>

      <div className="list--container">
        {productList && productList.length > 0
          ? productList.map((item) => {
              return <h3 key={item.id}>{item.title}</h3>;
            })
          : null}
      </div>
    </>
  );
};

export default CustomScrollIndicator;
