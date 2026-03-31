import Charity from '../models/Charity.js';

export const getCharities = async (req, res) => {
  try {
    const charities = await Charity.find({});
    res.json(charities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCharity = async (req, res) => {
  const { name, description, image, category, isFeatured } = req.body;

  try {
    const charity = await Charity.create({
      name,
      description,
      image,
      category,
      isFeatured
    });
    res.status(201).json(charity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCharity = async (req, res) => {
  try {
    const charity = await Charity.findById(req.params.id);

    if (charity) {
      charity.name = req.body.name || charity.name;
      charity.description = req.body.description || charity.description;
      charity.image = req.body.image || charity.image;
      charity.category = req.body.category || charity.category;
      charity.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : charity.isFeatured;

      const updatedCharity = await charity.save();
      res.json(updatedCharity);
    } else {
      res.status(404).json({ message: 'Charity not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
