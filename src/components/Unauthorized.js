import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <section className=" flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl">Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <button className="bg-green-500 p-2 mt-4 rounded" onClick={goBack}>
          Go Back
        </button>
      </div>
    </section>
  );
}

export default Unauthorized;
