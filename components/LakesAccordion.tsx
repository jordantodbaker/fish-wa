"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import {
  County,
  User,
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

  // const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
  //   new Set([user.lakeIds].map((lake) => `${lake}`))
  // );

  // const handleSubmit = async () => {
  //   if (user.id) {
  //     const lakeIds = Array.from(selectedKeys)
  //       .map((key) => parseInt(key))
  //       .filter((n) => n);
  //     try {
  //       setUser((prevUser) => {
  //         return {
  //           ...prevUser,
  //           lakeIds: lakeIds,
  //           stockingReports: prevUser?.stockingReports!.filter((report) =>
  //             lakeIds.includes(report?.lakeId!)
  //           ) as [StockingReport],
  //         } as User;
  //       });
  //       await updateUserLakes({
  //         variables: { input: { userId: user.id, lakeIds } },
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // };

  useEffect(() => {
    if (user.lakeIds) {
      const selectedLakes = user.lakeIds.map((lake) => `${lake}`);
      //setSelectedKeys(selectedLakes);
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
        {/* <Accordion isCompact>
          {counties &&
            counties.map((county) => {
              return (
                <AccordionItem key={county.id} title={county.name}>
                  <Listbox
                    aria-label="Multiple selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                  >
                    {county.lakes.map((lake) => {
                      return (
                        <ListboxItem key={lake.id}>{lake.name}</ListboxItem>
                      );
                    })}
                  </Listbox>
                </AccordionItem>
              );
            })}
        </Accordion> */}
        <Button disabled={loading}>Subscribe</Button>
      </>
    </>
  );
};

export default LakesAccordion;
