import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import Contact from '../models/models';
import validatation from '../helpers/validation';

class contactController {
  static async createContact(req, res) {
    try {
      const {
        firstname, lastname, telephone, email, homeAddress, workAddress, organisation,
      } = req.body;
      const { error } = Joi.validate(req.body, validatation.contactSchema);
      if (error) {
        const errors = [];
        for (let index = 0; index < error.details.length; index += 1) {
          errors.push(error.details[index].message.split('"').join(''));
        }
        return res.status(400).send({
          status: res.statusCode,
          error: errors,
        });
      }
      const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        firstname,
        lastname,
        telephone,
        email,
        homeAddress,
        workAddress,
        organisation,
      });
      const result = await contact.save();
      return res.status(201).json({
        message: 'Success',
        status: res.statusCode,
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: `${err}`,
      });
    }
  }

  static async deleteContact(req, res) {
    try {
      const { id } = req.params;
      if (mongoose.Types.ObjectId.isValid(id)) {
        Contact.findOneAndRemove({ _id: id })
          .then((docs) => {
            if (docs) {
              res.status(200).json({
                status: 200,
                id: req.params.id,
                message: 'Contact Deleted successfully!',
              });
            } else {
              res.status(404).json({
                status: 404,
                id: req.params.id,
                message: 'This id is not Exist!',
              });
            }
          }).catch((err) => {
            console.log(err);
          });
      } else {
        return res.status(400).json({
          status: 400,
          message: 'please provide correct Id',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: res.statusCode,
        error: `${error}`,
      });
    }
  }
}

export default contactController;
