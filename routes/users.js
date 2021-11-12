var express = require('express');
var router = express.Router();
const {ensureAuth, ensureGuest} = require('../middleware/gAuth')
const db = require('../models');
const User = db.User;
const op = db.Sequelize.Op;

/* GET users listing. */
router.get('/:id',ensureAuth, async function(req, res, next) {
  const id = req.params.id;
  const user = await User.findByPk(id).catch(err=>{console.log(err)})
  res.json(user);
});

router.put('/:id', ensureAuth,async function(req, res, next) {
  const id = req.params.id;
  console.log(req.body)
  const user = await User.update(req.body,{
    where:{id:id}
  })
  .catch(err=>{console.log(err)})
  res.json(user);
});



module.exports = router;
