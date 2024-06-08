const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (req.body.role) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: [req.body.roles],
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.verifyOTP = async(req,res)=>{
  try{
    if(req.body.otp ==='xyZl123'){
      return res.status(200).send({validOTP:true})
    }else{
      return res.status(200).send({validOTP:false})
    }
  }catch(error){
    return res.status(500).send({message:error.message})
  }
}

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id },
                           config.secret,
                           {
                            algorithm: 'HS256',
                            allowInsecureKeySizes: true,
                            expiresIn: 86400, // 24 hours
                           });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};



exports.passwordReset = async (req, res) => {
  console.log('user',req.body.newPassword,req.body.username)
  try {
    const user = await User.update({
      password: bcrypt.hashSync(req.body.newPassword, 8),
    },
    {
      where: { username: req.body.username }
    });
    // const user1 = await User.findOne({where:{username:req.body.username}});
  //    const user = await User.({
  //         password: bcrypt.hashSync(req.body.newPassword, 8),
  //         role:user1.role,
  //         email:user1.email
  //   },
  //   {
  //     where: { username: req.body.username }
  //   }

  // );
  // console.log('user1',user.username)

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.reset = async (req,res)=>{
  try{

    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    const email = await User.findOne({
      where:{
        email: req.body.email
      }
    })

    if (!user || !email) {
      return res.status(404).send({ message: "User name or email not found." });
    }

    var nodemailer = require('nodemailer');

    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // or 587 for STARTTLS
      secure: true, // true for SSL/TLS, false for STARTTLS
      auth: {
        user: 'www.anuhasr@gmail.com', // your Gmail username
        pass: 'ibcvrxiqhnsbawnv', // your Gmail password
      },
    });
    var mailOptions = {
      from: 'www.ahuhasr@gmail.com',
      to: req.body.email,
      subject: 'Library Management Login Password Reset',
      text: 'Your password reset key is xyZl123!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).send({
          message: "You will get the reset key!"
        });
      }
    });

  }catch(err){

  }

};
