import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useStyles } from './MorbidityTableStyles';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

const columns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Fecha',
    type: 'date',
    width: 150,
  },
  {
    field: 'hour',
    headerName: 'Hora',
    width: 150,
  },
  {
    field: 'fullName',
    headerName: 'Nombre y Apellido',
    width: 150,
  },
  {
    field: 'identification',
    headerName: 'Cedula',
    width: 150,
  },
  {
    field: 'age',
    headerName: 'Edad',
    type: 'number',
    width: 150,
  },
  {
    field: 'position',
    headerName: 'Cargo',
    width: 150,
  },
  {
    field: 'diagnosis',
    headerName: 'Diagnostico',
    width: 150,
  },
  {
    field: 'treatment',
    headerName: 'Tratamiento',
    width: 150,
  },
  {
    field: 'amount',
    headerName: 'Cantidad',
    width: 150,
  },
];

const rows = [
  {
    id: 1,
    date: new Date(),
    hour: 75619,
    fullName: 'Kristi Mayer',
    identification: 1708893822759,
    age: 95602,
    position: 'Supervisor',
    diagnosis: 'dSC<-K77B6',
    treatment: "qqbA9'tlDs",
    amount: 73734,
  },
  {
    id: 2,
    date: new Date(),
    hour: 37980,
    fullName: 'Tracy Rutherford MD',
    identification: 1708893828917,
    age: 46257,
    position: 'Strategist',
    diagnosis: 'MxFJOAiy*2',
    treatment: "'_r$]5IR_8",
    amount: 9738,
  },
  {
    id: 3,
    date: new Date(),
    hour: 33348,
    fullName: 'Blanca Schmitt',
    identification: 1708893836829,
    age: 16772,
    position: 'Associate',
    diagnosis: '[9[wBBgq@7',
    treatment: 'Xaryp9>,PO',
    amount: 62848,
  },
  {
    id: 4,
    date: new Date(),
    hour: 66085,
    fullName: 'Pete Funk',
    identification: 1708893841335,
    age: 23355,
    position: 'Technician',
    diagnosis: 'Y-C%<&WaXZ',
    treatment: '`4_a4p`OC*',
    amount: 87338,
  },
  {
    id: 5,
    date: new Date(),
    hour: 88870,
    fullName: 'Jonathon Casper MD',
    identification: 1708893843735,
    age: 32957,
    position: 'Coordinator',
    diagnosis: "'c2SD5(O'c",
    treatment: 'W/$?M&}^2r',
    amount: 97939,
  },
  {
    id: 6,
    date: new Date(),
    hour: 98310,
    fullName: 'Jean Predovic',
    identification: 1708893846851,
    age: 12763,
    position: 'Developer',
    diagnosis: ',o4"rhp;\'\\',
    treatment: 'IQ2*R$ezI^',
    amount: 45478,
  },
  {
    id: 7,
    date: new Date(),
    hour: 10627,
    fullName: 'Dr. Barry Waters',
    identification: 1708893850347,
    age: 70960,
    position: 'Director',
    diagnosis: 'xVoV8fE="x',
    treatment: 'Z-t?mZ7I%Y',
    amount: 61411,
  },
];

interface EnhancedTableToolbarProps {
  numSelected: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        // ...(numSelected > 0 && {
        //   bgcolor: (theme) =>
        //     alpha(
        //       theme.palette.primary.main,
        //       theme.palette.action.activatedOpacity
        //     ),
        // }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
export const MorbidityTable = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {/* <EnhancedTableToolbar numSelected={1}></EnhancedTableToolbar> */}
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        checkboxSelection
      />
    </div>
  );
};
