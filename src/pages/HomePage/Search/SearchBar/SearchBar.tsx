import react, { useEffect, useState } from "react";
import "./SearchBar.css";
import { Company } from "../../../../types";
import { useApi } from "../../../services/useApi";
import { useOnStarred } from "../../../contexts/StarredProvider";

interface SearchBarProps {
  setResults: (results: Company[]) => void;
}

export const SearchBar = ({ setResults }: SearchBarProps) => {
  const [value, setValue] = useState("");
  const { getCompanies } = useApi();
  const { starredData } = useOnStarred();

  useEffect(() => {
    console.log("statted");
    handleChange(value);
  }, [starredData]);

  const handleChange = async (value: string) => {
    setValue(value);

    if (value.length === 0) {
      setResults([]);
      return;
    }

    const results = await getCompanies(value);
    console.log(results);
    if (results.error) {
      alert(results.error);
    } else if (results.data) {
      setResults(results.data);
    }
  };

  return (
    <span className="input-wrapper">
      <input
        type="textarea"
        placeholder="Enter company"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </span>
  );
};
