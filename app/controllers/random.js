import mongoose from 'mongoose';
import Contact from '../models/models';

export const postContact = async (req, res, next) => {
  const contactUser = new Contact({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    telephone: req.body.telephone,
    email: req.body.email,
    homeAddress: req.body.homeAddress,
    workAddress: req.body.workAddress,
    organisation: req.body.organisation,
  });
  try {
    const data = await contactUser.save();

    return res.status(201).json({
      data,
      Message: 'sucessfully posted contact',
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

export const getContacts = (req, res, next) => {
  Contact.find().then((result) => {
    res.status(201).json({
      Result: result,
      Message: 'sucessfully fetched contacts',
    });
  });
};
