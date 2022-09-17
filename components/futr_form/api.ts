import axios from "axios";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { InitialFormData } from "../../state/social.store";

export const fetchFutrInfo = () =>
  axios
    .get("https://mocki.io/v1/305675c1-5cb0-4ebc-a351-d55a02fb504a")
    .then((res) => {
      return res.data;
    });
export const FutrInfoName = "futr-info";

export const useTetherWallets = (
  options?: UseQueryOptions<InitialFormData, Error, InitialFormData, QueryKey>
) => {
  return useQuery(FutrInfoName, () => fetchFutrInfo(), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
