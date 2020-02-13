const express = require('express');
const fileDb = require("../fileDb");
const path = require('path');
const multer = require('multer');
const nanoid = require('nanoid');
const config = require('../config');

const storage = multer.diskStorage({
   destination: (req, file, cd) => {
      cd(null, config.uploadPath)
   },
   filename: (req, file, cd) => {
      cd(null, nanoid() + path.extname(file.originalname));
   }
})

const upload = multer({storage});
const router = express.Router();

router.get('/', (req, res) => {
   const items = fileDb.getItems();
   res.send(items);
});

router.post('/', upload.single('image'), (req, res) => {
   if(req.body.description.length > 0 ){
      if(req.file){
         req.body.image = req.file.filename;
      }
      if(req.body.author.length < 1){
         req.body.author = 'Anonymous'
      }
      req.body.id = nanoid();
      fileDb.addItem(req.body);
      res.send('ADD item');
   } else {
      res.status(404).send('ERROR')
   }

});

module.exports = router;