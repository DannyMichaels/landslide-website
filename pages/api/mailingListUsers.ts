import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import MailingListUser from '../../models/MailingListUser';

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

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

module.exports = allowCors(handler);
