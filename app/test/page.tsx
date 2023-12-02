//TODO: Run from command prompt and remove

import React from "react";

interface Country {
  name: string;
  capitol: string;
}

interface CountriesMap {
  contries: Country[];
}

interface Props {
  data: Country[];
}

const correctCapitols = () => {
  return [
    { name: "test", capitol: "test" },
    { name: "test1", capitol: "test2" },
    { name: "test3", capitol: "test3" },
  ];
};
console.log({ correctCapitols });

const Bisky: React.FC<Props> = ({ data }) => {
  const randomCountryKeys = [];
  const randomCapitolKeys = [];

  const countries = correctCapitols();
  for (var i = countries.length; i > 0; i--) {
    randomCountryKeys.push(Math.floor(Math.random() * i));
  }
  console.log(randomCountryKeys);

  return <>Dumb</>;
};

export default Bisky;
