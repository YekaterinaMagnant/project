
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';

import {registerValidation,loginValidation, postCreateValidation} from './validations.js';



import {handleValidationErrors, checkAuth} from './utils/index.js';



import { userController, postController } from './controllers/index.js';


mongoose.connect('mongodb+srv://kat:1212@cluster0.64c2alg.mongodb.net/blog?retryWrites=true&w=majority')
.then(()=>
console.log('db ok'))
.catch((err)=> console.log('db err', err));

const app = express();
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
      }
      cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  
  
  const upload = multer({ storage });
app.use(express.json());
app.use(cors());

app.use('/uploads',express.static('uploads'));

app.post('/auth/login',loginValidation, handleValidationErrors, userController.login );

app.post ('/auth/register', registerValidation, handleValidationErrors, userController.register);

app.get('/auth/me', checkAuth,userController.getMe);


app.post('/upload',  checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: '/uploads/${req.file.originalname}',
  });


});

app.get('/tags', postController.getLastTags);

app.get('/posts', postController.getAll);
app.get('/posts/tags', postController.getLastTags);

app.get('/posts/:id', postController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors ,postController.create);
app.delete('/posts/:id',checkAuth, postController.remove);
app.patch('/posts/:id',checkAuth, postCreateValidation, handleValidationErrors, postController.update);


app.listen(4444, (err) => {
    if (err){
        return console.log(err);
    }
    console.log('server OK');
});