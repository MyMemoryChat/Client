import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: { messages: [] },
  reducers: {
    addMessage: (state, action) => {
      const { role, message } = action.payload;
      state.messages.push({ role, message });
    },
    removeLastMessage: (state) => {
      state.messages.pop();
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

// Export actions
export const { addMessage, removeLastMessage, clearMessages } = messageSlice.actions;

// Export reducer
export default messageSlice.reducer;