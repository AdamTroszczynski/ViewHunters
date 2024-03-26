import type { Request, Response } from 'express';
import { StatusCodesEnum } from '@/enums/StatusCodesEnum';
import dbClient from '@/services/dbClient';
import { ErrorMessagesEnum } from '@/enums/ErrorMessagesEnum';
import type Message from '@/types/Message';
import {
  getAllMessagesBO,
  getMessageByIdBO,
  createMessageBO,
  updateMessageBO,
  deleteMessageBO,
} from '@/services/messageService/messageBO';

/**
 * Get all messages action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const getAllMessagesAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages: Message[] = await getAllMessagesBO();
    res.status(StatusCodesEnum.OK).json(messages);
  } catch (err) {
    console.error(err);
    res.status(StatusCodesEnum.ServerError).json({ msg: ErrorMessagesEnum.ServerError });
  } finally {
    await dbClient.$disconnect();
  }
};

/**
 * Get single message by id action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const getMessageByIdAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const message: Message | null = await getMessageByIdBO(Number(id));
    res.status(StatusCodesEnum.OK).json(message);
  } catch (err) {
    console.error(err);
    res.status(StatusCodesEnum.ServerError).json({ msg: ErrorMessagesEnum.ServerError });
  } finally {
    await dbClient.$disconnect();
  }
};

/**
 * Create message action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const createMessageAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content } = req.body;
    const message: Message = await createMessageBO(content);
    res.status(StatusCodesEnum.OK).json(message);
  } catch (err) {
    console.error(err);
    res.status(StatusCodesEnum.ServerError).json({ msg: ErrorMessagesEnum.ServerError });
  } finally {
    await dbClient.$disconnect();
  }
};

/**
 * Update single message by id action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const updateMessageAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const message: Message = await updateMessageBO(Number(id), content);
    res.status(StatusCodesEnum.OK).json(message);
  } catch (err) {
    console.error(err);
    res.status(StatusCodesEnum.ServerError).json({ msg: ErrorMessagesEnum.ServerError });
  } finally {
    await dbClient.$disconnect();
  }
};

/**
 * Delete single message by id action
 * @param {Request} req Request
 * @param {Response} res Response
 */
export const deleteMessageAction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const message: Message = await deleteMessageBO(Number(id));
    res.status(StatusCodesEnum.OK).json(message);
  } catch (err) {
    console.error(err);
    res.status(StatusCodesEnum.ServerError).json({ msg: ErrorMessagesEnum.ServerError });
  } finally {
    await dbClient.$disconnect();
  }
};
