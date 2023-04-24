//const BASE_URL = "http://localhost:5000";

const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const JWT_SECRET = "Parasisgoodb$oi"
const {students, guides, coordinators,Ppt3} = require('./models/User');
// const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

const { body, validationResult } = require('express-validator');
const mysql = require('mysql');

const cors = require('cors');

  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  const bcrypt = require('bcryptjs');

// signup actaul student
app.post('/studentpost', [
  // Validate the name field
  body('name').notEmpty().isLength({ max: 255 }),

  // Validate the email field
  body('email').notEmpty().isEmail(),

  // Validate the password field
  body('cpassword').notEmpty().isLength({ min: 6 }),

  // Validate the confirm password field
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.cpassword) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
], async  (req, res) => {
  var success=false;
  // Check if there are any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

 // Hash the password
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(req.body.cpassword, salt);


  // Insert the user data into the MySQL database
  const { name, email, cpassword  ,confirmPassword } = req.body;
 
  students.create({ name, email, cpassword : hashedPassword ,confirmPassword })
  .then((students) => {
    const token = jwt.sign(students.id, JWT_SECRET);
    console.log(token);
    success=true;
            res.status(201).json({success,students,token});
          })
          .catch((error) => {
           console.log("Error hai :",error);
              });
 
});

// signup actaul guide
app.post('/guidepost', [
    // Validate the name field
    body('name').notEmpty().isLength({ max: 255 }),
  
    // Validate the email field
    body('email').notEmpty().isEmail(),
  
    // Validate the password field
    body('cpassword').notEmpty().isLength({ min: 6 }),
  
    // Validate the confirm password field
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.cpassword) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ], async  (req, res) => {
    var success=false;
    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
  
   // Hash the password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.cpassword, salt);
  
  
    // Insert the user data into the MySQL database
    const { name, email, cpassword  ,confirmPassword } = req.body;
   
    guides.create({ name, email, cpassword : hashedPassword ,confirmPassword })
    .then((guides) => {
      const token = jwt.sign(guides.id, JWT_SECRET);
      console.log(token);
      success=true;
              res.status(201).json({success,guides,token});
            })
            .catch((error) => {
             console.log("Error hai :",error);
                });
   
  });

  // signup actaul coordinator
app.post('/coordinatorpost', [
    // Validate the name field
    body('name').notEmpty().isLength({ max: 255 }),
  
    // Validate the email field
    body('email').notEmpty().isEmail(),
  
    // Validate the password field
    body('cpassword').notEmpty().isLength({ min: 6 }),
  
    // Validate the confirm password field
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.cpassword) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  ], async  (req, res) => {
    var success=false;
    // Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
  
   // Hash the password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.cpassword, salt);
  
  
    // Insert the user data into the MySQL database
    const { name, email, cpassword  ,confirmPassword } = req.body;
   
    coordinators.create({ name, email, cpassword : hashedPassword ,confirmPassword })
    .then((coordinators) => {
      const token = jwt.sign(coordinators.id, JWT_SECRET);
      console.log(token);
      success=true;
              res.status(201).json({success,coordinators,token});
            })
            .catch((error) => {
             console.log("Error hai :",error);
                });
   
  });









// login actaul // student
app.post('/login', async (req, res) => {
  var success = false ;
  const { email, cpassword } = req.body;

  // Find the user in the MySQL database
  const user = await students.findOne({ where: { email: email } });
  if (!user) {
    return res.status(400).json({success, message: 'Invalid credentials' });
  }

  // Compare the password with the hashed password in the database
  const isValidPassword = await bcrypt.compare(cpassword, user.cpassword);
  if (!isValidPassword) {
    return res.status(400).json({success, message: 'Invalid credentials' });
  }

  // Create and send a JWT token as a response
  success=true;
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({success, token });
});

// login actaul guide
app.post('/guidelogin', async (req, res) => {
    var success = false ;
    const { email, cpassword } = req.body;
  
    // Find the user in the MySQL database
    const user = await guides.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({success, message: 'Invalid credentials' });
    }
  
    // Compare the password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(cpassword, user.cpassword);
    if (!isValidPassword) {
      return res.status(400).json({success, message: 'Invalid credentials' });
    }
  
    // Create and send a JWT token as a response
    success=true;
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({success, token });
  });


  // login actaul // co
app.post('/cologin', async (req, res) => {
    var success = false ;
    const { email, cpassword } = req.body;
  
    // Find the user in the MySQL database
    const user = await coordinators.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({success, message: 'Invalid credentials' });
    }
  
    // Compare the password with the hashed password in the database
    const isValidPassword = await bcrypt.compare(cpassword, user.cpassword);
    if (!isValidPassword) {
      return res.status(400).json({success, message: 'Invalid credentials' });
    }
  
    // Create and send a JWT token as a response
    success=true;
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({success, token });
  });




  // ***************************** Review ***********************

  const {review1,review1_results,Ppt,review2_results,review3_results} = require('./models/User');

  // post topics
app.post('/topicpost', async  (req, res) => {
  var success=false;

  // Insert the user data into the MySQL database
  const { email , topic1 , topic2 , topic3 } = req.body;
 
  review1.create({ email, topic1 , topic2 , topic3})
  .then((review1) => {
    success=true;
            res.status(201).json({success,review1});
          })
          .catch((error) => {
            success = false;
           console.log("Error hai :",error.fields);
           res.status(201).json(error.fields);
              });
 
});

// get topics by particular student
const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root123',
  database:'seminar'
})

con.connect((err)=>{
  if(err){
      console.log(err);
  }else{
      console.log("*****************Database Connected seminar successfully********** !!")
  }
})
app.get('/gettopics', async (req,res)=>{
  
await  con.query('select * from review1s',function(err,result,fields){
      if(err){
          console.log(err);
      }else{
       //res.send(result);
       var r = JSON.parse(JSON.stringify(result)) // JSON must be capital
      }
      res.send(r);
  })
})

  // post result 1
  app.post('/result_1', async  (req, res) => {
    var success=false;
  
    // Insert the user data into the MySQL database
    const { email , topic ,marks } = req.body;
   
    review1_results.create({ email, topic ,marks})
    .then((result_1) => {
      success=true;
              res.status(201).json({success,result_1});
            })
            .catch((error) => {
             console.log("error hai : ",error)
                });
   
  });

  // get result 1
  app.post('/getresult1', async (req,res)=>{
    const email = req.body.email;
  await  con.query(`select * from review1_results where email='${email}'`,function(err,result,fields){
        if(err){
            console.log(err);
        }else{
         //res.send(result);
         var t = JSON.parse(JSON.stringify(result)) // JSON must be capital
        }
        res.send(t);
    })
  
  })

  //sendppt review 2
// configure multerconst storage = multer.diskStorage({
  const multer = require('multer');
const fs = require('fs');
const path = require('path');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'P:\\Seminar\\seminar\\backend\\uploads\\');
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  });

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/vnd.ms-powerpoint' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only ppt and pptx files are allowed.'));
    }
  }
}).single('ppt');

// review 2
app.post('/sendppt', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(400).send(err.message);
    }

    // File is uploaded successfully
    const ppt = req.file;
    const email = req.body.email;
    const filename = req.body.filename

    // Store the file in the database
    const pptData = fs.readFileSync(path.join(__dirname, `uploads/${ppt.filename}`));
    // Your database code here...
    Ppt.create({ email,filename, pptData })
    .then((result) => {
      success=true;
              res.status(201).json({success,result});
            })
            .catch((error) => {
             console.log("error hai : ",error)
                });
  });
});


app.post('/getppt', async (req, res) => {
  const email = req.body.email;
  const filename = req.body.filename;

  // Validate the email and filename here...

  await con.query(`SELECT * FROM ppts WHERE email='${email}' AND filename='${filename}'`, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    } else {
      if (result && result.length > 0) {
        const pptData = result[0].pptData;
        const pptBuffer = Buffer.from(pptData, 'binary');

        const responseData = {
          email: email,
          filename: filename,
          pptBuffer: pptBuffer
        };

        res.status(200).json(responseData);
        console.log(`File ${filename} sent successfully`);
      } else {
        res.status(404).json({ message: 'File not found' });
      }
    }
  });
});

//send ppt reviwe3 
app.post('/sendppt3', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err.message);
      return res.status(400).send(err.message);
    }

    // File is uploaded successfully
    const ppt = req.file;
    const email = req.body.email;
    const filename = req.body.filename

    // Store the file in the database
    const pptData = fs.readFileSync(path.join(__dirname, `uploads/${ppt.filename}`));
    // Your database code here...
    Ppt3.create({ email,filename, pptData })
    .then((result) => {
      success=true;
              res.status(201).json({success,result});
            })
            .catch((error) => {
             console.log("error hai : ",error)
                });
  });
});


app.post('/getppt3', async (req, res) => {
  const email = req.body.email;
  const filename = req.body.filename;

  // Validate the email and filename here...

  await con.query(`SELECT * FROM ppt3s WHERE email='${email}' AND filename='${filename}'`, function (err, result, fields) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    } else {
      if (result && result.length > 0) {
        const pptData = result[0].pptData;
        const pptBuffer = Buffer.from(pptData, 'binary');

        const responseData = {
          email: email,
          filename: filename,
          pptBuffer: pptBuffer
        };

        res.status(200).json(responseData);
        console.log(`File ${filename} sent successfully`);
      } else {
        res.status(404).json({ message: 'File not found' });
      }
    }
  });
});

//post result 2
app.post('/entermarks', async  (req, res) => {
  var success=false;

  // Insert the user data into the MySQL database
  const { email ,marks } = req.body;
 
  review2_results.create({ email,marks})
  .then((result_2) => {
    success=true;
            res.status(201).json({success,result_2});
          })
          .catch((error) => {
           console.log("error hai : ",error)
              });
 
});

 // get result 2
 app.post('/getresult2', async (req,res)=>{
  const email = req.body.email;
await  con.query(`select * from review2_results where email='${email}'`,function(err,result,fields){
      if(err){
          console.log(err);
      }else{
       //res.send(result);
       var t = JSON.parse(JSON.stringify(result)) // JSON must be capital
      }
      res.send(t);
  })

})


//post result 3
app.post('/entermarks3', async  (req, res) => {
  var success=false;

  // Insert the user data into the MySQL database
  const { email ,marks } = req.body;
 
  review3_results.create({ email,marks})
  .then((result_3) => {
    success=true;
            res.status(201).json({success,result_3});
          })
          .catch((error) => {
           console.log("error hai : ",error)
              });
 
});

 // get result 3
 app.post('/getresult3', async (req,res)=>{
  const email = req.body.email;
await  con.query(`select * from review3_results where email='${email}'`,function(err,result,fields){
      if(err){
          console.log(err);
      }else{
       //res.send(result);
       var t = JSON.parse(JSON.stringify(result)) // JSON must be capital
      }
      res.send(t);
  })
})


 // co ordinator
//  app.get('/retrieve-email-and-name', (req, res) => {
//   // execute the query to retrieve email and name from the two tables
//   con.query('SELECT students.email, guides.name FROM students JOIN guides ON students.id = guides.id', (error, results) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }

//     // create a new table to store the email and name
//     con.query('CREATE TABLE IF NOT EXISTS assigned (email VARCHAR(255), name VARCHAR(255))', (error) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//       }

//       // loop through the results and insert each row into the new table
//       for (let i = 0; i < results.length; i++) {
//         const row = results[i];
//         con.query('INSERT INTO assigned (email, name) VALUES (?, ?)', [row.email, row.name], (error) => {
//           if (error) {
//             console.error(error);
//             return res.status(500).json({ message: 'Internal server error' });
//           }
//         });
//       }
//       // return a success response
//       return res.status(200).json({ message: 'Email and name retrieved and stored successfully' });
//     });
//   });
// });


// define an endpoint that stores the selected pair of student and guide in the new table
app.post('/store-selected-pair', (req, res) => {
  const { studentId, student_name, guideId, guide_name } = req.body;

  con.query('CREATE TABLE IF NOT EXISTS selected_pairs (student_id INT, student_name VARCHAR(30), guide_id INT, guide_name VARCHAR(30))', (error) => {
    if (error) {
      console.error(error);
    }
  });
  // insert the selected pair into the new table
  con.query('INSERT INTO selected_pairs (student_id,student_name, guide_id,guide_name) VALUES (?,?,?,?)', [studentId, student_name, guideId, guide_name], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    // return a success response
    return res.status(200).json({ message: 'Selected pair stored successfully' });
  });
});


app.get('/get-students', (req, res) => {
  // retrieve the list of students from the students table in the database
  con.query('SELECT * FROM students', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving students');
    } else {
      res.send(results);
    }
  });
});

// API endpoint to get the list of guides
app.get('/get-guides', (req, res) => {
  // retrieve the list of guides from the guides table in the database
  con.query('SELECT * FROM guides', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving guides');
    } else {
      res.send(results);
    }
  });
});


app.listen(5000, () => {
    console.log(`Server started on port 3000`);
  });