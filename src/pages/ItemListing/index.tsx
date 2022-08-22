import React from "react";
import logo from "./logo.svg";
import { Button } from "react-bootstrap";

import "./index.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { removeItems } from "../../redux/slice/items";
import { useNavigate } from "react-router-dom";

const ItemListing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector((state) => state.cartItems.items);

  return (
    <div className="item-listing-container">
      {items.length !== 0 ? (
        <div className="item-listing">
          {items.map((data: any, index: number) => {
            return (
              <div className="item-list-container" key={index}>
                <div className="image-container">
                  <img
                    className="image"
                    src={data.image}
                    alt={`${data.name} image`}
                  />
                </div>
                <div className="text-container">{data.name}</div>
                <div className="button-container">
                  <Button
                    onClick={() => {
                      dispatch(removeItems(index));
                    }}
                    variant="danger"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "10px" }}>
          <h2>Please Pick The Item To Buy</h2>
        </div>
      )}

      <Button
        className="back-button"
        variant="success"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        Back
      </Button>
    </div>
  );
};

export default ItemListing;
