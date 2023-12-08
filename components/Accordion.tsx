import React, { useState, Dispatch, SetStateAction } from "react";
import { Checkbox } from "@nextui-org/react";
import { County, Lake, User } from "@/generated/graphql-frontend";

interface Props {
  defaultExpanded?: boolean;
  defaultChecked?: boolean;
  children: React.ReactNode;
  county: County;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AccordionItem: React.FC<Props> = ({
  defaultExpanded = false,
  defaultChecked = false,
  children,
  county,
  setUser,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const onClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsExpanded(true);
    if (e.target.checked) {
      setUser((prevUser) => {
        const prevLakes = prevUser?.lakes as Lake[];
        return { ...prevUser!, lakes: [...prevLakes, ...county.lakes] };
      });
    } else {
      setUser((prevUser) => {
        const currentCountyLakeIds = county.lakes.map(({ id }) => id);
        const prevUserLakes = prevUser?.lakes as Lake[];
        console.log("Prev Lakes", prevUserLakes);
        const newLakes = prevUserLakes.filter(
          (prevLake) => !currentCountyLakeIds.includes(prevLake.id)
        );
        return {
          ...prevUser!,
          lakes: newLakes,
        };
      });
    }
  };
  return (
    <div className="h-full">
      <div className="flex flex-row items-center cursor-pointer">
        <div>
          <Checkbox
            defaultSelected={defaultChecked}
            onChange={onClickCheckbox}
          />
        </div>
        <div
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {county.name}
        </div>
      </div>
      <div className="pl-10">{isExpanded && <>{children}</>}</div>
    </div>
  );
};

export default AccordionItem;
