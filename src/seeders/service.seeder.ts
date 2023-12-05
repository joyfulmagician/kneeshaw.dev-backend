import { readFileSync } from "fs";
import path from "path";

import { Service } from "../models/service.model";

export default async function seedServices() {
  await Service.deleteMany({});

  const services = [
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "01.png")),
        contentType: "image/png"
      },
      title: "Mobile Game Development",
      description: "Specialized in creating captivating and immersive games"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "02.png")),
        contentType: "image/png"
      },
      title: "Unity 2D Game",
      description:
        "Tailoring mechanics, graphics, and animations to suit your vision"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "03.png")),
        contentType: "image/png"
      },
      title: "Unity 3D Game",
      description:
        "Creating realistic environments, lifelike characters, and dynamic gameplay"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "04.png")),
        contentType: "image/png"
      },
      title: "Unreal Game Development",
      description: "Transforming your ideas into a polished and thrilling game"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "05.png")),
        contentType: "image/png"
      },
      title: "Godot Game Development",
      description:
        "Developing high-quality games that run smoothly across various platforms"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "06.png")),
        contentType: "image/png"
      },
      title: "HTML5 Game Development",
      description:
        "Interactive games that are compatible with desktops, laptops, and mobile devices"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "07.png")),
        contentType: "image/png"
      },
      title: "Web3 Game Development",
      description: "Creating innovative and immersive gaming experiences"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "08.png")),
        contentType: "image/png"
      },
      title: "Dapps Development",
      description:
        "We leverage our expertise to build secure and user-friendly dApps"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "09.png")),
        contentType: "image/png"
      },
      title: "Blockchain Integration",
      description: "Specialized in creating captivating and immersive games"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "10.png")),
        contentType: "image/png"
      },
      title: "Bug Fixing",
      description:
        "Tailoring mechanics, graphics, and animations to suit your vision"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "11.png")),
        contentType: "image/png"
      },
      title: "System Design",
      description:
        "Creating realistic environments, lifelike characters, and dynamic gameplay"
    },
    {
      image: {
        data: readFileSync(path.join("uploads", "services", "seed", "12.png")),
        contentType: "image/png"
      },
      title: "API Creation",
      description:
        "Creating realistic environments, lifelike characters, and dynamic gameplay"
    }
  ];

  await Service.insertMany(services);
}
