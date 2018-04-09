const express = require('express');
const router = express.Router();


//GET /users/
router.get('/',(req, res, next) => {
  res.render('index', { title: 'Enter a Name or an number after /users' });
});

//GET user at /users/:name
router.get('/:name([A-Za-z]+)', (req, res, next) => {
  res.render('update-user', {
    user: `Je te connais ${req.params.name} :) Mouuaaaahhahahaa !!!`,
    path: req.params.name
  });
});


//GET id at /users/:id
router.get('/:id(\\d+)', (req, res, next) => {
  res.render(`delete-user`, {
    id:`You have to change your number ${req.params.id} because I know it now !!!!!`,
    numb:req.params.id
  });
});

//PUT new name at /users/:name
router.put('/:name([A-Za-z]+)', (req, res, next) => {
  res.send(`The new Name is ${req.body.name}`);
});


//DELETE id at /users/:id
router.delete('/:id(\\d+)', (req, res, next) => {
  res.send(`No more user with id ${req.body.id}`);
});

module.exports = router;
