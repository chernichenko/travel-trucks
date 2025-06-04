import { useAppDispatch, useAppSelector } from "./index";
import {
  setAC,
  setTransmission,
  setKitchen,
  setTV,
  setBathroom,
  setForm,
} from "../store/filterSlice";
import { setOffset } from "../store/camperSlice";

export const useFilterClickHandler = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  return (label: string) => {
    dispatch(setOffset(0));

    switch (label) {
      case "AC":
        dispatch(setAC(!filters.AC));
        break;
      case "Automatic":
        dispatch(
          setTransmission(filters.transmission === "automatic" ? "" : "automatic")
        );
        break;
      case "Kitchen":
        dispatch(setKitchen(!filters.kitchen));
        break;
      case "TV":
        dispatch(setTV(!filters.TV));
        break;
      case "Bathroom":
        dispatch(setBathroom(!filters.bathroom));
        break;
      case "Van":
        dispatch(setForm(filters.form === "van" ? "" : "van"));
        break;
      case "Fully Integrated":
        dispatch(
          setForm(filters.form === "fully integrated" ? "" : "fully integrated")
        );
        break;
      case "Alcove":
        dispatch(setForm(filters.form === "alcove" ? "" : "alcove"));
        break;
      default:
        break;
    }
  };
};