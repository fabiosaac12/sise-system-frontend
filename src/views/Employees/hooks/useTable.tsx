import { EmployeeFilter, EmployeeForTable } from "@app/models/employee.model";
import { useModal } from "@app/providers/modal";
import { Box, CSSObject, useMediaQuery, useTheme } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { EmployeeForm } from "../EmployeeForm/EmployeeForm";
import {
  SearchBarAppliedFilter,
  SearchBarFilter,
} from "@app/models/components";
import { useEmployees } from "@app/providers/employees";

export const useTable = () => {
  const theme = useTheme();
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));
  const modal = useModal();

  const { catalogues, applyFilters } = useEmployees();

  const textEllipsisStyle: CSSObject = {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const columns: GridColDef[] = [
    {
      field: "clientName",
      headerName: "Cliente",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.clientName}</Box>
      ),
    },
    {
      field: "departmentName",
      headerName: "Departamento",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.departmentName}</Box>
      ),
    },
    {
      field: "firstNames",
      headerName: "Nombres",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.firstNames}</Box>
      ),
    },
    {
      field: "lastNames",
      headerName: "Apellidos",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.lastNames}</Box>
      ),
    },
    {
      field: "idCard",
      headerName: "Cédula",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.idCard}</Box>
      ),
    },
    {
      field: "status",
      headerName: "Estatus",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.status}</Box>
      ),
    },
    {
      field: "workPosition",
      headerName: "Cargo",
      width: xlUp ? 200 : 150,
      renderCell: ({ row }: GridRenderCellParams<EmployeeForTable>) => (
        <Box sx={textEllipsisStyle}>{row.workPosition}</Box>
      ),
    },
  ];

  const filters: SearchBarFilter[] = [
    {
      keyName: "clientId",
      text: "Cliente",
      options: catalogues.clients,
    },
    {
      keyName: "departmentId",
      text: "Departamento",
      options: catalogues.departments,
    },
    { keyName: "idCard", text: "Cédula" },
  ];

  const openDeleteModal = (id: string) => {
    // const employee = items.find((item) => item._id === id);
    // openModal(
    //   <ConfirmModal
    //     Icon={DeleteIcon}
    //     color={PaletteEnum.error}
    //     confirmButtonText={t("delete")}
    //     title={t("employees.deleteModal.title")}
    //     description={t("employees.deleteModal.description", {
    //       employeeName: employee?.name,
    //     })}
    //     confirmButtonAction={() => employeeActions.deleteOne(id)}
    //   />
    // );
  };

  const openCreateModal = () => {
    modal.open({
      content: (
        <EmployeeForm
          handleSubmit={async (data) => {
            console.log(data);
          }}
        />
      ),
    });
  };

  const openEditModal = async (employeeId: string) => {
    // const employee = await employeeActions.selectOne(employeeId);
    // if (employee) {
    //   openModal(
    //     <EmployeeForm
    //       edit
    //       handleSubmit={async (data) => {
    //         const done = await employeeActions.updateOne(employeeId, data);
    //         if (done) {
    //           closeModal();
    //         }
    //       }}
    //       initialValues={{
    //         ...employee,
    //         selectedRobotForPreview: {
    //           es: "",
    //           en: "",
    //         },
    //         tabs: {
    //           en: !!employee.name.en,
    //         },
    //         category: employee.category._id,
    //         subcategory: employee.subcategory._id,
    //         images: employee.images.map((url) => ({
    //           url,
    //         })),
    //         price: {
    //           es: `${employee.price.es}`,
    //           en: `${employee.price.en}`,
    //         },
    //       }}
    //     />
    //   );
    // }
  };

  const applySearchBarFilters = (
    appliedFilters: SearchBarAppliedFilter[] = []
  ) => {
    console.log(appliedFilters);

    applyFilters(
      appliedFilters.reduce<Partial<EmployeeFilter>>(
        (filters, field) => ({
          ...filters,
          [field.keyName]: field.value,
        }),
        {}
      )
    );
  };

  return {
    columns,
    filters,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    applySearchBarFilters,
  };
};
