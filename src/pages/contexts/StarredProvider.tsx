import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { useApi } from "../services/useApi";
import { Company } from "../../types";

interface OnStarredContextProps {
  starredData: Company[];
  handleClick: (company: Company, starred: boolean) => void;
}
const OnStarredContext = createContext<OnStarredContextProps>({
  starredData: [],
  handleClick: (company: Company, starred: boolean) => {},
});

export const useOnStarred = () => useContext(OnStarredContext);

interface OnStarredProviderProps {
  children: JSX.Element;
}

export const OnStarredProvider = ({ children }: OnStarredProviderProps) => {
  const { getStarredCount } = useApi();
  const [starredData, setStarredData] = useState<Company[]>([]);

  useEffect(() => {
    const initializeClickCount = async () => {
      const response = await getStarredCount();
      if (response.data) setStarredData(response.data);
    };
    initializeClickCount();
  }, []);

  const handleClick = (company: Company, starred: boolean) => {
    let newData;
    if (starred) {
      company.starred = true;
      newData = starredData.concat(company);
    } else {
      newData = starredData.filter((c) => c.id !== company.id);
    }
    setStarredData(newData);
  };

  const value = useMemo(
    () => ({
      starredData,
      handleClick,
    }),
    [starredData, handleClick]
  );

  return (
    <OnStarredContext.Provider value={value}>
      {children}
    </OnStarredContext.Provider>
  );
};
