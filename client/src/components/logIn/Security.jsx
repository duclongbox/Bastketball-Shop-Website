import React, { useEffect, useState } from "react";
import LeftColumn from "../utility/LeftColumn";
import { Link } from "react-router-dom";
const Security = ({ updateState }) => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    // fetch the data from db
    const fetchData = async () => {
      try {
        let apiData;
        const response = await fetch("/api/v1/logIn/getCart");
        apiData = await response.json();
        setUserInfo(apiData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
    <div className="border-t border-gray-300 w-full"></div>
    <div className="h-screen flex">
      <div className="border-t border-gray-500 my-4"></div>
      <div className="bg-gray-50">
        <LeftColumn
          userName={userInfo.userID}
          updateState={updateState}
        ></LeftColumn>
      </div>
      <div>
        <div className="pl-40">
          <p className="font-bold py-3 text-xl">Security</p>
          <p className="font-semibold py-2">Two-Step Verification</p>
          <p className="font-thin w-2/3">
            Adding two-step verification improves the overall security of your
            StockX account. Two-step verification requires you to enter a code
            on a trusted mobile device in addition to your password at sign-in.
          </p>
          <Link>
            <button className="rounded outline bg-gray-800 text-white font-bold p-2 my-2 hover:bg-black">
              Turn On
            </button>
          </Link>
          <p className="font-bold text-xl mt-8">FAQ</p>
          <p className="font-bold my-2">Why should I enable two-step verification?</p>
          <p className="w-2/3">
            We’re all human, and we all use passwords that can be a little basic
            (shout out our pets). Two-step verification enhances the protection
            of your StockX account even if your password is compromised.
          </p>
          <p className="font-bold my-2 mt-6">What do I need to set up two-step verification?</p>
          <p>You’ll need a phone that can receive SMS messages to enable two-step verification.</p>
          <p className="font-bold my-2 mt-6">How do I set up two-step verification?</p>
          <p>Click “Turn On” above to set up two-step verification.</p>
          <ol className="mt-6">
            <li>1.Input your cell phone number.</li>
            <li>2.We’ll send you a one-time code via SMS.</li>
            <li>3.Enter the code on the login screen.</li>
            <li>4.Remember to save the recovery code so you can still sign in if you don’t have access to a trusted device.</li>
          </ol>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Security;
