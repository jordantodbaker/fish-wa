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
  useUserLazyQuery,
  useCountiesQuery,
} from "@/generated/graphql-frontend";
import { Listbox, ListboxItem } from "@nextui-org/react";
import FormatLakeName from "@/app/utils/strings";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const LakesAccordion: React.FC<Props> = ({ user, setUser }) => {
  const [updateUserLakes, { loading }] = useUpdateUserLakesMutation();
  const router = useRouter();

  const { data, loading: countiesLoading } = useCountiesQuery();
  const counties = data?.counties as [County];

  const [getUser, { data: userData, loading: userLoading }] = useUserLazyQuery({
    variables: { email: user.email },
    onCompleted: (data) => {
      setUser(data?.user!);
    },
  });

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
        await updateUserLakes({
          variables: { input: { userId: user.id, lakeIds } },
          onCompleted: ({ updateUserLakes }) => {
            setUser(updateUserLakes as User);
          },
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
      <div>
        <h2>
          Select lakes by county to subscribe to them. When lakes are stocked
          you can be notified via email or text.
        </h2>
      </div>
      <div className="mt-8">
        {counties &&
          counties.map((county) => {
            return (
              <div key={county.id}>
                <AccordionItem
                  county={county}
                  setUser={setUser}
                  setSelectedKeys={setSelectedKeys}
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
                        <ListboxItem key={lake.id}>
                          {FormatLakeName(lake.name!)}
                        </ListboxItem>
                      );
                    })}
                  </Listbox>
                </AccordionItem>
              </div>
            );
          })}
        <Button
          className="mt-4"
          disabled={loading}
          color="primary"
          onClick={handleSubmit}
        >
          Subscribe
        </Button>
      </div>
    </>
  );
};

export default LakesAccordion;
