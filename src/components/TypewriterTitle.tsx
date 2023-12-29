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
          .typeString(
            "Dive into a new depth of self-awareness with AI that understands you."
          )
          .pauseFor(1000)
          .deleteAll()
          .typeString(
            "From fleeting thoughts to profound insights, your journal is your journey."
          )
          .start();
      }}
    />
  );
};
export default TypewriterTitle;
