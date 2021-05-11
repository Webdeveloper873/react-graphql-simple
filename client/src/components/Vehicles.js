import React, { useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const GET_VEHICLES = gql`
  query GetVehicles($bike_id: String) {
    vehicles(bike_id: $bike_id) {
      bike_id
      lat
      lon
      vehicle_type
      is_reserved
      is_disabled
    }
  }
`;
const Vehicles = () => {
  // you can try passing the bike_id here to get an individual vehicle :)
  // for example

  /*const { loading, data } = useQuery(GET_VEHICLES, {
    variables: {
      bike_id: "UFFVQK",
    },
  });*/

  // fetches the list
  const [getVehicles, { data, loading }] = useLazyQuery(GET_VEHICLES);
  const [id, setId] = useState("");
  useEffect(() => {
    getVehicles();
  }, []);
  const handleSearch = () => {
    getVehicles({
      variables: {
        bike_id: id,
      },
    });
  };
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      {loading && <p>Loading....</p>}
      {!loading && <h4>List returned</h4>}
      {!loading && (
        <div style={{ margin: "10px" }}>
          <input
            onChange={(e) => setId(e.target.value)}
            type="text"
            placeholder="Enter bike id"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
      {data &&
        data.vehicles.map((vehicle, i) => (
          <div
            style={{ background: "lightgray", margin: "5px", padding: "10px" }}
            key={i}
          >
            <p>id: {vehicle.bike_id}</p>
            <p>lat: {vehicle.lat}</p>
            <p>lon: {vehicle.lon}</p>
            <p>vehicle_type: {vehicle.vehicle_type}</p>
            <p>is_reserved: {vehicle.is_reserved}</p>
            <p>is_disabled: {vehicle.is_disabled}</p>
          </div>
        ))}
    </div>
  );
};
export default Vehicles;
