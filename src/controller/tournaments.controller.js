import { uploadImageToAWS } from "../s3";
import { categories, tourneysPlayed } from "../data/tourneys.data"

export const addTournament = async (req, res) => {
    const { name, date, location, category } = req.body;
    const image = req.files.image;
    if (image) {
      const fileExtension = image.name.split(".").pop();
      const filePath = `torneos/torneo_${name}.${fileExtension}`;
      try {
        await uploadImageToAWS(image, filePath);
      } catch (error) {
        console.log("Error al subir la imagen");
      }
    }
    res.status(200).json({
        message: "Torneo agregado correctamente",
    });
}

export const getCategories = (req, res) =>{
  try{
    res.status(200).json(categories)
  }catch(error){
    res.status(500).send('Error De Servidor')
  }
}

// get all tournaments based on actual page and category
export const getTournaments = (req, res) => {
    const { category, page, maxAmountPage } = req.query;
    let infoCategoryTournaments = [];
    if (category === "Todas") {
        infoCategoryTournaments = tourneysPlayed;
    } else {
      tourneysPlayed.forEach(element => {
          if(Object.values(element).includes(category)){
              infoCategoryTournaments.push(element);
          }
      });
    }
    
    const infoToSend = [];
    infoCategoryTournaments.slice(maxAmountPage*(page-1),maxAmountPage*page).forEach(element => {
      const data = {
        name: element.Name,
        date: element.Date,
        location: element.Location,
        category: element.Category,
        image: element.s3Id,
        playerCount: element.MaxPlayers,
      }
      infoToSend.push(data);
    });
    res.status(200).json(infoToSend);
}

export const getPageCount = (req, res) =>{
  const { category, maxAmountPage } = req.query;
  let infoCategoryTournaments = [];
  if (category === "Todas") {
      infoCategoryTournaments = tourneysPlayed;
  } else {
    tourneysPlayed.forEach(element => {
        if(Object.values(element).includes(category)){
            infoCategoryTournaments.push(element);
        }
    });
  }
  const size = infoCategoryTournaments.length
  const count = Math.ceil(size/maxAmountPage)
  const infoSend = []
  for (let index = 0; index < count; index++) {
      const data = {
          page: index+1
      }
      infoSend.push(data)
  }
  res.status(200).json(infoSend)
} 
