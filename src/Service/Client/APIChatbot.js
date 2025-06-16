import api from "../../utils/CustomizeApi";

export const sendMessageToAI = async (message) => {
  const response = await api.post("/client/chat", { message });
  return response.data;
};
