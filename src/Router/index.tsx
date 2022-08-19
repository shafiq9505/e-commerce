import React, { useState, useEffect, Suspense, useCallback } from "react";
import CartIcon from "../assets/img/cart.svg";
//router
import { Route, Routes, useNavigate } from "react-router-dom";
import getPages from "../pages";

//scss
import "./index.scss";

//redux
import { useAppSelector } from "../redux/hooks";

const Router = () => {
  const items = useAppSelector((state) => state.cartItems.items);
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  // pages will come from backend, we will need to pass new path and element location to BE when we make new page
  const retrieve = async () => {
    const data = await getPages();
    setPages(data);
  };
  useEffect(() => {
    retrieve();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <span>Hye Im The Header</span>
        <span
          onClick={() => {
            navigate("/item-listing", { replace: true });
          }}
        >
          <img
            className="cart-icon"
            src={CartIcon}
            height={30}
            width={30}
            color="white"
          ></img>
          {items.length !== 0 && (
            <span className="cart-badge">{items.length}</span>
          )}
        </span>
      </header>
      <body className="app-body">
        <Routes>
          {pages?.map((route: any) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense>
                    <route.element />
                  </Suspense>
                }
              />
            );
          })}
        </Routes>
      </body>
      <footer></footer>
    </div>
  );
};

export default Router;
