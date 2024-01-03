"use client";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    var div = document.getElementsByTagName("div");
    var section = window.document.getElementsByTagName("section");
    var footer = document.getElementsByTagName("footer");
    var nav = document.getElementsByTagName("nav");

    // Loop through each <p> tag and set its style color to red
    for (var i = 0; i < section.length; i++) {
      section[i].style.background = "green";
    }
  }, []);
  return (
    <div>
      <section>
        <p>thi is home wow</p>
        <p>thi is home wow</p>
        <p>thi is home wow</p>
        <p>thi is home wow</p>
        <p>thi is home wow</p>
        <p>thi is home wow</p>
        <p>thi is home wow</p>
      </section>
    </div>
  );
};

export default Home;
