import { useState } from "react";
import { FaStar } from "react-icons/fa";
import BlankAvatar from "./images/blank-avatar.png";
import { useApi } from "../../../services/useApi";
import { useOnStarred } from "../../../contexts/StarredProvider";
import { Company } from "../../../../types";
import "./SearchResult.css";

interface SearchResultProps {
  result: Company;
}

export const SearchResult = ({ result }: SearchResultProps) => {
  const { handleClick } = useOnStarred();
  const [starred, setStarred] = useState(result.starred);
  const { updateStarred } = useApi();
  const addressText = () => {
    const address = result.address;
    return `${address.address1}, ${address.city}, ${address.state} ${address.postalCode}`;
  };

  const onClick = async () => {
    handleStarred(!starred);

    const response = await updateStarred(result.id, !starred);
    if (response.error) {
      handleStarred(starred);
      alert(response.error);
    }
  };

  const handleStarred = (starred: boolean) => {
    handleClick(result, starred);
    setStarred(starred);
  };

  return (
    <div className="search-result" onClick={onClick}>
      <img
        className="result-image"
        src={result.image || BlankAvatar}
        alt={result.name}
      />
      <span className="search-text">
        <p className="result-name">{result.name}</p>
        <p className="result-description">{result.description}</p>
        <p className="result-address">{addressText()}</p>
      </span>
      <FaStar
        className="star-icon"
        color={starred ? "orange" : "lightgray"}
        style={{ padding: "16px" }}
      />
    </div>
  );
};
