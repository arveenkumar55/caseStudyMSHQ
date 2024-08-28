var express = require("express");
var router = express.Router();

var sql = require("../util/database");

//var admin = require("../util/webNotification");


/* GET home page. */
var authentication = require("../middleware/authentication");

var Email =  require("../util/Email")

const admin = require('firebase-admin');

// Path to your service account key file
const serviceAccount = require('.././util/mashreqwebapp-firebase-adminsdk-9hbnx-4e32203136.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const message = {
  notification: {
    title: 'Hello World',
    body: 'This is a test notification from Firebase!',
  },
  token: 'eGaLfLEQwnQKhDbJiqpo-T:APA91bEw6_L4p3JmMZqdGj0J15mOGBC7wUxMsHfeVG--rgJB9rd-ghijV86E3RNq3Cu22JmmpKsXEY8d6GPRHivcUT9T9x1umTjxi--yaA1nUpn-PSG_WPzCa7CE9ZUAit7-JC1uRgWl', // Replace with the recipient device token
};

router.post("/ResetPassword", async function (req, res, next) {

   
  try {
    var request = new sql.Request();
    
    request.query(
      `select * from Users where email= '` + req.body.email + `'`,
      async (error, recordset) => {
        console.log("error", recordset);
  
        if (recordset?.recordset?.length > 0) {
          let user = recordset.recordset[0];
          Email.sendPasswordEmail(req.body.email, user.ID);
          res
            .status(200)
            .send({
              success: true,
              message: "Please check your email for Reset Passowrd",
              payload: recordset,
            });
  
        } else {
          res
            .status(200)
            .send({ success: false, message: "Invalid Email ", payload: {} });
        }
      }
    );
  
    } catch (ex) {
      res.status(500).send({ message: "Internal Server Occured" });
    }
})

router.post("/Signup", async function (req, res, next) {
  try {

    
    var request = new sql.Request();


    let orgPassword = Math.random().toString().slice(2,11)

    console.log('orgPassword',orgPassword)

    let password = await authentication.encrypt(orgPassword)

    req.body.pass = orgPassword

    // console.log('req.body', authentication.encrypt(req.body.pass))
    request.input(`FirstName`, req.body.FirstName);
    request.input(`LastName`, req.body.LastName);
    request.input(`cusTechRole`, req.body.cusTechRole);
    request.input(`email`, req.body.email);
    request.input(`pass`, password);
    request.input(`Ispromotion`, req.body.Ispromotion);
    request.input(`isPasswordVerifed`, 0);
    request.input(`isSuperManager`, 0);


    request.query(
      `select * from Users where email= '` + req.body.email + `'`,
      async (error, recordset) => {
        console.log("error", recordset);
  
        if (recordset?.recordset?.length > 0) {

          res
            .status(200)
            .send({
              success: false,
              message: "Email address already exist Please choose another one",
              payload: recordset,
            });

        } else {

          
    request.query(
      `insert into Users(FirstName, LastName, cusTechRole, email, Pass, Ispromotion, isSuperManager, isPasswordVerifed) values
  
  (@FirstName, @LastName, @cusTechRole, @email, @pass, @Ispromotion, @isSuperManager, @isPasswordVerifed)`,
      (error, recordset) => {
        console.log("recordset", error);

        if (!error) {
          Email.sendEmail(req.body);
          res
            .status(200)
            .send({
              success: true,
              message: "user created successfully",
              payload: recordset,
            });
        } else {
          res
            .status(200)
            .send({
              success: false,
              message: "user not created successfully",
              payload: recordset,
            });
        }
      }
    );

        }

    })
  } catch (ex) {
    console.log('error', ex)
    res.status(500).send({ message: "Internal Server Occured" });
  }

  // res.render('index', { title: 'Express' });
});




router.post("/updateProfile", authentication.authenticateToken, async function (req, res, next) {
  try {
    var request = new sql.Request();
    let password = await authentication.encrypt(req.body.pass)
    console.log('req.body', req.user)
    request.input(`FirstName`, req.body.FirstName);
    request.input(`ID`, req.user.ID);
    request.input(`LastName`, req.body.LastName);
    // request.input(`cusTechRole`, req.body.cusTechRole);
    // request.input(`email`, req.body.email);
    request.input(`pass`, password);
    request.input(`Ispromotion`, req.body.Ispromotion);


    let Query = `UPDATE Users SET FirstName = @FirstName,
    LastName = @LastName, pass = @pass, Ispromotion = @Ispromotion
    WHERE ID = @ID`
    request.query(Query,
      (error, recordset) => {
        console.log("recordset", error);

        if (!error) {
          res
            .status(200)
            .send({
              success: true,
              message: "Profile updated successfully",
              payload: recordset,
            });
        } else {
          res
            .status(200)
            .send({
              success: false,
              message: "Profile not updated successfully",
              payload: recordset,
            });
        }
      }
    );
  } catch (ex) {
    res.status(500).send({ message: "Internal Server Occured" });
  }
});


router.post("/updatePassword", async function (req, res, next) {
  try {
    var request = new sql.Request();

    let Query = `select * from Users where email= '` + req.body.email + `'`

    if(req.body.userId) {

      Query = `select * from Users where ID= ` + req.body.userId 
    } 
    request.query(
      Query,
      async (error, recordset) => {
        console.log("error", recordset);
  
        if (recordset?.recordset?.length > 0) {
          let user = recordset.recordset[0];
  
          let login = await authentication.comparePassword(req.body.pass, user.Pass)
          if(login) {
            
            res
            .status(200)
            .send({
              success: false,
              message: "Password Should change from existing Password",
              payload: recordset,
            });
          
        } else {
          let password = await authentication.encrypt(req.body.pass)
          request.input(`ID`, user.ID);
          request.input(`pass`,password);
          request.input(`isPasswordVerifed`, 1);
      
      
          let Query = `UPDATE Users SET pass = @pass, isPasswordVerifed=@isPasswordVerifed  WHERE ID = @ID`
          request.query(Query,
            (error, recordset) => {
              console.log("recordset", error);
      
              if (!error) {
                res
                  .status(200)
                  .send({
                    success: true,
                    message: "Password updated successfully",
                    payload: recordset,
                  });
              } else {
                res
                  .status(200)
                  .send({
                    success: false,
                    message: "Password not updated successfully",
                    payload: recordset,
                  });
              }
            }
          );
        }
      }
    }
    );

  } catch (ex) {
    res.status(500).send({ message: "Internal Server Occured" });
  }
});

router.post("/SignIn", function (req, res, next) {

  try {
  var request = new sql.Request();

  let query =    `select * from Users where email= '` + req.body.email + `'` + ` OR FirstName= '` + req.body.email + `'`

  console.log('query ' , query);

  
  request.query(
    `select * from Users where email= '` + req.body.email + `'` + ` OR FirstName= '` + req.body.email + `'`,
    async (error, recordset) => {
      console.log("error", recordset);

      if (recordset?.recordset?.length > 0) {
        let user = recordset.recordset[0];

        let login = await authentication.comparePassword(req.body.pass, user.Pass)
        if(login) {

        user.token = authentication.generateAccessToken(
          user.ID + "-" + user.email + '-' + user.cusTechRole
        );

        admin.messaging().send(message)
        .then((response) => {
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
       res.status(200).send({ success: true, message: "User login Successfully", payload: user });

      }
      else {
        res
          .status(200)
          .send({ success: false, message: "Invalid Email or Password", payload: {} });
      }
      } else {
        res
          .status(200)
          .send({ success: false, message: "Invalid Email or Password", payload: {} });
      }
    }
  );

  } catch (ex) {
    res.status(500).send({ message: "Internal Server Occured" });
  }

});

module.exports = router;
