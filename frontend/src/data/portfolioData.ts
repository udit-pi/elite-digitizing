export interface PortfolioItem {
  id: number;
  category: 'Logos' | 'Caps' | 'Jackets' | 'Patches' | 'Vector Artwork';
  title: string;
  image: string;
}

export const portfolioItems: PortfolioItem[] = [
  { id: 1, category: 'Patches', title: 'Couple Portrait Embroidery', image: '/portfolio/portfolio-1.jpg' },
  { id: 2, category: 'Jackets', title: 'Anime Hoodie Embroidery – Zoro (Gray)', image: '/portfolio/portfolio-2.jpg' },
  { id: 3, category: 'Jackets', title: 'Anime Hoodie Embroidery – Zoro (Blue)', image: '/portfolio/portfolio-3.jpg' },
  { id: 4, category: 'Patches', title: 'Food Patch Set – Cupcake, Lollipop & Popcorn', image: '/portfolio/portfolio-4.jpg' },
  { id: 5, category: 'Patches', title: 'Alphabet Letter Patch Set', image: '/portfolio/portfolio-5.jpg' },
  { id: 6, category: 'Patches', title: 'ISRO Chandrayaan-2 Mission Patch', image: '/portfolio/portfolio-6.jpg' },
  { id: 7, category: 'Patches', title: 'Fendi Horse Patch – Luxury Embroidery', image: '/portfolio/portfolio-7.jpeg' },
  { id: 8, category: 'Patches', title: 'Maratha Tigers Emblem Patch', image: '/portfolio/portfolio-8.jpeg' },
  { id: 9, category: 'Patches', title: 'Anime Character Patch – Demon Slayer', image: '/portfolio/portfolio-9.jpeg' },
  { id: 10, category: 'Patches', title: 'Carpe Script Embroidery Patch', image: '/portfolio/portfolio-10.jpeg' },
  { id: 11, category: 'Patches', title: 'Listen to the Professor – Round Character Patch', image: '/portfolio/portfolio-11.jpeg' },
  { id: 12, category: 'Patches', title: 'Masked Character Patch (La Casa Style)', image: '/portfolio/portfolio-12.jpeg' },
  { id: 13, category: 'Patches', title: 'Assorted Small Fashion Patches (Icons Set)', image: '/portfolio/portfolio-13.jpeg' },
  { id: 14, category: 'Patches', title: 'Detailed Embroidered Skull Illustration', image: '/portfolio/portfolio-14.jpeg' },
  { id: 15, category: 'Logos', title: 'Wanderlust Script – Embroidered Wordmark', image: '/portfolio/portfolio-15.jpeg' },
  { id: 16, category: 'Patches', title: 'ISRO – Rocket Emblem (Diamond Patch)', image: '/portfolio/portfolio-16.jpeg' },
  { id: 17, category: 'Patches', title: 'ISRO Mission Badge – Hex Patch', image: '/portfolio/portfolio-17.jpeg' },
  { id: 18, category: 'Logos', title: 'Nemil – Monogram / Script Logo Embroidery', image: '/portfolio/portfolio-18.jpeg' },
  { id: 19, category: 'Patches', title: 'Biker Rally Patch Pack (Multiple Patches)', image: '/portfolio/portfolio-19.jpeg' },
  { id: 20, category: 'Caps', title: 'Custom Hat / Name Patch on Straw Fedora', image: '/portfolio/portfolio-20.jpeg' },
  { id: 21, category: 'Logos', title: 'Custom Apron Logo Embroidery – Nemil', image: '/portfolio/portfolio-21.jpeg' },
  { id: 22, category: 'Logos', title: 'Freshly Bakers Uniform T-Shirt Embroidery', image: '/portfolio/portfolio-22.jpeg' },
  { id: 23, category: 'Logos', title: 'Sony Branded Polo Shirt Embroidery', image: '/portfolio/portfolio-23.jpeg' },
  { id: 24, category: 'Logos', title: 'Personalized Name Towels – Archana & Sunita', image: '/portfolio/portfolio-24.jpeg' },
  { id: 25, category: 'Caps', title: 'Sanofi Branded Caps Embroidery', image: '/portfolio/portfolio-25.jpeg' }
];
