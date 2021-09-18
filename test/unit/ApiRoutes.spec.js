import axios from "axios";
import { values } from "lodash";
import { ApiRoutes } from "@/helpers/ApiRoutes";
import { isHttpsUri } from "valid-url";

const testParams = {
  _start: 4,
  _limit: 5
};

// Get an array of all the routes insight of ApiRoutes
const getFlatten = routes => {
  const output = [];
  const rootEl = values(routes);

  rootEl.forEach(section => {
    values(section).forEach(el => {
      if (typeof el === "string") {
        output.push(el);
      }
    });
  });

  return output;
};

const apiRoutesFlatten = getFlatten(ApiRoutes);

/* ---------------------------------- TESTS --------------------------------- */

describe("helpers/ApiRoutes", () => {
  it("Exists", () => {
    expect(ApiRoutes).toBeTruthy();
  });

  it("Is an instanceof Object", () => {
    expect(ApiRoutes).toBeInstanceOf(Object);
  });

  it("Has all valid HTTPS URLs", () => {
    apiRoutesFlatten.forEach(url => {
      expect(isHttpsUri(url)).toBeTruthy();
    });
  });

  for (let idx = 0; idx < apiRoutesFlatten.length; idx++) {
    const route = apiRoutesFlatten[idx];

    it(`${route}: Responds with 200 and Data is Array`, async () => {
      const { status, data } = await axios.get(route, { params: testParams });

      expect(status).toBe(200);
      expect(Array.isArray(data)).toBeTruthy();
    });

    it(`${route}: Data starts with el n.${testParams._start} and has length of ${testParams._limit}`, async () => {
      const { data } = await axios.get(route, { params: testParams });

      expect(data[0].id).toBe(testParams._start + 1);
      expect(data.length).toBe(testParams._limit);
    });
  }
});
