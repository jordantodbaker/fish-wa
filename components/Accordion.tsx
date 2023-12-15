import React, { useState, Dispatch, SetStateAction } from "react";
import { Checkbox } from "@nextui-org/react";
import { County, Lake, User } from "@/generated/graphql-frontend";

interface Props {
  defaultExpanded?: boolean;
  defaultChecked?: boolean;
  children: React.ReactNode;
  county: County;
  setUser: Dispatch<SetStateAction<User | null>>;
  setSelectedKeys: Dispatch<SetStateAction<Set<string>>>;
}

const AccordionItem: React.FC<Props> = ({
  defaultExpanded = false,
  defaultChecked = false,
  children,
  county,
  setUser,
  setSelectedKeys,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const onClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsExpanded(true);
    const countyKeys = county.lakes.map(({ id }) => `${id}`);
    if (e.target.checked) {
      setSelectedKeys((prev) => {
        return new Set([...prev, ...countyKeys]);
      });
    } else {
      setSelectedKeys((prev) => {
        return new Set([...prev].filter((id) => !countyKeys.includes(id)));
      });
    }
  };
  return (
    <div className="h-full w-3/4">
      <div className="flex flex-row items-center cursor-pointer">
        <div>
          <Checkbox
            defaultSelected={defaultChecked}
            onChange={onClickCheckbox}
          />
        </div>
        <div
          className="hover:bg-blue-50 w-full"
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
