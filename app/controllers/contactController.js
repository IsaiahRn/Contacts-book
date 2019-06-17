import mongoose from 'mongoose';
import Contact from '../models/models';

class contactController {
  static async createContact(req, res) {
    try {
      const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        telephone: req.body.telephone,
        email: req.body.email,
        homeAddress: req.body.homeAddress,
        workAddress: req.body.workAddress,
        organisation: req.body.organisation,
      });
      const result = await contact.save();
      return res.status(201).json({
        message: 'Success',
        status: res.statusCode,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: `${error}`,
      });
    }
  }
}

export default contactController;
