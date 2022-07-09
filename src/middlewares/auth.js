import { verifyToken } from "../helpers/jsonWToken";

export const checkAuth = async (req, res, next) => {
  
  if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
          try {
              const tokenData = await verifyToken(token);
              if (!tokenData.email) {
                  res.status(401).json({
                      error: true,
                      message: "Las credenciales brindadas no son válidas."
                  });
              }
              else {
                  next();
              }
          } catch (error) {
              res.status(401).json({
                  error: true,
                  message: "Las credenciales brindadas no son válidas o su sesión ha expirado."
              });
          }
      }
      else {
          res.status(401).json({
              error: true,
              message: "El no usuario no está autenticado."
          });
      }
  }
  else {
      res.status(401).json({
          error: true,
          message: "El no usuario no está autenticado."
      });
  }
}

