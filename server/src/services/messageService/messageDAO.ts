import dbClient from '@/services/dbClient';
import type Message from '@/types/Message';

/**
 * Get all messages DAO
 * @returns {Message[]} Array of all messages
 */
export const getAllMessagesDAO = async (): Promise<Message[]> => {
  return await dbClient.message.findMany();
};

/**
 * Get message by id DAO
 * @param {number} id message id
 * @returns {Message|null} message or null if message with `id` doesn't exists
 */
export const getMessageByIdDAO = async (id: number): Promise<Message | null> => {
  return await dbClient.message.findFirst({ where: { id: id } });
};

/**
 * Create new message DAO
 * @param {string} content
 * @returns {Message} created message
 */
export const createMessageDAO = async (content: string): Promise<Message> => {
  return await dbClient.message.create({
    data: {
      content: content,
    },
  });
};

/**
 * Update message DAO
 * @param {number} id message id
 * @param {string} content message content
 * @returns {Message} updated message
 */
export const updateMessageDAO = async (id: number, content: string): Promise<Message> => {
  return await dbClient.message.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  });
};

/**
 * Delete message DAO
 * @param {number} id message id
 * @returns {Message} deleted message
 */
export const deleteMessageDAO = async (id: number): Promise<Message> => {
  return await dbClient.message.delete({
    where: {
      id: id,
    },
  });
};
