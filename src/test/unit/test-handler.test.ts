const axios = require("axios");

const urlGet = "https://5ju4xm2e9a.execute-api.us-east-1.amazonaws.com/dev";
const urlPost = "https://5ju4xm2e9a.execute-api.us-east-1.amazonaws.com/dev";

const objTest = {
  nombre: "Pedro",
  apellido: "Diaz",
  edad: 33,
};

describe("Unit test for app handler", function () {
  it("verifies successful response", async () => {
    const res = await axios.get(`${urlGet}/get-users`);
    expect(res.status).toEqual(200);
  });
});

describe("Unit test for app handler", function () {
  it("verifies successful response", async () => {
    const res = await axios.post(`${urlPost}/save`, objTest);
    expect(res.status).toEqual(200);
  });
});
