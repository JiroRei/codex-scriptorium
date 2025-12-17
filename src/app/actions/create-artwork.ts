"use server";

import { v2 as cloudinary } from 'cloudinary'

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { resolve } from 'path';
import { rejects } from 'assert';
import { revalidatePath } from 'next/cache';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function createArtwork(body: any){
    const { userId } = await auth()

    if (!userId) {
    throw new Error("Not authenticated")
    }
    
    const file = body.imageUrl[0] as File;

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, function(error, result){
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        }).end(buffer)
    })

    const payload:any = {
        title: body.title,
        creatorId: body.creatorId,
        description: body.description,
        imageUrl: result.secure_url,
    }    
    await prisma.user.create({ 
        data: payload
    })
    
}