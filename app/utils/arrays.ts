import { Lake } from "@/generated/graphql-frontend";
export const getUniqueLakeListById = (arr: Lake[] | any): Lake[] => {
  return [
    ...new Map(arr.map((item: Lake) => [item["id"], item])).values(),
  ] as Lake[];
};
