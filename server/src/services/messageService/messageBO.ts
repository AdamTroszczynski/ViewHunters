import {
  getAllMessagesDAO,
  getMessageByIdDAO,
  createMessageDAO,
  updateMessageDAO,
  deleteMessageDAO,
} from '@/services/messageService/messageDAO';
import type Message from '@/types/Message';

/**
 * Get all messages BO
 * @returns {Message[]} Array of all messages
 */
export const getAllMessagesBO = async (): Promise<Message[]> => {
  return await getAllMessagesDAO();
};

/**
 * Get message by id BO
 * @param {number} id message id
 * @returns {Message|null} message or null if message with `id` doesn't exists
 */
export const getMessageByIdBO = async (id: number): Promise<Message | null> => {
  return await getMessageByIdDAO(id);
};

/**
 * Create new message BO
 * @param {string} content
 * @returns {Message} created message
 */
export const createMessageBO = async (content: string): Promise<Message> => {
  return await createMessageDAO(content);
};

/**
 * Update message BO
 * @param {number} id message id
 * @param {string} content message content
 * @returns {Message} updated message
 */
export const updateMessageBO = async (id: number, content: string): Promise<Message> => {
  return await updateMessageDAO(id, content);
};

/**
 * Delete message BO
 * @param {number} id message id
 * @returns {Message} deleted message
 */
export const deleteMessageBO = async (id: number): Promise<Message> => {
  return await deleteMessageDAO(id);
};
