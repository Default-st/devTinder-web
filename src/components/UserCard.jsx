import React from "react";

export const UserCard = ({ data }) => {
  const { firstName, lastName, photoUrl, about, age, gender } = data;
  return (
    <div>
      <div className="card bg-base-300 shadow-sm w-96">
        <figure>
          <img src={photoUrl} alt="User Photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>
            {age && <span>{age}</span>}
            {gender && <span> {gender}</span>}
          </p>
          <p>{about}</p>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary">Ignore</button>{" "}
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};
