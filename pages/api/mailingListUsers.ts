import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import MailingListUser from '../../models/MailingListUser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const newUser = new MailingListUser(JSON.parse(req.body));
        await newUser.save();
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
