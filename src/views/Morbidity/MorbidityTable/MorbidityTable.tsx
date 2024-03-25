import { useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useStyles } from "./MorbidityTableStyles";
import { MorbidityFormDialog } from "../MorbidityForm/MorbidityForm";

// interface Data {
//   date: Date;
//   hour: number;
//   fullName: string;
//   identification: number;
//   age: number;
//   position: string;
//   diagnosis: string;
//   treatment: string;
//   amount: number;
// }

const rows = [
  {
    id: 1,
    date: new Date().toLocaleDateString(),
    hour: 75619,
    fullName: "Kristi Mayer",
    identification: 93822759,
    age: 27,
    position: "Supervisor",
    diagnosis: "dSC<-K77B6",
    treatment: "qqbA9'tlDs",
    amount: 73734,
  },
  {
    id: 2,
    date: new Date().toLocaleDateString(),
    hour: 37980,
    fullName: "Tracy Rutherford MD",
    identification: 93828917,
    age: 57,
    position: "Strategist",
    diagnosis: "MxFJOAiy*2",
    treatment: "'_r$]5IR_8",
    amount: 9738,
  },
  {
    id: 3,
    date: new Date().toLocaleDateString(),
    hour: 33348,
    fullName: "Blanca Schmitt",
    identification: 93836829,
    age: 72,
    position: "Associate",
    diagnosis: "[9[wBBgq@7",
    treatment: "Xaryp9>,PO",
    amount: 62848,
  },
  {
    id: 4,
    date: new Date().toLocaleDateString(),
    hour: 66085,
    fullName: "Pete Funk",
    identification: 93841335,
    age: 55,
    position: "Technician",
    diagnosis: "Y-C%<&WaXZ",
    treatment: "`4_a4p`OC*",
    amount: 87338,
  },
  {
    id: 5,
    date: new Date().toLocaleDateString(),
    hour: 88870,
    fullName: "Jonathon Casper MD",
    identification: 93843735,
    age: 57,
    position: "Coordinator",
    diagnosis: "'c2SD5(O'c",
    treatment: "W/$?M&}^2r",
    amount: 97939,
  },
  {
    id: 6,
    date: new Date().toLocaleDateString(),
    hour: 98310,
    fullName: "Jean Predovic",
    identification: 93846851,
    age: 63,
    position: "Developer",
    diagnosis: ",o4\"rhp;'\\",
    treatment: "IQ2*R$ezI^",
    amount: 45478,
  },
  {
    id: 7,
    date: new Date().toLocaleDateString(),
    hour: 10627,
    fullName: "Dr. Barry Waters",
    identification: 93850347,
    age: 60,
    position: "Director",
    diagnosis: 'xVoV8fE="x',
    treatment: "Z-t?mZ7I%Y",
    amount: 61411,
  },
];

interface EnhancedTableToolbarProps {
  selected: string[];
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { selected } = props;
  const numSelected = selected.length;
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 3.5, sm: 3.5 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => theme.palette.secondary.main,
        }),
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="white"
          variant="subtitle1"
          component="div"
        >
          {numSelected > 1
            ? `${numSelected} Elementos seleccionados`
            : `${numSelected} Elemento seleccionado`}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h5"
          id="tableTitle"
          fontWeight="bold"
          component="div"
        >
          Morbilidad
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Tooltip
            title="Elminar"
            onClick={() => alert(`elementos seleccionados: ${selected}`)}
          >
            <IconButton>
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          {numSelected === 1 && (
            <Tooltip
              title="Editar"
              onClick={() => alert("Funcionalidad en desarrollo")}
            >
              <IconButton>
                <EditIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        <Tooltip title="Agregar consulta" onClick={handleOpenDialog}>
          <IconButton>
            <AddCircleIcon sx={{ color: "#EF579A", fontSize: 40 }} />
          </IconButton>
        </Tooltip>
      )}
      <MorbidityFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Toolbar>
  );
}
export const MorbidityTable = () => {
  const [rowsSelected, setRowSelected] = useState<string[]>([]);
  const classes = useStyles();

  const headCells: GridColDef[] = [
    {
      field: "date",
      headerName: "FECHA",
      description: "FECHA",
      width:90,
    },
    {
      field: "hour",
      headerName: "HORA",
      description: "HORA",
      width:90,
    },
    {
      field: "fullName",
      headerName: "NOMBRE Y APELLIDO",
      
      description: "NOMBRE Y APELLIDO",
      minWidth:190,
      flex:1,
    },
    {
      field: "identification",
      headerName: "CEDULA",
      description: "CEDULA",
      minWidth:100,
      flex:1,
    },
    {
      field: "age",
      headerName: "EDAD",
      description: "EDAD",
      width:90,
    },
    {
      field: "position",
      headerName: "CARGO",
      description: "CARGO",
      minWidth:90,
      flex:1,
    },
    {
      field: "diagnosis",
      headerName: "DIAGNOSTICO",
      description: "DIAGNOSTICO",
      minWidth:140,
      flex:1,
    },
    {
      field: "treatment",
      headerName: "TRATAMIENTO",
      description: "TRATAMIENTO",
      minWidth:140,
      flex:1,
    },
    {
      field: "amount",
      headerName: "CANTIDAD",
      description: "CANTIDAD",
      minWidth:140,

      flex:1,
      
    },
  ];
  return (
    <>
      <Box className={classes.container}>
        <Paper sx={{width:'100%'}}>
          <EnhancedTableToolbar selected={rowsSelected} />
          
          <DataGrid
            sx={{
              height: 390, width: '100%',
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "&.MuiDataGrid-root": {
                border: "none",
              },
              ".MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
              '& ::-webkit-scrollbar': {
                
                height: '0.8em',
              },
              
              '& ::-webkit-scrollbar-thumb': {
                backgroundColor: '#FCD8E7',
               
                borderRadius:'40px',
                border:'1.5px solid white'
              },
              '& ::-webkit-scrollbar-track': {
                backgroundColor: 'white',
                // borderRadius:'20px'
                
              }
            }}
            hideFooterSelectedRowCount
            columns={headCells}
            rows={rows}
            disableColumnMenu
            onRowSelectionModelChange={(idRow) => {
              setRowSelected(idRow as string[]);
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            sortingMode="server"
          />
         
          
        </Paper>
      </Box>
    </>
  );
};
