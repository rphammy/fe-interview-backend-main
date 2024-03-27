import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "../SearchResults";
import { Company } from "../../../types";

export const Search = () => {
  const [results, setResults] = useState<Company[]>([]);

  return (
    <section>
      <SearchBar setResults={setResults} />
      {results && results.length > 0 && <SearchResults results={results} />}
    </section>
  );
};
