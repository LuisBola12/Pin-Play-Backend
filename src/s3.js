import S3 from 'aws-sdk/clients/s3';
import config from './config';


const region = config.region;
const accessKeyId = config.accessKeyId;
const secretAccessKey = config.secretAccessKey;
const bucketName = config.bucketName;
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

//upload a file to s3
export const uploadImageToAWS = (file, AWSFilePath) =>{
    const uploadParams = {
        Bucket: bucketName,
        Body: file.data,
        Key: AWSFilePath,
    }
    return s3.upload(uploadParams).promise();
};

//download an image from s3
export const getImageFromAWS = (fileKey) => {
    try {
        const downloadParams = {
            Key:fileKey,
            Bucket:bucketName
        }
        return s3.getObject(downloadParams).createReadStream();
    } catch (error) {
        console.log("Error al intentar conseguir imagen");
    }
};
