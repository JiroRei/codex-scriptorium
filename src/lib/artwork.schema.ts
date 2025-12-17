import {z} from "zod"

export const createArtSchema = z.object({
    title: z.string().max(30),
    description: z.string().max(150),
    tags: z.array(z.string().regex(/^#[^\s#]+$/, "Invalid tag format")).optional(),
    imageUrl: z.custom<FileList>(),
    creatorId: z.string()
})

export type ArtZodGoodies = z.infer<typeof createArtSchema>;