"use server";

import { v2 as cloudinary } from 'cloudinary'

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { resolve } from 'path';
import { rejects } from 'assert';
import { revalidatePath } from 'next/cache';
import { createArtSchema } from '@/lib/artwork.schema';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function createArtwork(formData: FormData){
    const { userId } = await auth()
    if (!userId) {
        throw new Error("Not authenticated")
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("imageUrl") as File;

    const validationResult = createArtSchema.safeParse({
        title,
        description,
        imageUrl: imageFile,
        creatorId: userId,
    });

    if (!validationResult.success) {
        return {
        error: "Validation failed",
        details: validationResult.error.flatten(),
        };
    }

    if (!imageFile || imageFile.size === 0) {
        return { error: "Please select an image file" };
    }

    try {
        const arrayBuffer = await imageFile.arrayBuffer()
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
        
        const artwork = await prisma.artwork.create({
            data: {
                title: validationResult.data.title,
                description: validationResult.data.description,
                imageUrl: result.secure_url,
                tags: validationResult.data.tags,
                creatorId: userId,
            },
        });

        return { 
            success: true, 
            artworkId: artwork.id,
            message: "Artwork uploaded successfully!" 
        };
    } catch (error) {
        console.error("Error creating artwork:", error);
        return { 
            error: "Failed to upload artwork. Please try again." 
        };

    }
}
