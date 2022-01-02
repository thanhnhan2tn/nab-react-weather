import { getWeatherData, getLocationService } from "../weatherServices";

jest.mock("axios", () => ({
  get: async (url: string) => {
    return Promise.resolve({ data: { key: url.split("/").reverse()[0] } });
  },
}));

describe("weatherService", () => {
  it("getWeatherData", async () => {
    const result = await getWeatherData("1252431");
    expect(result).toEqual({ key: "1252431" });
  });
  it("getLocationService", async () => {
    const result = await getLocationService("San Francisco");
    expect(result).toEqual({
      key: "weather?query=San Francisco&endpoint=search",
    });
  });
});
