import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TTestimonial,
  TProject,
} from "../types";

import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
} from "../assets";

import eida from "../assets/EIDA.jpg"
import eyenav from "../assets/eyenav.jpg"
import market from "../assets/Market_Basket_Analysis_1_97fbd171b1.webp"

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];



const technologies: TTechnology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];



const testimonials: TTestimonial[] = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects: TProject[] = [
  {
    name: "EIDA: Gamified Educational Application",
    description:
      "EIDA is an interactive learning platform designed for children aged 5 to 14. It features age-specific interfaces (5–8 and 9–15), gamified learning modules, AI-powered tutoring, digital libraries, and progress assessments. Developed using React.js, TypeScript, and MongoDB for a seamless and secure learning experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "typescript",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
      {
        name: "bootstrap",
        color: "purple-text-gradient",
      },
    ],
    image: eida, // Replace with your image import
    sourceCodeLink: "https://github.com/", // Optional: link to repo or demo
  },
  {
    name: "EyeNavCursor",
    description:
      "EyeNavCursor is a Python-based accessibility project that allows users to control their computer cursor using eye movements. Built using OpenCV, it demonstrates how computer vision can create intuitive and hands-free computing experiences for enhanced accessibility.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "opencv",
        color: "green-text-gradient",
      },
      {
        name: "ai",
        color: "pink-text-gradient",
      },
    ],
    image: eyenav, // Replace with your image import
    sourceCodeLink: "https://github.com/", // Optional: link to repo
  },
  {
    name: "Market Basket Insights",
    description:
      "A data analysis project leveraging the Apriori algorithm to uncover product associations and consumer buying patterns. It provides actionable insights for strategic decision-making and business optimization using Python, Matplotlib, and data visualization techniques.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "data-analysis",
        color: "green-text-gradient",
      },
      {
        name: "matplotlib",
        color: "pink-text-gradient",
      },
      {
        name: "apriori",
        color: "orange-text-gradient",
      },
    ],
    image: market, 
    sourceCodeLink: "https://github.com/",
  },
];


export { technologies, testimonials, projects };
