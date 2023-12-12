import React from "react";
import { Lake } from "@/generated/graphql-frontend";
import FormatLakeName from "@/app/utils/strings";

interface Props {
  lakes: Lake[];
}

const MyLakes: React.FC<Props> = ({ lakes }) => {
  return lakes.length > 0 ? (
    <>
      <h1>My Lakes</h1>
      <div className="flex flex-wrap">
        {lakes.map((lake) => (
          <div key={lake.id} className="w-1/2 ">
            {FormatLakeName(lake.name!)}
          </div>
        ))}
      </div>
    </>
  ) : (
    <h1>
      You aren&apos;t subscribed to any lakes yet. Add lakes to your
      subscription below.
    </h1>
  );
};

export default MyLakes;
