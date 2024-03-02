import { useMemo, useState } from 'react';

import {
  IconButton,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
// tables components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { visuallyHidden } from '@mui/utils';

interface Data {
  date: Date;
  hour: number;
  fullName: string;
  identification: number;
  age: number;
  position: string;
  diagnosis: string;
  treatment: string;
  amount: number;
}

const rows = [
  {
    id: 1,
    date: new Date(),
    hour: 75619,
    fullName: 'Kristi Mayer',
    identification: 93822759,
    age: 27,
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
    identification: 93828917,
    age: 57,
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
    identification: 93836829,
    age: 72,
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
    identification: 93841335,
    age: 55,
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
    identification: 93843735,
    age: 57,
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
    identification: 93846851,
    age: 63,
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
    identification: 93850347,
    age: 60,
    position: 'Director',
    diagnosis: 'xVoV8fE="x',
    treatment: 'Z-t?mZ7I%Y',
    amount: 61411,
  },
];

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'FECHA',
  },
  {
    id: 'hour',
    numeric: true,
    disablePadding: false,
    label: 'HORA',
  },
  {
    id: 'fullName',
    numeric: false,
    disablePadding: false,
    label: 'NOMBRE Y APELLIDO',
  },
  {
    id: 'identification',
    numeric: true,
    disablePadding: false,
    label: 'CEDULA',
  },
  {
    id: 'age',
    numeric: true,
    disablePadding: false,
    label: 'EDAD',
  },
  {
    id: 'position',
    numeric: true,
    disablePadding: false,
    label: 'CARGO',
  },
  {
    id: 'diagnosis',
    numeric: true,
    disablePadding: false,
    label: 'DIAGNOSTICO',
  },
  {
    id: 'treatment',
    numeric: true,
    disablePadding: false,
    label: 'TRATAMIENTO',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'CANTIDAD',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  order: Order;
  orderBy: OrderBy;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    numSelected,
    rowCount,
    order,
    orderBy,
    onRequestSort,
  } = props;

  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'seleciona todas las consultas',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{
              fontWeight: 'bold',
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 3.5, sm: 3.5 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => theme.palette.secondary.main,
        }),
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='white'
          variant='subtitle1'
          component='div'
        >
          {numSelected > 1
            ? `${numSelected} Elementos seleccionados`
            : `${numSelected} Elemento seleccionado`}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h5'
          id='tableTitle'
          fontWeight='bold'
          component='div'
        >
          Morbilidad
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Tooltip
            title='Elminar'
            onClick={() => alert('Funcionalidad en desarrollo')}
          >
            <IconButton>
              <DeleteIcon sx={{ color: 'white' }} />
            </IconButton>
          </Tooltip>
          {numSelected === 1 && (
            <Tooltip
              title='Editar'
              onClick={() => alert('Funcionalidad en desarrollo')}
            >
              <IconButton>
                <EditIcon sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        <Tooltip
          title='Agregar consulta'
          onClick={() => alert('Funcionalidad en desarrollo')}
        >
          <IconButton>
            <AddCircleIcon sx={{ color: '#EF579A', fontSize: 40 }} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';
type OrderBy = keyof Data;

const getComparator = <Key extends keyof Data>(
  order: Order,
  orderBy: Key
): ((
  a: { [key in Key]: number | string | Date },
  b: { [key in Key]: number | string | Date }
) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export function MorbidityTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('fullName');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const classes = useStyles();

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * 5 - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      rows
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * 5, page * 5 + 5),
    [page, order, orderBy]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                      align='left'
                    >
                      {row.date.toLocaleDateString()}
                    </TableCell>
                    <TableCell align='left'>{row.hour}</TableCell>
                    <TableCell align='left'>{row.fullName}</TableCell>
                    <TableCell align='left'>{row.identification}</TableCell>
                    <TableCell align='left'>{row.age}</TableCell>
                    <TableCell align='left'>{row.position}</TableCell>
                    <TableCell align='left'>{row.diagnosis}</TableCell>
                    <TableCell align='left'>{row.treatment}</TableCell>
                    <TableCell align='left'>{row.amount}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component='div'
          count={rows.length}
          rowsPerPage={5}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}
