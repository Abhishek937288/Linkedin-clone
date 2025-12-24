import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(5).optional(),
  image: z.union([z.string(), z.array(z.string())]),
  title: z.string().min(5),
  video: z.string().optional(),
});
