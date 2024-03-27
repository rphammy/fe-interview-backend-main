import "./SearchResults.css";
import { SearchResult } from "./SearchResult";
import { Company } from "../../../types";

interface SearchResultsProps {
  results: Company[];
}
export const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} />;
      })}
    </div>
  );
};
