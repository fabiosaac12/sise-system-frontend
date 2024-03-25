import { useState, MouseEvent, FC } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  ButtonBase,
  Chip,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowDropDown, Backspace } from "@mui/icons-material";
import {
  SearchBarAppliedFilter,
  SearchBarFilter,
} from "@app/models/components";

interface Props {
  fields: SearchBarFilter[];
  appliedFilters: SearchBarAppliedFilter[];
  onSelect: (selectedField: SearchBarFilter) => void;
  onClearOneFilter: (filterToClear: SearchBarFilter) => void;
  onClearAllFilters: () => void;
}

export const FieldNameSelector: FC<Props> = ({
  fields,
  appliedFilters,
  onSelect,
  onClearAllFilters,
  onClearOneFilter,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [selectedField, setSelectedField] = useState<SearchBarFilter>(
    fields[0]
  );

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ButtonBase
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpen}
        sx={{
          py: 1,
          px: 2,
          m: 0,
          backgroundColor: theme.palette.grey[100],
          borderRight: 1,
          borderRightColor: theme.palette.grey[100],
        }}
      >
        <Typography variant="body1" maxWidth={140} mr={1} noWrap>
          {selectedField.text}
        </Typography>
        <ArrowDropDown />
      </ButtonBase>

      <Menu
        id="search-bar-fields-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "search-bar-fields-button",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={1}
        >
          <Typography variant="body2">Filtros</Typography>

          <ButtonBase onClick={onClearAllFilters}>
            <Chip
              size="small"
              label="Limpiar todos"
              sx={{
                fontSize: "caption.fontSize",
              }}
            />
          </ButtonBase>
        </Box>

        <Divider sx={{ mt: 1 }} />

        {fields.map((field) => {
          const currentFilterApplied = appliedFilters.find(
            (filterItem) => filterItem.keyName === field.keyName
          );

          return (
            <MenuItem
              key={field.keyName}
              onClick={() => {
                onSelect(field);
                setSelectedField(field);
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width={1}
              >
                <Typography variant="body2" mr={4}>
                  {field.text}

                  {!!currentFilterApplied && (
                    <Typography variant="caption" pl={2}>
                      {currentFilterApplied?.label.slice(0, 10)}...
                    </Typography>
                  )}
                </Typography>

                {!!currentFilterApplied && (
                  <ButtonBase
                    onClick={(e) => {
                      e.stopPropagation();

                      onClearOneFilter(field);
                    }}
                  >
                    <Backspace fontSize="small" color="disabled" />
                  </ButtonBase>
                )}
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
