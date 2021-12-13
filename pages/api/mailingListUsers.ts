import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import MailingListUser from '../../models/MailingListUser';
import Cors from 'cors';
import { runMiddleware } from '../../utils/apiUtils';

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST'],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        await runMiddleware(req, res, cors);

        const newUser = await MailingListUser.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, newUser });
      } catch (error) {
        if (error.keyValue?.email !== null && error?.code === 11000) {
          res.status(400).json({
            success: false,
            error: 'email address already exists.',
          });
        } else {
          res
            .status(400)
            .json({ success: false, error: formatErrorMessage(error.message) });
        }
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

const formatErrorMessage = (errMsg: string) => {
  const string = errMsg.includes('email:') ? 'email:' : '';

  return errMsg.replace(`MailingListUser validation failed: ${string}`, '');
};
