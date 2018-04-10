
const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ 
  storage: storage,
  limits: 3 * 1000 *1000,
  fileFilter:function(req, file, cb) {
    if(file.mimetype !== 'image/png'){
      cb(new Error('Only accept png file'));
    }
    cb(null, true);
  }
})


const promise = (files) => {
  return files.map(el => {
    return new Promise((resolve, reject)=>{
      fs.rename(el.path, 'public/images/' + el.originalname, err => {
        if (err) {
          reject(err);
        } else {
          resolve(el);
        }
      }); 
    })
  })
}

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/monupload",(req, res, next) => {
  res.render("upload");
});

router.post('/monupload', upload.array('files'), (req, res, next) => {

    Promise.all(promise(req.files)).then(result =>{
      const name = result.map(el => `Pictures: ${el.originalname}   Size: ${el.size}`);
      res.render("success", {name,title:"Upload Success"});
    }).catch(err => res.send('Erreur Upload !!! try Again :)'))
})

module.exports = router;