import weatherReducer, {
  loadingLocation,
  locationReceived,
  loadLocationFailue,
  weatherReceived,
  IWeatherState,
} from "../weatherSlice";

describe("weatherSlice", () => {
  const initialState: IWeatherState = {
    loading: false,
    error: "",
    locations: [
      {
        title: "Ho Chi Minh City",
        location_type: "City",
        woeid: 1252431,
        latt_long: "10.759180,106.662498",
      },
    ],
    weather: {},
  };

  it("should set status loading to true", async () => {
    const state = weatherReducer(initialState, loadingLocation);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: "",
    });
  });

  it("should update data of locations ", async () => {
    const location = [
      {
        title: "Ho Chi Minh City",
        location_type: "City",
        woeid: 1252431,
        latt_long: "10.759180,106.662498",
      },
    ];
    const action = { type: locationReceived.type, payload: location };
    const state = weatherReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      locations: action.payload,
    });
  });

  it("should update data of weather ", async () => {
    const weather = {
      time: '2022-01-02T10:57:00.199368+07:00',
      sun_rise: '2022-01-02T06:12:16.216101+07:00',
      sun_set: '2022-01-02T17:42:37.982035+07:00',
      latt_long: '10.759180,106.662498',
      timezone: 'Asia/Ho_Chi_Minh'
    };
    const actions = { type: weatherReceived.type, payload: weather };
    const state = weatherReducer(initialState, actions);
    expect(state.weather).toEqual(actions.payload);
  });

  it('should set status to "failed"', async () => {
    const action = {
      type: loadLocationFailue.type,
      payload: { message: "loading error" },
    };
    const state = weatherReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error: "loading error",
      loading: false,
    });
  });
});
