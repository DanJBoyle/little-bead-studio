import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const products = defineCollection({
  loader: file("src/data/products.json"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      price: z.number(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
      image: image(),
    }),
});

export const collections = {
  products,
};
