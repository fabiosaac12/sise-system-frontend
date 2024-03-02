import { useMemo, useState } from 'react';

import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
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
    label: 'HORAS',
  },
  {
    id: 'fullName',
    numeric: false,
    disablePadding: false,
    label: 'NOMBRE Y APELLIDO',
  },
  {
    id: 'identification',
    numeric: false,
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
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

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
            align={headCell.numeric ? 'center' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{
              fontWeight: 'bold',
            }}
          >
            {headCell.label}
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
export function MorbidityTable() {
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);

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

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * 5 - rows.length) : 0;

  const visibleRows = useMemo(() => rows.slice(page * 5, page * 5 + 5), [page]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
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
                      align='center'
                    >
                      {row.date.toLocaleDateString()}
                    </TableCell>
                    <TableCell align='center'>{row.hour}</TableCell>
                    <TableCell align='center'>{row.fullName}</TableCell>
                    <TableCell align='center'>{row.fullName}</TableCell>
                    <TableCell align='center'>{row.identification}</TableCell>
                    <TableCell align='center'>{row.age}</TableCell>
                    <TableCell align='center'>{row.position}</TableCell>
                    <TableCell align='center'>{row.diagnosis}</TableCell>
                    <TableCell align='center'>{row.treatment}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
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
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      />
    </Box>
  );
}
