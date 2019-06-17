import mongoose from 'mongoose';
import Contact from '../models/models';

class contactController {
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
