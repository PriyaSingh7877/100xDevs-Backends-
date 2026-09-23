
const multer = require('multer');
const path = require('path');

//Stroage config - file kaha aur kaise save ho
const Stroage = multer.diskStorage({


  //kahan save karo 
  destination: (req, file, cb) =>{
    cb(null, 'uploads/');
  },

  //kya naam do
  filename:(req, file, cb) =>{
    const uniqueName = Data.now() + '-' + file.originalname;
    cb(null,uniqueName);
  }
});

//File filter - sirf image allow karo
const fileFilter =(req, file, cb) =>{
  const allowedTypes = ['image/jpeg', ' image/png', 'image/png'];

  if (allowedTypes.includes(file.mimetype)){
    cb(null, true); // allow karo
    }
else{
  cb(new Error('Sirf image allowed hain!'), false); //reject karo
  }
};

const upload = multer({ Stroage, fileFilter});

module.exports = upload;

 //diskStorage  → File disk pe save hogi
// destination  → uploads/ folder mein
// filename     → unique naam — timestamp + original naam
// fileFilter   → sirf jpg, jpeg, png allow