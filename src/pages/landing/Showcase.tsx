import React from 'react';
import './Showcase.css';

type ImageItem = { src: string; alt: string };

const IMAGES: ImageItem[] = [
  { src: '/images/img2.jpeg', alt: 'WhatsApp-Image-2025-01-24-at-1.37.00-PM' },
  { src: '/images/WhatsApp-Image-2025-01-30-at-3.50.32-PM.jpeg', alt: 'WhatsApp-Image-2025-01-30-at-3.50.32-PM' },
  { src: '/images/WhatsApp-Image-2025-01-30-at-3.48.55-PM.jpeg', alt: 'WhatsApp-Image-2025-01-30-at-3.48.55-PM' },
  { src: '/images/WhatsApp-Image-2025-01-24-at-1.34.08-PM.jpeg', alt: 'WhatsApp-Image-2025-01-24-at-1.34.08-PM' },
  { src: '/images/WhatsApp-Image-2025-01-24-at-1.18.59-PM.jpeg', alt: 'WhatsApp-Image-2025-01-24-at-1.18.59-PM' },
  { src: '/images/Confined-Space-Safety-Training-e1738166251162.png', alt: 'Confined Space Safety Training' },
  { src: '/images/TOWER-CLIMBING2.jpeg', alt: 'Tower Climbing 2' },
  { src: '/images/RIGGING-AND-LIFTING-TRAINING.jpeg', alt: 'Rigging and Lifting Training' },
  { src: '/images/TOWER-CLIMBING.jpeg', alt: 'Tower Climbing' },
  { src: '/images/WhatsApp-Image-2025-01-30-at-3.50.32-PM (1).jpeg', alt: 'WhatsApp-Image-2025-01-30-at-3.50.32-PM (1)' },
  { src: '/images/WhatsApp-Image-2025-01-30-at-3.48.55-PM (1).jpeg', alt: 'WhatsApp-Image-2025-01-30-at-3.48.55-PM (1)' },
];

const Showcase: React.FC = () => {
  return (
    <section className="showcase" aria-label="Showcase Gallery">
      <h2 className="showcase__title">Showcase</h2>
      <div className="showcase__grid">
        {IMAGES.map((img) => (
          <figure key={img.src} className="showcase__item">
            <img src={img.src} alt={img.alt} className="showcase__image" loading="lazy" />
            <figcaption className="showcase__caption">{img.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Showcase;


