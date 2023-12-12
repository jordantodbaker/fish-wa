const capitalizeFirstChar = (name: string): string => {
  const parts = name.split(" ");
  const result = parts.map((part) => {
    const lake = part.toLowerCase();
    const firstLetter = lake.substr(0, 1).toUpperCase();
    const rest = lake.substr(1);
    return `${firstLetter}${rest}`;
  });

  return result.join(" ");
};

const FormatLakeName = (name: string) => {
  if (typeof name === "undefined") {
    return;
  }
  const PDWithPond = name.replace(/ PD /, " Pond ");
  const LKWithLake = PDWithPond.replace(/LK/, " Lake ");

  const shortCountyRemoved = LKWithLake.replace(/ \(.*?\).?/, "");
  return capitalizeFirstChar(shortCountyRemoved);
};

export default FormatLakeName;
