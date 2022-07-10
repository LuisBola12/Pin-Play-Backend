const { uploadImageToAWS } = require("../s3"); 
const { tokenSign } = require("../helpers/jsonWToken");
const bcrypt = require("bcrypt");
const { users, recoveryCode } = require("../data/users.data");
const { players} = require("../data/players.data");
const {sendRecoveyEmail} = require("../services/mailer");

exports.createUser = async (req, res) => {
  try {
    let filePath = "user_icon2.png";
    if (req.files) {
      const photo = req.files.image_register;
      const fileExtension = photo.name.split(".").pop();
      filePath = `jugadores/jugador_${req.body.licenseNumber_register}.${fileExtension}`;
      try {
        await uploadImageToAWS(photo, filePath);
      } catch (error) {
        console.log("Error al subir la imagen");
      }
    }
    const data = {
      name: req.body.name_register,
      lastName1: req.body.lastname1_register,
      lastName2: req.body.lastname2_register,
      email: req.body.email_register,
      s3URL: `https://pin-play-ci0137.s3.amazonaws.com/${filePath}`,
      age: req.body.age_register,
      club: req.body.club_register,
      genre: req.body.genre_register,
      licenseNumber: req.body.licenseNumber_register,
    };

    const tokenSesion = await tokenSign(req.body.email);
    res.send({ data: data, tokenSesion });
  } catch (error) {
    console.log(error);
  }

};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let userData;
  users.forEach((element) => {
    if (Object.values(element).includes(email)) {
      userData = element;
    }
  });

  if (!userData || !(await bcrypt.compare(password, userData.password))) {
    res.status(401).json({errorMsg:"Credenciales Invalidas"});
    return;
  }

  let playerData;
  players.forEach((element) => {
    if (Object.values(element).includes(userData.userID)) {
      playerData = element;
    }
  });
  
  const tokenSesion = await tokenSign(email);
  res.send({ data: playerData, tokenSesion });
};

exports.recoverPassword = async (req, res) => {
  const { email } = req.body;
  let userData;
  users.forEach((element) => {
    if (Object.values(element).includes(email)) {
      userData = element;
    }
  });

  if (!userData) {
    res.status(401).json({errorMsg: "Credenciales Invalidas"});
    return;
  }

  recoveryCode.forEach((element) => {
    if (Object.values(element).includes(userData.userID)) {
      recoveryCode.splice(element,1)
    }
  });

  const randomToken = Math.floor(
    Math.random() * (999999 - 100000 + 1) + 100000
  );
  
  const nowDate = new Date();
  const expirationDate = new Date(
    nowDate.setMinutes(nowDate.getMinutes() + 15)
  ).toISOString();

  const recoveryCodeData = {
    userID: userData.userID,
    code: randomToken,
    date: expirationDate
  }

  recoveryCode.push(recoveryCodeData)

  sendRecoveyEmail(email,randomToken)
  
  res.status(200).send();

};


exports.resetPassword = async (req, res) => {
  const { email, password, recoveryCodeRecv } = req.body;

  let recoveryCodeData
  recoveryCode.forEach((element) => {
    if (Object.values(element).includes(parseInt(recoveryCodeRecv))) {
      recoveryCodeData = element
    }
  });

  if(!recoveryCodeData){
    res.status(401).json({errorMsg:"Codigo Incorrecto"});
    return;
  }
  const recoveryDate = new Date(recoveryCodeData.date )
  if (recoveryDate < new Date()) {
    res.status(401).json({errorMsg:"El código de verificación ya expiró"});
    return;
  }
  const saltRounds = 10;
  const bcryptPassword = await bcrypt.hash(password, saltRounds);

  users.forEach((element) => {
    if (Object.values(element).includes(recoveryCodeData.userID)) {
      element.password =  bcryptPassword;
    }
  });

  recoveryCode.forEach((element) => {
    if (Object.values(element).includes(parseInt(recoveryCodeRecv))) {
      recoveryCode.splice(element,1)
    }
  });

  res.status(200).send();
};
