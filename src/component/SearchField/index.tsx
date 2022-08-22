import React from "react";
import "./index.scss";
interface Props {
  placeholder?: string;
  onKeyUp?: (e: any) => any;
}

const SearchField = ({
  placeholder = "search",
  onKeyUp = (e) => {},
}: Props) => {
  return (
    <div className="search-field">
      <input
        className="search-box"
        placeholder={placeholder}
        onKeyUp={onKeyUp}
      ></input>
    </div>
  );
};

export default SearchField;
