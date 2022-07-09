import jwt from 'jsonwebtoken'

export const tokenSign = async(user) => {
  return jwt.sign(
  {
    email:user,
  },
  process.env.JW_Token,
  {
    expiresIn: "20h",
  }
  )
}

export const verifyToken = async (token) => {
  try{
    return jwt.verify(token, process.env.JW_Token);
  }catch(error){
    console.log(error);
    return null;
  }
}