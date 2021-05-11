const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const api = `https://api.helbiz.com/admin/reporting/arlington/gbfs/free_bike_status.json`;

// defines the schema for VehicleStatus type

var schema = buildSchema(`
  type Query {
    vehicles(bike_id: String): [VehicleStatus]
  }
  type VehicleStatus {
      bike_id: String!
      lat: Float!
      lon: Float!
      is_reserved: Int!
      is_disabled: Int!,
      vehicle_type: String!
  }
`);

var root = {
  // sets a vehicles endpoint
  vehicles: async ({ bike_id }) => {
    const { data } = await fetch(api).then((res) => res.json());
    // if bike_id is defined then return that vehicle
    if (bike_id) return data.bikes.filter((bike) => bike.bike_id === bike_id);
    // if not return the whole list
    return data.bikes;
  },
};
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
