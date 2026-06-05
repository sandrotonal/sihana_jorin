KANKA ANA SAYF DISINDA  DIGER TUM SAYFALARIN YAPISINI GUNCELLEMENI ISTERIM 
CUNKU COGU SEY  ANA SAFANIN UIUXE UYUMLU SEGIL GUNCELLEMENI ISTERIM ISTASTIRIK GEREKSIZ KART TASARIMI BADGELER EMOJILER ASLA ISTEMIYORUM ADE MODERN ESTSTIK ORANTILI DENGELI SEYLER OLMALI 


AYRICA HER SEY ANA SAYFANIN YAPISININ SCRIPTLERINE TASARIM YAPISIAN UYUMLU SEKILDE OLAMLI BELIRLI TUM SCRIPTLERI KONTROL EET GUNCELLE ER SEY BAGLANTILI SENKROZE OOLMALI KANKA

TASARIM ICIN 21ST.DEV KULLAN COMPANETŞLERI ORADAN AL KANKA

You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
flipping-card.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  height?: number;
  width?: number;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 300,
  width = 350,
}: FlippingCardProps) {
  return (
    <div
      className="group/flipping-card [perspective:1000px]"
      style={
        {
          "--height": `${height}px`,
          "--width": `${width}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "relative rounded-xl border border-neutral-200 bg-white shadow-lg transition-all duration-700 [transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)] dark:border-neutral-800 dark:bg-neutral-950",
          "h-[var(--height)] w-[var(--width)]",
          className
        )}
      >
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-white text-neutral-950 [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)] dark:bg-zinc-950 dark:text-neutral-50">
          <div className="[transform:translateZ(70px)_scale(.93)] h-full w-full">
            {frontContent}
          </div>
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-white text-neutral-950 [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)] dark:bg-zinc-950 dark:text-neutral-50">
          <div className="[transform:translateZ(70px)_scale(.93)] h-full w-full">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}


demo.tsx
import { FlippingCard } from "@/components/ui/flipping-card";

interface CardData {
  id: string;
  front: {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
  };
  back: {
    description: string;
    buttonText: string;
  };
}

const cardsData: CardData[] = [

  {
    id: "design-excellence",
    front: {
      imageSrc: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
      imageAlt: "Design Excellence",
      title: "Design Excellence",
      description: "Beautiful, intuitive designs that create meaningful connections with users.",
    },
    back: {
      description: "We craft exceptional user experiences through thoughtful design, user research, and modern design systems that ensure consistency and accessibility.",
      buttonText: "View Portfolio",
    },
  },
  {
    id: "data-analytics",
    front: {
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      imageAlt: "Data Analytics",
      title: "Data Analytics",
      description: "Transform raw data into actionable insights that drive informed decision-making.",
    },
    back: {
      description: "Our data analytics platform provides real-time insights, predictive modeling, and interactive dashboards to help businesses make data-driven decisions.",
      buttonText: "Learn More",
    },
  },
];

export default function FlippingCardDemo() {
  return (
    <div className="flex gap-4 flex-wrap justify-center p-8">
      {cardsData.map((card) => (
        <FlippingCard
          key={card.id}
          width={300}
          frontContent={<GenericCardFront data={card.front} />}
          backContent={<GenericCardBack data={card.back} />}
        />
      ))}
    </div>
  );
}

interface GenericCardFrontProps {
  data: CardData["front"];
}

function GenericCardFront({ data }: GenericCardFrontProps) {
  return (
    <div className="flex flex-col h-full w-full p-4">
      <img
        src={data.imageSrc}
        alt={data.imageAlt}
        className="w-full h-auto object-cover flex-grow min-h-0 rounded-md"
      />
      <div className="p-2">
        <h3 className="text-base font-semibold mt-2">{data.title}</h3>
        <p className="text-[13.5px] mt-2 text-muted-foreground">
          {data.description}
        </p>
      </div>
    </div>
  );
}

interface GenericCardBackProps {
  data: CardData["back"];
}

function GenericCardBack({ data }: GenericCardBackProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      <p className="text-[13.5px] mt-2 text-muted-foreground text-center">
        {data.description}
      </p>
      <button className="mt-6 bg-foreground text-background px-4 py-2 rounded-md text-[13.5px] w-min whitespace-nowrap h-8 flex items-center justify-center">
        {data.buttonText}
      </button>
    </div>
  );
} 
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them





GALER IICN 

You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
executive-impact-carousel.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  title: string;
  price: string;
  oldPrice?: string;
  prodImg: string;
  modelImg: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Celestria Cape Sleeve Midi Dress in Black",
    price: "$35.00",
    oldPrice: "$80.00",
    prodImg: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
  },
  {
    id: "2",
    title: "Lumina Silk Blouse in Ivory",
    price: "$45.00",
    prodImg: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
  },
  {
    id: "3",
    title: "Seraphina Leather Tote",
    price: "$120.00",
    prodImg: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
  },
  {
    id: "4",
    title: "Celestria Cape Sleeve Midi Dress",
    price: "$35.00",
    prodImg: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
  },
  {
    id: "5",
    title: "Lumina Silk Blouse",
    price: "$45.00",
    prodImg: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
  },
  {
    id: "6",
    title: "Seraphina Leather Tote",
    price: "$120.00",
    prodImg: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
  },
  {
    id: "7",
    title: "Celestria Cape Sleeve Midi Dress",
    price: "$35.00",
    prodImg: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
  },
  {
    id: "8",
    title: "Lumina Silk Blouse",
    price: "$45.00",
    prodImg: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
  },
  {
    id: "9",
    title: "Seraphina Leather Tote",
    price: "$120.00",
    prodImg: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
  },
  {
    id: "10",
    title: "Celestria Cape Sleeve Midi Dress",
    price: "$35.00",
    prodImg: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
  },
  {
    id: "11",
    title: "Lumina Silk Blouse",
    price: "$45.00",
    prodImg: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
  },
  {
    id: "12",
    title: "Seraphina Leather Tote",
    price: "$120.00",
    prodImg: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
  },
  {
    id: "13",
    title: "Celestria Cape Sleeve Midi Dress",
    price: "$35.00",
    prodImg: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
  },
  {
    id: "14",
    title: "Lumina Silk Blouse",
    price: "$45.00",
    prodImg: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
  },
  {
    id: "15",
    title: "Seraphina Leather Tote",
    price: "$120.00",
    prodImg: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    modelImg: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
  }
];

// Split products into 3 chunks for the 3 columns
const COL_1_PRODUCTS = PRODUCTS.slice(0, 5);
const COL_2_PRODUCTS = PRODUCTS.slice(5, 10);
const COL_3_PRODUCTS = PRODUCTS.slice(10, 15);

// CSS Styles matching original exactly
const styles = `
  .products-carousel {
    background-color: #FFFFFF;
    color: #1f1f1f;
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    overflow-x: hidden;
  }
  
  .dark .products-carousel {
    background-color: #0a0a0a;
    color: #f4f1ea;
  }

  .col-scroll {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    min-height: 100vh;
    width: 90vw;
    box-sizing: border-box;
    padding: 0;
  }

  @media (max-width: 768px) {
    .col-scroll {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0;
      gap: 5vh;
      align-items: center;
    }
  }

  .col-scroll__box {
    display: flex;
    flex-direction: column;
    padding: 10vh 0 15vh;
  }

  .col-scroll__box--odd {
    flex-direction: column-reverse;
    height: 100vh;
  }

  @media (max-width: 768px) {
    .col-scroll__box--odd {
      flex-direction: column;
      height: auto;
      padding: 0;
    }
    .col-scroll__box {
      width: 100%;
      align-items: center;
      padding: 2rem 0;
    }
  }

  .col-scroll__list {
    display: flex;
    flex-direction: column;
    will-change: transform;
    gap: 10vw;
  }

  .col-scroll__box--odd .col-scroll__list {
    flex-direction: column-reverse;
  }

  @media (max-width: 768px) {
    .col-scroll__box--odd .col-scroll__list {
      flex-direction: column;
    }
    .col-scroll__list {
      gap: 5vh;
    }
  }

  .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 20vw;
    background: transparent;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  @media (max-width: 768px) {
    .product-card {
      width: 90vw;
      margin: 0 0 10vh 0;
    }
    .product-card:last-child {
      margin-bottom: 0;
    }
  }

  .col-scroll__img-wrapper {
    position: relative;
    aspect-ratio: 0.8;
    width: 100%;
    margin-bottom: 0;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
    background: #fff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dark .col-scroll__img-wrapper {
    border-color: rgba(255, 255, 255, 0.1);
    background: #171717;
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.03);
  }

  .col-scroll__img-wrapper img {
    position: absolute;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
  }

  .product-img {
    z-index: 1;
    opacity: 1;
  }

  .model-img {
    z-index: 2;
    opacity: 0;
  }

  .product-card:hover .product-img,
  .product-card:active .product-img {
    opacity: 0;
  }

  .product-card:hover .model-img,
  .product-card:active .model-img {
    opacity: 1;
  }

  .product-card__info {
    position: absolute;
    bottom: 2rem;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 3;
    padding: 0 1.5rem;
    box-sizing: border-box;
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  
  .product-card:hover .product-card__info,
  .product-card:active .product-card__info {
    opacity: 0;
    transform: translateY(10px);
  }

  .product-card__title {
    margin: 0 0 0.5rem;
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.3;
    color: #1f1f1f;
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
  }
  
  .dark .product-card__title {
    color: #f4f1ea;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  }

  .product-card__price-wrapper {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    color: #1f1f1f;
  }
  
  .dark .product-card__price-wrapper {
    color: #f4f1ea;
  }

  .product-card__price--old {
    text-decoration: line-through;
    opacity: 0.5;
    margin-right: 0.5rem;
  }

  .product-card__btn {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    z-index: 4;
    opacity: 0;
    background: rgba(244, 241, 234, 0.95);
    border: 1px solid #1f1f1f;
    padding: 1rem 2rem;
    font-family: 'Playfair Display', serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.4s ease;
    white-space: nowrap;
    color: #1f1f1f;
  }
  
  .dark .product-card__btn {
    background: rgba(23, 23, 23, 0.95);
    border-color: #f4f1ea;
    color: #f4f1ea;
  }

  .product-card:hover .product-card__btn,
  .product-card:active .product-card__btn {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  .product-card__btn:hover {
    background: #1f1f1f;
    color: #fff;
  }
  
  .dark .product-card__btn:hover {
    background: #f4f1ea;
    color: #1f1f1f;
  }

  @media (max-width: 768px) {
    .product-card__title {
      font-size: 1.1rem;
    }
    .product-card__price-wrapper {
      font-size: 1rem;
    }
    .product-card__btn {
      padding: 0.75rem 1.5rem;
      font-size: 0.7rem;
    }
  }
`;

export default function ProductsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Only apply scroll animation on desktop
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 769px)", () => {
      const ctx = gsap.context(() => {
        const reverseTrigger = gsap.utils.toArray<HTMLElement>(".col-scroll__box--odd .col-scroll__list");

        reverseTrigger.forEach((element) => {
          const elementHeight = element.offsetHeight;
          const viewportHeight = window.innerHeight;
          const extraSpace = viewportHeight * 0.2;
          const scrollDistance = elementHeight + viewportHeight + extraSpace;

          gsap.to(element, {
            yPercent: 100,
            scrollTrigger: {
              trigger: element,
              start: 0,
              end: `+=${scrollDistance}`,
              scrub: true,
              pin: true,
            }
          });
        });
      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <main className="products-carousel">
        <div ref={containerRef} className="col-scroll">
          {/* Column 1 (Odd - reverse scroll) */}
          <div className="col-scroll__box col-scroll__box--odd">
            <div className="col-scroll__list">
              {COL_1_PRODUCTS.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>

          {/* Column 2 (Even - normal scroll) */}
          <div className="col-scroll__box">
            <div className="col-scroll__list">
              {COL_2_PRODUCTS.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>

          {/* Column 3 (Odd - reverse scroll) */}
          <div className="col-scroll__box col-scroll__box--odd">
            <div className="col-scroll__list">
              {COL_3_PRODUCTS.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <figure className="product-card">
      <div className="col-scroll__img-wrapper">
        <img className="product-img" src={product.prodImg} alt={product.title} />
        <img className="model-img" src={product.modelImg} alt={`Model wearing ${product.title}`} />
        
        <div className="product-card__info">
          <h3 className="product-card__title">{product.title}</h3>
          <div className="product-card__price-wrapper">
            {product.oldPrice && (
              <span className="product-card__price--old">{product.oldPrice}</span>
            )}
            <span className="product-card__price">{product.price}</span>
          </div>
        </div>

        <button className="product-card__btn">View Details +</button>
      </div>
    </figure>
  );
}


demo.tsx
import ProductsCarousel from "@/components/ui/executive-impact-carousel";

export default ProductsCarousel;

```

Install NPM dependencies:
```bash
gsap
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them




VE BUNU KULLAN 



You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
gallery-hover-carousel.tsx
"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

interface GalleryHoverCarouselItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

export default function GalleryHoverCarousel({
  heading = "Featured Projects",
  demoUrl = "#",
  items = [
    {
      id: "item-1",
      title: "Build Modern UIs",
      summary:
        "Create stunning user interfaces with our comprehensive design system.",
      url: "#",
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-02.png",
    },
    {
      id: "item-2",
      title: "Computer Vision Technology",
      summary:
        "Powerful image recognition and processing capabilities that allow AI systems to analyze, understand, and interpret visual information from the world.",
      url: "#",
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png",
    },
    {
      id: "item-3",
      title: "Machine Learning Automation",
      summary:
        "Self-improving algorithms that learn from data patterns to automate complex tasks and make intelligent decisions with minimal human intervention.",
      url: "#",
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/featured-01.png",
    },
    {
      id: "item-4",
      title: "Predictive Analytics",
      summary:
        "Advanced forecasting capabilities that analyze historical data to predict future trends and outcomes, helping businesses make data-driven decisions.",
      url: "#",
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/featured-06.png",
    },
    {
      id: "item-5",
      title: "Neural Network Architecture",
      summary:
        "Sophisticated AI models inspired by human brain structure, capable of solving complex problems through deep learning and pattern recognition.",
      url: "#",
      image:
        "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/Screenshot%202025-08-05%20at%2021-15-55%20Ruixen%20-%20Beautifully%20crafted%20UI%20components%20to%20elevate%20your%20web%20projects.png",
    }
  ],
}: {
  heading?: string;
  demoUrl?: string;
  items?: GalleryHoverCarouselItem[];
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Carousel scroll tracking
  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    update();
    carouselApi.on("select", update);
    return () => {
      carouselApi.off("select", update);
    };
  }, [carouselApi]);

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
          <div className="max-w-2xl">
            <h3 className="text-lg sm:text-xl lg:text-3xl font-medium text-gray-900 dark:text-white leading-relaxed">
            {heading}{" "}
            <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-3xl"> Explore our collection of innovative solutions and cutting-edge technologies designed to transform your business.</span>
          </h3>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="w-full max-w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{ breakpoints: { "(max-width: 768px)": { dragFree: true } } }}
            className="relative w-full max-w-full"
          >
            <CarouselContent className="hide-scrollbar w-full max-w-full md:ml-4 md:-mr-4">
              {items.map((item) => (
                <CarouselItem key={item.id} className="ml-6 md:max-w-[350px]">
                  <Link href={item.url} className="group block relative w-full h-[300px] md:h-[350px]">
                    <Card className="overflow-hidden rounded-xl h-full w-full rounded-3xl">
                      {/* Image */}
                      <div className="relative h-full w-full transition-all duration-500 group-hover:h-1/2">
                        <Image
                          width={400}
                          height={300}
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                        {/* Fade overlay at bottom */}
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Text Section */}
                      <div className="absolute bottom-0 left-0 w-full px-4 transition-all duration-500 group-hover:h-1/2 group-hover:flex flex-col justify-center bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100">
                        <h3 className="text-lg font-medium md:text-xl">{item.title}</h3>
                        <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                          {item.summary}
                        </p>
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute bottom-2 right-2 border border-gray-200 dark:border-gray-800 hover:-rotate-45 transition-all duration-500 rounded-full mt-2 px-0 flex items-center gap-1 text-primary hover:text-primary/80"
                        >
                          <ArrowRight className="size-4" />
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}


demo.tsx
import GalleryHoverCarousel from "@/components/ui/gallery-hover-carousel";

export default function DemoOne() {
  return <GalleryHoverCarousel />;
}

```

Copy-paste these files for dependencies:
```tsx
shadcn/button
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

```
```tsx
shadcn/card
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```
```tsx
ibelick/carousel
'use client';
import {
  Children,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion, Transition, useMotionValue } from 'motion/react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type CarouselContextType = {
  index: number;
  setIndex: (newIndex: number) => void;
  itemsCount: number;
  setItemsCount: (newItemsCount: number) => void;
  disableDrag: boolean;
};

const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within an CarouselProvider');
  }
  return context;
}

export type CarouselProviderProps = {
  children: ReactNode;
  initialIndex?: number;
  onIndexChange?: (newIndex: number) => void;
  disableDrag?: boolean;
};

function CarouselProvider({
  children,
  initialIndex = 0,
  onIndexChange,
  disableDrag = false,
}: CarouselProviderProps) {
  const [index, setIndex] = useState<number>(initialIndex);
  const [itemsCount, setItemsCount] = useState<number>(0);

  const handleSetIndex = (newIndex: number) => {
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  return (
    <CarouselContext.Provider
      value={{
        index,
        setIndex: handleSetIndex,
        itemsCount,
        setItemsCount,
        disableDrag,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

export type CarouselProps = {
  children: ReactNode;
  className?: string;
  initialIndex?: number;
  index?: number;
  onIndexChange?: (newIndex: number) => void;
  disableDrag?: boolean;
};

function Carousel({
  children,
  className,
  initialIndex = 0,
  index: externalIndex,
  onIndexChange,
  disableDrag = false,
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState<number>(initialIndex);
  const isControlled = externalIndex !== undefined;
  const currentIndex = isControlled ? externalIndex : internalIndex;

  const handleIndexChange = (newIndex: number) => {
    if (!isControlled) {
      setInternalIndex(newIndex);
    }
    onIndexChange?.(newIndex);
  };

  return (
    <CarouselProvider
      initialIndex={currentIndex}
      onIndexChange={handleIndexChange}
      disableDrag={disableDrag}
    >
      <div className={cn('group/hover relative', className)}>
        <div className='overflow-hidden'>{children}</div>
      </div>
    </CarouselProvider>
  );
}

export type CarouselNavigationProps = {
  className?: string;
  classNameButton?: string;
  alwaysShow?: boolean;
};

function CarouselNavigation({
  className,
  classNameButton,
  alwaysShow,
}: CarouselNavigationProps) {
  const { index, setIndex, itemsCount } = useCarousel();

  return (
    <div
      className={cn(
        'pointer-events-none absolute left-[-12.5%] top-1/2 flex w-[125%] -translate-y-1/2 justify-between px-2',
        className
      )}
    >
      <button
        type='button'
        aria-label='Previous slide'
        className={cn(
          'pointer-events-auto h-fit w-fit rounded-full bg-zinc-50 p-2 transition-opacity duration-300 dark:bg-zinc-950',
          alwaysShow
            ? 'opacity-100'
            : 'opacity-0 group-hover/hover:opacity-100',
          alwaysShow
            ? 'disabled:opacity-40'
            : 'group-hover/hover:disabled:opacity-40',
          classNameButton
        )}
        disabled={index === 0}
        onClick={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}
      >
        <ChevronLeft
          className='stroke-zinc-600 dark:stroke-zinc-50'
          size={16}
        />
      </button>
      <button
        type='button'
        className={cn(
          'pointer-events-auto h-fit w-fit rounded-full bg-zinc-50 p-2 transition-opacity duration-300 dark:bg-zinc-950',
          alwaysShow
            ? 'opacity-100'
            : 'opacity-0 group-hover/hover:opacity-100',
          alwaysShow
            ? 'disabled:opacity-40'
            : 'group-hover/hover:disabled:opacity-40',
          classNameButton
        )}
        aria-label='Next slide'
        disabled={index + 1 === itemsCount}
        onClick={() => {
          if (index < itemsCount - 1) {
            setIndex(index + 1);
          }
        }}
      >
        <ChevronRight
          className='stroke-zinc-600 dark:stroke-zinc-50'
          size={16}
        />
      </button>
    </div>
  );
}

export type CarouselIndicatorProps = {
  className?: string;
  classNameButton?: string;
};

function CarouselIndicator({
  className,
  classNameButton,
}: CarouselIndicatorProps) {
  const { index, itemsCount, setIndex } = useCarousel();

  return (
    <div
      className={cn(
        'absolute bottom-0 z-10 flex w-full items-center justify-center',
        className
      )}
    >
      <div className='flex space-x-2'>
        {Array.from({ length: itemsCount }, (_, i) => (
          <button
            key={i}
            type='button'
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              'h-2 w-2 rounded-full transition-opacity duration-300',
              index === i
                ? 'bg-zinc-950 dark:bg-zinc-50'
                : 'bg-zinc-900/50 dark:bg-zinc-100/50',
              classNameButton
            )}
          />
        ))}
      </div>
    </div>
  );
}

export type CarouselContentProps = {
  children: ReactNode;
  className?: string;
  transition?: Transition;
};

function CarouselContent({
  children,
  className,
  transition,
}: CarouselContentProps) {
  const { index, setIndex, setItemsCount, disableDrag } = useCarousel();
  const [visibleItemsCount, setVisibleItemsCount] = useState(1);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsLength = Children.count(children);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const options = {
      root: containerRef.current,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleCount = entries.filter(
        (entry) => entry.isIntersecting
      ).length;
      setVisibleItemsCount(visibleCount);
    }, options);

    const childNodes = containerRef.current.children;
    Array.from(childNodes).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [children, setItemsCount]);

  useEffect(() => {
    if (!itemsLength) {
      return;
    }

    setItemsCount(itemsLength);
  }, [itemsLength, setItemsCount]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -10 && index < itemsLength - 1) {
      setIndex(index + 1);
    } else if (x >= 10 && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <motion.div
      drag={disableDrag ? false : 'x'}
      dragConstraints={
        disableDrag
          ? undefined
          : {
              left: 0,
              right: 0,
            }
      }
      dragMomentum={disableDrag ? undefined : false}
      style={{
        x: disableDrag ? undefined : dragX,
      }}
      animate={{
        translateX: `-${index * (100 / visibleItemsCount)}%`,
      }}
      onDragEnd={disableDrag ? undefined : onDragEnd}
      transition={
        transition || {
          damping: 18,
          stiffness: 90,
          type: 'spring',
          duration: 0.2,
        }
      }
      className={cn(
        'flex items-center',
        !disableDrag && 'cursor-grab active:cursor-grabbing',
        className
      )}
      ref={containerRef}
    >
      {children}
    </motion.div>
  );
}

export type CarouselItemProps = {
  children: ReactNode;
  className?: string;
};

function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <motion.div
      className={cn(
        'w-full min-w-0 shrink-0 grow-0 overflow-hidden',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
  useCarousel,
};

```

Install NPM dependencies:
```bash
next, lucide-react, @radix-ui/react-slot, class-variance-authority, motion
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them













