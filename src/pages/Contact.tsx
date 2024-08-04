import React, { useState } from "react";
import Input from "../Components/Input";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { addRecord, removeRecord, updateRecord } from "../redux/formSlice";

export default function Contact() {
  interface formValue {
    firstName: string;
    lastName: string;
    status: string;
  }

  const [radiostatus, setRadioStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [updateRecordStatus, setUpdateRecordStatus] = useState({
    status: false,
    index: 0,
  });
  const [formValue, setFormValue] = useState<formValue>({
    firstName: "",
    lastName: "",
    status: "",
  });

  const dispatch: AppDispatch = useDispatch();
  const records = useSelector((state: RootState) => state.form.records);
  const [selectedRecord, setSelectedRecord] = useState({
    firstName: "",
    lastName: "",
    status: "",
  });

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonClick = (status: string) => {
    setFormValue((prev) => ({ ...prev, status: status }));
  };

  const handleView = (record: formValue, index: number) => {
    setFormValue(record);
    setRadioStatus(record.status);
    setUpdateRecordStatus({ status: true, index: index });
  };

  const handleViews = (record: formValue) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedRecord({ firstName: "", lastName: "", status: "" });
    setModalVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, status } = formValue;
    if (firstName == "" || lastName == "" || status == "") {
      alert("Please enter all details.");
    } else {
      if (updateRecordStatus.status) {
        dispatch(
          updateRecord({
            index: updateRecordStatus.index,
            record: { firstName, lastName, status },
          })
        );
        setUpdateRecordStatus({ status: false, index: 0 });
      } else {
        dispatch(addRecord({ firstName, lastName, status }));
      }
      setFormValue({
        firstName: "",
        lastName: "",
        status: "",
      });
      setRadioStatus("");
    }
  };

  const handleRemove = (index: number) => {
    dispatch(removeRecord(index));
  };

  const handleCancel = () => {
    setFormValue({
      firstName: "",
      lastName: "",
      status: "",
    });
    setRadioStatus("");
    setUpdateRecordStatus({ status: false, index: 0 });
  };

  return (
    <div className="w-[50vw] mt-2">
      <div className="w-full bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-2 ">
        <div className="text-2xl font-bold mx-2 mb-4 mt-2">Contact</div>
        <div className="flex px-2">
          <div className="px-2 w-1/2">
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
          <div className="px-2 w-1/2">
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
            <button
              onClick={handleSubmit}
              className="rounded-sm py-2 mt-4 px-4 text-center justify-center mx-2 border hover:bg-blue-700 hover:text-white"
            >
              {updateRecordStatus.status ? "Update" : "Submit"}
            </button>
            <button
              onClick={() => handleCancel()}
              className="rounded-sm py-2 mt-4 px-4 text-center justify-center mx-2 border hover:bg-blue-700 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div>
        {records.length > 0 && (
          <div className="w-full overflow-y-auto h-[48vh] p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {records.map((record, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-md">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold">Record #{index + 1}</h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViews(record)}
                        className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-700"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleView(record, index)}
                        className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemove(index)}
                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">First Name:</span>
                    {record.firstName}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Last Name:</span>
                    {record.lastName}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {record.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {records.length <= 0 && (
        <div className="text-center justify-center flex m-auto p-5">
          No Data Found
        </div>
      )}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4">Record Details</h2>
            <div className="mb-2">
              <span className="font-semibold">First Name:</span>{" "}
              {selectedRecord.firstName}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Last Name:</span>{" "}
              {selectedRecord.lastName}
            </div>
            <div>
              <span className="font-semibold">Status:</span>{" "}
              {selectedRecord.status}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
