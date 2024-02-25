import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { SelectUserInfo, fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  // const user = useSelector(selectLoggedInUser);
  const user = useSelector(SelectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch]);

  return (
    <div>
      {orders.map((order) => (
        <>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <p className="mt-3 px-2 ">Order #{order.id}</p>
              <h4 className="py-0 px-2 font-bold tracking-tight text-red-900">
                Status : {order.status}
              </h4>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={order.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.thumbnail}
                          alt={item.imageAlt}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to={item.href}>{item.name}</Link>
                            </h3>
                            <p className="ml-4">{item.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="password"
                              className="inline mr-4 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty :{item.quantity}
                            </label>
                          </div>

                          <div className="flex"></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.totalAmount}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total items in cart</p>
                <p>{order.totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex min-w-0 gap-x-4 mt-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    Shipping Address :
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.streetAddress}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.pinCode}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {order.selectedAddress.city}
                </p>
                <p className="text-sm leading-6 text-gray-900">
                  {order.selectedAddress.region}
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default UserOrders;
