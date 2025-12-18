import { z } from "zod";

export const userSchema = z.object({
  backgroundImg:z.string().optional(),
  bio: z.string().min(10).optional(),
  company: z.string().min(2).optional(),
  designation: z.string().min(2).optional(),
  experience: z.number().optional(),
  headline :z.string().min(5).optional(),
  image : z.string().optional(),  
  location :z.string().min(2).optional(),
  name: z.string().min(2),
  skills: z.union([z.string(), z.array(z.string())]).optional(),
});
