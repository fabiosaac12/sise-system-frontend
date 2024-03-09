export interface SearchBarFilter {
  keyName: string;
  text: string;
  options?: {
    id: string;
    name: string;
  }[];
}

export interface SearchBarAppliedFilter extends SearchBarFilter {
  value: string;
  label: string;
}
