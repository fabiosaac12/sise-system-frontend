import { useContext } from "react";
import { ConsultContext } from "./ConsultContext";

export const useConsult = () => useContext(ConsultContext);
