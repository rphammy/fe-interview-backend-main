import React, { useState } from "react";
import "./Counter.css";
import { useOnStarred } from "../../contexts/StarredProvider";
import { SearchResults } from "../SearchResults";

export const Counter = () => {
  const { starredData } = useOnStarred();
  const [showStarred, setShowStarred] = useState(false);
  return (
    <section>
      <button
        className="starred-count"
        onClick={() =>
          setShowStarred(!showStarred)
        }>{`Starred Count: ${starredData.length}`}</button>
      {showStarred && starredData.length > 0 && (
        <SearchResults results={starredData} />
      )}
    </section>
  );
};
