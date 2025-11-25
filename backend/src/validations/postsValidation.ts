import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(18).optional(),
  image: z.union([z.string(), z.array(z.string())]),
  title: z.string().max(20),
  video: z.string().optional(),
});
