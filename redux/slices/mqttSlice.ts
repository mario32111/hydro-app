import { createSlice } from "@reduxjs/toolkit";
const initialState= {
  messages: [],
}
const mqttSlice = createSlice({
  name: "mqtt",
  initialState,
  reducers: {
    messageReceived: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { messageReceived } = mqttSlice.actions;
export default mqttSlice.reducer;
