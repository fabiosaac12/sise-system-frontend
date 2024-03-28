export interface SearchBarFilter {
  keyName: string;
  text: string;
  options?: {
    id: string;
    name: string;
  }[];
  type: "text" | "select" | "date";
}

export interface SearchBarAppliedFilter extends SearchBarFilter {
  value: string;
  label: string;
}
