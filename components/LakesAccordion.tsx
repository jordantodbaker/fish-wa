import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { County } from "@/generated/graphql-frontend";
import { Listbox, ListboxItem } from "@nextui-org/react";

interface Props {
  counties: County[];
}

const LakesAccordion: React.FC<Props> = ({ counties }) => {
  return (
    <Accordion>
      {counties &&
        counties.map((county) => {
          return (
            <AccordionItem key={county.id} title={county.name}>
              <Listbox>
                {county.lakes.map((lake) => {
                  return <ListboxItem key={lake.id}>{lake.name}</ListboxItem>;
                })}
              </Listbox>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
};

export default LakesAccordion;
