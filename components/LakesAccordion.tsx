"use client";
import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import {
  County,
  useUpdateUserLakesMutation,
  useUserQuery,
} from "@/generated/graphql-frontend";
import { Listbox, ListboxItem } from "@nextui-org/react";

interface Props {
  userId: number;
  counties: [County];
}

const LakesAccordion: React.FC<Props> = ({ counties, userId }) => {
  const [updateUserLakes, { data, error, loading }] =
    useUpdateUserLakesMutation();

  const { data: userLakes, loading: userLoading } = useUserQuery({
    variables: { id: userId },
  });

  const [selectedKeys, setSelectedKeys] = useState(
    new Set([userLakes?.user?.lakes].map((lake) => `${lake}`))
  );

  const handleSubmit = async () => {
    if (userId) {
      const lakeIds = Array.from(selectedKeys)
        .map((key) => parseInt(key))
        .filter((n) => n);
      try {
        await updateUserLakes({
          variables: { input: { userId, lakeIds } },
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (userLakes) {
      const selectedLakes = userLakes.user.lakes.map((lake) => `${lake}`);
      setSelectedKeys(selectedLakes);
    }
  }, [userLakes]);

  console.log("user lakes keys: ", selectedKeys);

  return (
    <>
      <Accordion isCompact>
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
                    return <ListboxItem key={lake.id}>{lake.name}</ListboxItem>;
                  })}
                </Listbox>
              </AccordionItem>
            );
          })}
      </Accordion>
      <Button disabled={loading} onClick={handleSubmit}>
        Subscribe
      </Button>
    </>
  );
};

export default LakesAccordion;
