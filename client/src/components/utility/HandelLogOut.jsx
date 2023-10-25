import React,{ useState } from "react";
import Modal from "react-modal";
const HandelLogOut = ({ setLogOut }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const closeTag = () => {
    setModalIsOpen(false);
  };
  const trulyLogOut = () => {
    fetch("/api/v1/logIn/logOut");
    setLogOut();
  };
  return (
    <div>
      <Modal isOpen={modalIsOpen} className="bg-green-800">
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
          <div className="fixed bg-gray-200 px-6 py-20 rounded">
            <button onClick={closeTag} className="absolute right-0 top-0 w-4 ">
              x
            </button>
            <p className="text-lg font-bold mb-4">Do you want to log out?</p>
            <button
              onClick={trulyLogOut}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Log out
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HandelLogOut;
