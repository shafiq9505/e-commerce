import React, { useState, useEffect } from "react";
import Api from "../../service/api";
import { Button } from "react-bootstrap";
import _ from "lodash";

//scss
import "./index.scss";

//redux
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { addItems } from "../../redux/slice/items";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cartItems.items);
  const [dataList, setDataList] = useState([]);

  const getDataList = async () => {
    const response: any = await Api({
      url: "http://localhost:8080/server/data-listing",
      type: "GET",
    });

    setDataList(response.data.data);
  };

  useEffect(() => {
    getDataList();
  }, []);

  const addToCart = (data: any) => {
    if (items.length !== 0) {
      const checkAvail = _.isUndefined(_.find(items, { name: data.name }));

      if (!checkAvail) return;
      dispatch(addItems(data));
    } else {
      dispatch(addItems(data));
    }

    console.warn(items);
  };

  return (
    <div className="dashboard">
      {dataList.map((data: any, index: number) => {
        return (
          <div className="item-list-container" key={index}>
            <div className="image-container">
              <img src={data.imageUrl} />
            </div>
            <div className="text-container">{data.name}</div>
            <div className="button-container">
              <Button
                onClick={() => {
                  addToCart(data);
                }}
                variant="success"
              >
                Buy
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
