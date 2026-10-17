import { PutObjectCommand } from "@aws-sdk/client-s3";
import {s3} from "../config/s3.js"

export const uploadToS3 = async (filename , buffer, contentType)=>{
    console.log("entered upload")
    await s3.send(
        new PutObjectCommand({
            Bucket:"dexter-ai-agent-785662398585-us-east-1-an",
            Body:buffer,
            Key:filename,
            ContentType:contentType
        })
    )
    console.log("exited upload")
    return filename
}