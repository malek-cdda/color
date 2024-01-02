"use client";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log(document.getElementsByTagName("div"));
  }, []);
  return (
    <div>
      <p>thi is home wow</p>
      <p>thi is home wow</p>
      <p>thi is home wow</p>
      <p>thi is home wow</p>
      <p>thi is home wow</p>
      <p>thi is home wow</p>
      <p>thi is home wow</p>
    </div>
  );
};

export default Home;
