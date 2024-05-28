import React, { useState, useEffect } from "react";
import "./style.css";

const CustomScrollIndicator = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

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

  const handleScrollPercentage = () => {
    // console.log(
    //   document.body.scrollTop,
    //   document.documentElement.scrollTop,
    //   document.documentElement.scrollHeight,
    //   document.documentElement.clientHeight
    // );
    const howMuchScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage((howMuchScrolled / height) * 100);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (loading) return <div>Data is Loading. Please wait!</div>;

  //   console.log(scrollPercentage);
  return (
    <>
      <div className="scroll--container">
        <h1>Custom Scroll Indicator</h1>
        <div className="scroll-bar">
          <div
            className="current-progress-bar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

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
