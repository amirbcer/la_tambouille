import { Message } from '../models/Message';
import apiService from './ApiService';

export const chatService = {
  async initChat(recipeId: number): Promise<Message[]> {
    const { data } = await apiService.get<{ messages: Message[] }>(`/recipes/${recipeId}/chat.json`);

    return data.messages;
  },

  async createMessage(message: Message, recipeId: number): Promise<Message> {
    const { data } = await apiService.post<Message>(`/recipes/${recipeId}/chat/messages.json`, { message });

    return data;
  },
};
