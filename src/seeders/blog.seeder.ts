import { readFileSync } from "fs";
import path from "path";

import { Blog } from "../models/blog.model";

export default async function seedBlogs() {
  await Blog.deleteMany({});

  const blogs = [
    {
      image: {
        data: readFileSync(path.join("uploads", "blog", "seed", "01.png")),
        contentType: "image/png"
      },
      title: "Content Update 0.4.2",
      description:
        "Forgotten shore and the Dauntless Few Please Wishlist Titan Saga on Stream: Titan Saga: Chains of KornosOr Purchase and play on Vox(ACT1)"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "blog", "seed", "02.png")),
        contentType: "image/png"
      },
      title: "Content Update 0.4.3",
      description:
        "Forgotten shore and the Dauntless Few Please Wishlist Titan Saga on Stream: Titan Saga: Chains of KornosOr Purchase and play on Vox(ACT1)"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "blog", "seed", "03.png")),
        contentType: "image/png"
      },
      title: "Content Update 0.4.4",
      description:
        "Forgotten shore and the Dauntless Few Please Wishlist Titan Saga on Stream: Titan Saga: Chains of KornosOr Purchase and play on Vox(ACT1)"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "blog", "seed", "04.png")),
        contentType: "image/png"
      },
      title: "Content Update 0.4.5",
      description:
        "Forgotten shore and the Dauntless Few Please Wishlist Titan Saga on Stream: Titan Saga: Chains of KornosOr Purchase and play on Vox(ACT1)"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "blog", "seed", "05.png")),
        contentType: "image/png"
      },
      title: "Content Update 0.4.6",
      description:
        "Forgotten shore and the Dauntless Few Please Wishlist Titan Saga on Stream: Titan Saga: Chains of KornosOr Purchase and play on Vox(ACT1)"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "blog", "seed", "06.png")),
        contentType: "image/png"
      },
      title: "Content Update 0.4.7",
      description:
        "Forgotten shore and the Dauntless Few Please Wishlist Titan Saga on Stream: Titan Saga: Chains of KornosOr Purchase and play on Vox(ACT1)"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "blog", "seed", "07.png")),
        contentType: "image/png"
      },
      title: "Content Update 0.4.8",
      description:
        "Forgotten shore and the Dauntless Few Please Wishlist Titan Saga on Stream: Titan Saga: Chains of KornosOr Purchase and play on Vox(ACT1)"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "blog", "seed", "08.png")),
        contentType: "image/png"
      },
      title: "Content Update 0.4.9",
      description:
        "Forgotten shore and the Dauntless Few Please Wishlist Titan Saga on Stream: Titan Saga: Chains of KornosOr Purchase and play on Vox(ACT1)"
    }
  ];

  await Blog.insertMany(blogs);
}
