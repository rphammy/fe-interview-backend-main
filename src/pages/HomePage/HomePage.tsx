import { useState } from "react";
import "./HomePage.css";
import { Counter } from "./Counter";
import { OnStarredProvider } from "../contexts/StarredProvider";

import { Search } from "./Search";
export const HomePage = () => {
  return (
    <OnStarredProvider>
      <main className="homepage">
        <p>Company Search</p>
        <Search />
        <Counter />
      </main>
    </OnStarredProvider>
  );
};
