import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { FC, useEffect, useRef, useState } from "react";
import { FieldNameSelector } from "./FieldNameSelector";
import { MenuItem, Paper, Select, Typography } from "@mui/material";
import { useDebounce } from "@app/hooks/useDebounce";
import {
  SearchBarAppliedFilter,
  SearchBarFilter,
} from "@app/models/components";

interface Props {
  values?: Record<string, string>;
  searchBy: SearchBarFilter[];
  onSearch: (appliedFilters?: SearchBarAppliedFilter[]) => void;
}

export const SearchBar: FC<Props> = ({ searchBy, onSearch, values }) => {
  const [appliedFilters, setAppliedFilters] = useState<
    SearchBarAppliedFilter[]
  >([]);

  const [selectedField, setSelectedField] = useState<SearchBarFilter>(
    searchBy[0]
  );

  const [searchText, setSearchText] = useState<string>("");
  const searchValue = useDebounce(searchText, 300);

  const mounted = useRef(false);

  useEffect(() => {
    if (values) {
      setSearchText(values[selectedField.keyName]);

      setAppliedFilters(
        (appliedFilters) =>
          appliedFilters
            .map((filter) =>
              values[filter.keyName]
                ? {
                    ...filter,
                    value: values[filter.keyName],
                  }
                : undefined
            )
            .filter(
              (filter) => filter !== undefined
            ) as SearchBarAppliedFilter[]
      );
    }
  }, [values]);

  useEffect(() => {
    setSelectedField((selectedField) => ({
      ...(searchBy.find((field) => field.keyName === selectedField.keyName) ||
        selectedField),
    }));
  }, [searchBy]);

  useEffect(() => {
    handleApplyFilters();
  }, [searchValue]);

  useEffect(() => {
    if (mounted.current) {
      onSearch(appliedFilters);
    } else {
      mounted.current = true;
    }
  }, [JSON.stringify(appliedFilters)]);

  const handleApplyFilters = () => {
    const filterExist = appliedFilters?.find(
      (filterItem) => filterItem.keyName === selectedField.keyName
    );

    let newFilters = [...appliedFilters];

    if (filterExist) {
      newFilters = newFilters.map((filterItem) => {
        if (filterItem.keyName === selectedField.keyName) {
          return {
            ...filterItem,
            value: searchText,
            label:
              selectedField.options?.find(({ id }) => id === searchText)
                ?.name || searchText,
          };
        }

        return filterItem;
      });
    } else {
      newFilters.push({
        ...selectedField,
        value: searchText,
        label:
          selectedField.options?.find(({ id }) => id === searchText)?.name ||
          searchText,
      });
    }

    setAppliedFilters(newFilters.filter((item) => !!item.value));
  };

  const handleClearFilter = (filterToClear: SearchBarFilter) => {
    const newFilters = appliedFilters.filter(
      (filterItem) => filterItem.keyName !== filterToClear.keyName
    );

    setAppliedFilters([...newFilters]);

    if (selectedField.keyName === filterToClear.keyName) {
      setSearchText("");
    }
  };

  const handleClearAllFilters = () => {
    setAppliedFilters([]);
    setSearchText("");
  };

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 540,
        border: "1px solid",
        borderColor: "divider",
      }}
      elevation={0}
    >
      <FieldNameSelector
        fields={searchBy}
        appliedFilters={appliedFilters}
        onSelect={(selectedField) => {
          setSelectedField(selectedField);

          const currentValue = appliedFilters.find(
            (filterItem) => filterItem.keyName === selectedField.keyName
          );

          setSearchText(currentValue ? currentValue.value : "");
        }}
        onClearOneFilter={handleClearFilter}
        onClearAllFilters={handleClearAllFilters}
      />

      {selectedField.options ? (
        <Select
          sx={{ ml: 1, flex: 1 }}
          variant="standard"
          disableUnderline
          value={searchText || "none"}
          onChange={(e) => {
            setSearchText(e.target.value === "none" ? "" : e.target.value);
          }}
        >
          <MenuItem value="none">
            <Typography color="text.disabled">Seleccionar...</Typography>
          </MenuItem>
          {selectedField.options.map((option) => (
            <MenuItem key={`searchbar-menuitem-${option.id}`} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={`Buscar por ${selectedField.text.toLowerCase()}`}
          value={searchText || ""}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      )}

      <IconButton
        type="button"
        // sx={{ p: 1.5 }}
        aria-label="search"
        onClick={() => onSearch(appliedFilters)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
