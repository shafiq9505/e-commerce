import React, { useState, useEffect } from "react";
import Api from "../../service/api";
import { Button } from "react-bootstrap";
import _, { filter } from "lodash";
import SearchField from "../../component/SearchField";

//scss
import "./index.scss";

//redux
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { addItems } from "../../redux/slice/items";

interface StateProperties {
  image: string;
  name: string;
  price: number;
  currency: string;
  final_price: number;
}
let initialDataList: any = [];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cartItems.items);
  const [dataList, setDataList] = useState<StateProperties[]>([]);

  const getDataList = async () => {
    const response: any = await Api({
      url: "http://localhost:8080/server/data-listing",
      type: "GET",
    });
    initialDataList = response.data.data;
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
  };

  const onChangeSearch = (e: any) => {
    const searchText = _.toLower(e.target.value);

    const newArr = _.cloneDeep(initialDataList);

    const filteredArray: any = _.filter(newArr, (el: any) => {
      if (searchText === "" || searchText === null || searchText.length === 0) {
        return el.name;
      } else {
        return el.name.toLowerCase().includes(searchText);
      }
    });

    setDataList(filteredArray);
  };

  return (
    <div className="dashboard">
      <SearchField onKeyUp={onChangeSearch} />
      <div className="item-list-container">
        {dataList.map((data: any, index: number) => {
          return (
            <div className="item-list" key={index}>
              <div className="image-container">
                <img className="image" src={data.image} alt={`${data.name} image`} />
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
    </div>
  );
};

export default Dashboard;
