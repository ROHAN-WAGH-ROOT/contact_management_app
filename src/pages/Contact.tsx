import React, { useState } from "react";
import Input from "../Components/Input";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  setFirstName,
  setLastName,
  setStatus,
  updateForm,
} from "../redux/formSlice";

export default function Contact() {
  interface formValue {
    firstName: string;
    lastName: string;
    status: string;
  }

  const [radiostatus, setRadioStatus] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const formValue = useSelector((state: RootState) => state.form);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;

    dispatch(updateForm({ [name]: value }));
  };

  const handleButtonClick = (status: string) => {
    setRadioStatus(status);
    dispatch(setStatus(status));
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-2 ">
        <div className="text-2xl font-bold mx-2 mb-4 mt-2">Contact</div>
        <div className="flex px-2">
          <div className="px-2">
            <Input
              name="firstName"
              handleForm={(e) => handleForm(e)}
              type="text"
              label="First Name"
              value={formValue.firstName}
              key={""}
              className={
                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              }
            />
          </div>
          <div className="px-2">
            <Input
              name="lastName"
              handleForm={(e) => handleForm(e)}
              type="text"
              label="Last Name"
              value={formValue.lastName}
              key={""}
              className={
                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              }
            />
          </div>
        </div>
        <div className="px-5 py-2">
          <div>
            <label className="text-base font-medium">Status</label>
            <div className="mt-1 flex">
              <button
                className={`${
                  radiostatus == "Active"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                } no-underline px-2 w-1/2 py-1 rounded-sm text-base font-medium mr-2`}
                onClick={(e: React.MouseEvent) => {
                  setRadioStatus("Active");
                  handleButtonClick("Active");
                }}
              >
                Active
              </button>
              <button
                className={`${
                  radiostatus == "Inactive"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                } no-underline px-2 w-1/2 py-1 rounded-sm text-base font-medium ml-3`}
                onClick={(e: React.MouseEvent) => {
                  setRadioStatus("Inactive");
                  handleButtonClick("Inactive");
                }}
              >
                Inactive
              </button>
            </div>
          </div>
          <div className="justify-center align-middle flex">
            <button className="rounded-sm py-2 mt-4 px-4 text-center justify-center mx-2 border hover:bg-blue-700 hover:text-white">
              Submit
            </button>
            <button className="rounded-sm py-2 mt-4 px-4 text-center justify-center mx-2 border hover:bg-blue-700 hover:text-white">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">SR.No.</th>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-center">1</td>
              <td className="border px-4 py-2 text-center">rohan</td>
              <td className="border px-4 py-2 text-center">wagh</td>
              <td className="border px-4 py-2 text-center">Inactive</td>
              <td className="border px-4 py-2 text-center">
                <div className="border flex text-center">
                  <div className="px-4 text-center justify-center cursor-pointer">
                    View
                  </div>
                  <div className="px-4 text-center justify-center cursor-pointer">
                    Delete
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
