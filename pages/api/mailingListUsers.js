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
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
