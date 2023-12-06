import React from "react";
import { Lake } from "@/generated/graphql-frontend";

interface Props {
  lakes: Lake[];
}

const MyLakes: React.FC<Props> = ({ lakes }) => {
  return lakes.length > 0 ? (
    <>
      <h1>My Lakes</h1>
      {lakes.map((lake) => (
        <p key={lake.id}>{lake.name}</p>
      ))}
    </>
  ) : (
    <h1>
      You aren&apos;t subscribed to any lakes yet. Add lakes to your
      subscription below.
    </h1>
  );
};

export default MyLakes;
