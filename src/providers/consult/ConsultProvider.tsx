import {
  createConsult,
  editConsult,
} from "@app/config/api/backend/requests/consult";
import { useRequest } from "@app/hooks/useRequest";
import { ConsultFormData, ConsultState } from "@app/models/consult.model";
import { FC, PropsWithChildren } from "react";
import { ConsultContext } from "./ConsultContext";

export const ConsultProvider: FC<PropsWithChildren> = ({ children }) => {
  const _createOne = useRequest(createConsult);
  const _editOne = useRequest(editConsult);

  const createOne: ConsultState["createOne"] = async (
    data: ConsultFormData
  ) => {
    const done = await _createOne({ data });

    return !!done;
  };

  const editOne: ConsultState["editOne"] = async (
    id: string,
    data: ConsultFormData
  ) => {
    const done = await _editOne({ data, id });

    if (done) {
      return done;
    } else {
      return false;
    }
  };

  const state: ConsultState = {
    createOne,
    editOne,
  };

  return (
    <ConsultContext.Provider value={state}>{children}</ConsultContext.Provider>
  );
};
