const { players,tourneysPlayersRelation, losesVictoryRate } = require("../data/players.data");
const { tourneysPlayed } = require("../data/tourneys.data");
const { getImageFromAWS } = require("../s3");

exports.getAllPlayers = (req,res) =>{
    try {  
        res.json(players);
    } catch (error) {
        res.status(500);
        res.send("An error ocurred on the server");
    }
}
exports.findPlayerTourneys = (licenseNumber)=>{
    let participationInfo = [];
    tourneysPlayersRelation.forEach(element => {
        if(Object.values(element).includes(parseInt(licenseNumber))){
            participationInfo.push(element);
        }
    });

    
    participationInfo.forEach(elementParticipation => {
        tourneysPlayed.forEach(elementTourneys=>{
            if(Object.values(elementTourneys).includes(parseInt(elementParticipation.Tourney_id))){
                addKeyValue(elementParticipation,"Name",elementTourneys.Name);
                addKeyValue(elementParticipation,"Date",elementTourneys.Date);
            }
        })
    })
    return participationInfo;
}
const addKeyValue = (obj, key, data) =>{
    obj[key] = data;
}

exports.getPlayerTourneys = (req,res) => {
    const {licenseNumber} = req.params;
    try {
        const exists = verifyAnIdExists(licenseNumber);
        if(exists===true){
            const playerTourneys = findPlayerTourneys(licenseNumber);
            res.json(playerTourneys);
        }else{
            res.status(404).send();
        }
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}
exports.getPlayerImage = (req,res) =>{
    const {s3Id} = req.params;
    try {
        const subString = s3Id.substring(s3Id.indexOf('_') + 1);
        const exists = verifyAnIdExists(subString);
        if(exists === true){
            try {
                const bucketId = `jugadores/${s3Id}.jpg`
                const readStream = getImageFromAWS(bucketId);
                readStream.pipe(res);
            } catch (error) {
                console.log(error)
            }
        }else{
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send();
    }
}
const verifyAnIdExists = (id) => {
    let exists = false;
    players.forEach(element => {
        const hasValue = Object.values(element).includes(parseInt(id));
        if (hasValue===true){
            exists =  true;
        }
    });
    return exists;
}

exports.topPlayersCategory = (req, res) =>{
    const { category, page, maxAmountPage } = req.query;
    let infoCategoryPlayers = [];
    players.forEach(element => {
        if(Object.values(element).includes(category)){
            infoCategoryPlayers.push(element);
        }
    });

    infoCategoryPlayers.forEach(elementParticipation => {
        let points = 0
        tourneysPlayersRelation.forEach(elementTourneys=>{
            if(Object.values(elementTourneys).includes(parseInt(elementParticipation.licenseNumber))){
                points += elementTourneys.PtsEarned;
            }
        })
        addKeyValue(elementParticipation, "points", points);
    })

    infoCategoryPlayers.forEach(elementParticipation => {
        addKeyValue(elementParticipation, "victories", 0);
        addKeyValue(elementParticipation, "loses", 0);
        losesVictoryRate.forEach(elementRate=>{
            if(Object.values(elementRate).includes(parseInt(elementParticipation.licenseNumber))){
                elementParticipation.victories = elementRate.victories,
                elementParticipation.loses = elementRate.loses
            }
        })
    })
    const infoToSend = [];
    infoCategoryPlayers.slice(maxAmountPage*(page-1),maxAmountPage*page).forEach((element, index) => {
        const data = {
            position: element.position,
            name: element.name,
            firstLastname: element.firstLastname,
            s3Id: element.s3Id,
            points: element.points,
            loses: element.loses,
            victories: element.victories,
        }
        infoToSend.push(data);
    });
    res.status(200).json(infoToSend);
} 

exports.amountOfLadderByCategory = (req, res) =>{
    const { category, maxAmount } = req.query;
    let infoCategoryPlayers = [];
    players.forEach(element => {
        if(Object.values(element).includes(category)){
            infoCategoryPlayers.push(element);
        }
    });
    const size = infoCategoryPlayers.length
    const count = Math.ceil(size/maxAmount)
    const infoSend = []
    for (let index = 0; index < count; index++) {
        const data = {
            page: index+1
        }
        infoSend.push(data)
    }
    res.status(200).json(infoSend)
} 
