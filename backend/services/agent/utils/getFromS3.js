import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {s3} from "../config/s3.js"

export const getFromS3 = async (filename, expiresIn = 600) => {
    return await getSignedUrl(s3, new GetObjectCommand({
        Bucket: "dexter-ai-agent-785662398585-us-east-1-an",
        Key: filename
    }), {expiresIn})
}