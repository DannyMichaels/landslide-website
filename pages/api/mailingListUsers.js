import dbConnect from '../../lib/dbConnect';
import MailingListUser from '../../models/MailingListUser';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const newUser = await MailingListUser.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: newUser });
      } catch (error) {
        if (error.keyValue?.email !== null && error?.code === 11000) {
          res.status(400).json({
            success: false,
            error: 'Error: email address already exists.',
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

const formatErrorMessage = (errMsg) => {
  return errMsg.replace('MailingListUser validation failed: ', '');
};
