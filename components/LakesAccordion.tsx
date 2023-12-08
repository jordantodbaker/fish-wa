"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button } from "@nextui-org/react";
import { AccordionItem } from "@/components";
import {
  County,
  User,
  Lake,
  StockingReport,
  useUpdateUserLakesMutation,
  useCountiesQuery,
} from "@/generated/graphql-frontend";
import { Listbox, ListboxItem } from "@nextui-org/react";

interface Props {
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const LakesAccordion: React.FC<Props> = ({ user, setUser }) => {
  const [updateUserLakes, { loading }] = useUpdateUserLakesMutation();

  const { data, loading: countiesLoading } = useCountiesQuery();
  const counties = data?.counties as [County];

  const lakes = user?.lakes! as Lake[];
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(lakes.map(({ id }) => `${id}`))
  );

  const selectedCounties =
    counties && counties.length > 0
      ? counties.filter((county) => {
          const ids = county.lakes.map(({ id }) => id);
          return lakes.filter((lake) => ids.includes(lake.id)).length > 0;
        })
      : [];

  const defaultSelected = selectedCounties.map((county) => `${county.id}`);

  const handleSubmit = async () => {
    if (user.id) {
      const lakeIds = Array.from(selectedKeys)
        .map((key) => parseInt(key))
        .filter((n) => n);
      try {
        setUser((prevUser) => {
          const newReports =
            typeof prevUser?.stockingReports !== "undefined" &&
            prevUser?.stockingReports != null
              ? (prevUser?.stockingReports.filter((report) =>
                  lakeIds.includes(report?.lakeId!)
                ) as [StockingReport])
              : [];

          const newLakes = counties
            .map((county) => {
              return county.lakes.filter((lake) => lakeIds.includes(lake.id));
            })
            .flat();
          return {
            ...prevUser,
            lakes: newLakes,
            stockingReports: newReports,
          } as User;
        });
        await updateUserLakes({
          variables: { input: { userId: user.id, lakeIds } },
        });
      } catch (e) {
        console.log(e);
      }
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (user.lakes) {
      const lakes = user.lakes as Lake[];
      const selectedLakes = new Set(lakes.map(({ id }) => `${id}`));
      setSelectedKeys(selectedLakes);
    }
  }, [user.lakes]);

  return countiesLoading ? (
    <>Loading...</>
  ) : (
    <>
      <>
        Select lakes by county to subscribe to them. When lakes are stocked you
        can be notified via email or text.
      </>
      <>
        {counties &&
          counties.map((county) => {
            return (
              <div key={county.id}>
                <AccordionItem
                  county={county}
                  setUser={setUser}
                  defaultExpanded={defaultSelected.includes(`${county.id}`)}
                  defaultChecked={county.lakes.every(({ id, name }) => {
                    return Array.from(selectedKeys).includes(`${id}`);
                  })}
                >
                  <Listbox
                    label={county.name}
                    variant="flat"
                    disallowEmptySelection={false}
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys as any}
                  >
                    {county.lakes.map((lake) => {
                      return (
                        <ListboxItem key={lake.id}>{lake.name}</ListboxItem>
                      );
                    })}
                  </Listbox>
                </AccordionItem>
              </div>
            );
          })}
        <Button disabled={loading} onClick={handleSubmit}>
          Subscribe
        </Button>
      </>
    </>
  );
};

export default LakesAccordion;
