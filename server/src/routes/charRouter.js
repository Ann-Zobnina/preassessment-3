const express = require('express');
const { Character, User } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const apiCharRouter = express.Router();

apiCharRouter
  .route('/')
  .get(async (req, res) => {
    const chars = await Character.findAll({
      order: [['id', 'DESC']],
      include: User,
    });
    res.json(chars);
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const newChar = await Character.create({ ...req.body, userId: res.locals.user.id });
      const newCharWithUser = await Character.findOne({ where: { id: newChar.id }, include: User });
      res.status(201).json(newCharWithUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error while creating' });
    }
  });

apiCharRouter
  .route('/:id')
  .delete(verifyAccessToken, async (req, res) => {
    await Character.destroy({
      where: { id: req.params.id },
    });
    res.sendStatus(200);
  })
  .put(verifyAccessToken, async (req, res) => {
    try {
      const targetChar = await Character.findOne({ where: { id: req.params.id }, include: User });
      for (const key in req.body) {
        if (Object.hasOwnProperty.call(req.body, key)) {
          targetChar[key] = req.body[key];
        }
      }
      await targetChar.save();
      res.json(targetChar);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'ERROR EDITING CHAR' });
    }
  })
  .get(async (req, res) => {
    const char = await Character.findOne({ where: { id: req.params.id }, include: User });
    res.json(char);
  });

module.exports = apiCharRouter;
