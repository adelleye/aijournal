"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Sometimes I move")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Sometimes I groove")
          .start();
      }}
    />
  );
};
export default TypewriterTitle;
