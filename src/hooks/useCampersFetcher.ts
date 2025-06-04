import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./index";
import {
  setCampers,
  appendCampers,
  setTotalCount,
  setLoading,
} from "../store/camperSlice";
import { useDebounce } from "./useDebounce";
import { api } from "../api/axiosInstance";
import type { ICampersResponse } from "../types";

export const useCampersFetcher = () => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.filters);
  const { offset, limit } = useAppSelector((state) => state.campers);

  const debouncedLocation = useDebounce(filters.location, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        const queryParams = new URLSearchParams();
        const page = Math.floor(offset / limit) + 1;
        queryParams.set("page", page.toString());
        queryParams.set("limit", limit.toString());

        if (debouncedLocation) queryParams.set("location", debouncedLocation);
        if (filters.transmission) queryParams.set("transmission", filters.transmission);
        if (filters.AC) queryParams.set("AC", "true");
        if (filters.bathroom) queryParams.set("bathroom", "true");
        if (filters.kitchen) queryParams.set("kitchen", "true");
        if (filters.TV) queryParams.set("TV", "true");
        if (filters.form) {
          const formMap: Record<string, string> = {
            van: "panelTruck",
            "fully integrated": "fullyIntegrated",
            alcove: "alcove",
          };
          const mappedForm = formMap[filters.form] || filters.form;
          queryParams.set("form", mappedForm);
        }

        const response = await api.get(`/campers?${queryParams.toString()}`);
        const data: ICampersResponse = response.data;

        if (offset === 0) {
          dispatch(setCampers(data.items));
        } else {
          dispatch(appendCampers(data.items));
        }

        dispatch(setTotalCount(data.total));
      } catch (error) {
        dispatch(setCampers([]));
        dispatch(setTotalCount(0));
        console.error("Failed to fetch campers:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [
    debouncedLocation,
    filters.transmission,
    filters.AC,
    filters.bathroom,
    filters.kitchen,
    filters.TV,
    filters.form,
    offset,
    limit,
    dispatch,
  ]);
};