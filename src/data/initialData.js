export const initialData = {
  hero: {
    title: "Manu Dias",
    subtitle: "Cantora & Compositora",
    description:
      "Uma voz que emociona e contagia. Shows inesquecíveis que unem modão, universitário e raiz.",
    backgroundImage: "",
    mainImage: "",
    buttons: [
      { id: 1, text: "Contratar Show", link: "https://wa.me/", variant: "primary" },
      { id: 2, text: "Seguir no Instagram", link: "https://instagram.com/", variant: "secondary" },
    ],
  },
  about: {
    title: "Sobre",
    text:
      "Nascida em Piracicaba, interior de São Paulo, Manu Dias transforma sua paixão pela música em shows que conectam gerações. Com influências que vão do modão ao universitário, sua voz forte e carismática conquista públicos de todas as idades.",
    image: "",
  },
  history: [
    {
      id: 1,
      year: "2018",
      title: "Início da Carreira",
      description: "Primeiros shows em casas de show da região de Piracicaba.",
      image: "",
    },
    {
      id: 2,
      year: "2020",
      title: "Primeiro Álbum",
      description: "Lançamento do primeiro EP com músicas autorais.",
      image: "",
    },
    {
      id: 3,
      year: "2023",
      title: "Turnê Nacional",
      description: "Apresentações em mais de 50 cidades por todo o Brasil.",
      image: "",
    },
    {
      id: 4,
      year: "2024",
      title: "Festivais",
      description: "Participação em festivais de música country e sertaneja.",
      image: "",
    },
  ],
  agenda: [
    {
      id: 1,
      date: "2025-08-15",
      location: "São Paulo, SP",
      venue: "Bar Brahma",
      status: "confirmed",
    },
    {
      id: 2,
      date: "2025-08-22",
      location: "Campinas, SP",
      venue: "Red Live",
      status: "confirmed",
    },
    {
      id: 3,
      date: "2025-09-05",
      location: "Rio de Janeiro, RJ",
      venue: "Barra Music",
      status: "pending",
    },
  ],
  gallery: [
    { id: 1, src: "", caption: "Show em Piracicaba", category: "shows" },
    { id: 2, src: "", caption: "Backstage", category: "backstage" },
    { id: 3, src: "", caption: "Ensaios", category: "ensaios" },
    { id: 4, src: "", caption: "Festival", category: "shows" },
  ],
  instagram: {
    username: "manudiasoficial",
    profileLink: "https://instagram.com/manudiasoficial",
  },
  songs: [
    { id: 1, title: "Modão Raiz", duration: "3:45", cover: "" },
    { id: 2, title: "Coração de Vaqueiro", duration: "4:12", cover: "" },
    { id: 3, title: "Noite Estrelada", duration: "3:28", cover: "" },
  ],
  repertoire: [
    {
      id: "modao",
      name: "Modão",
      songs: ["Modão Raiz", "Coração de Vaqueiro", "Tropeiro"],
    },
    {
      id: "universitario",
      name: "Universitário",
      songs: ["Noite Estrelada", "Garota do Interior", "Amor de Verão"],
    },
    {
      id: "raiz",
      name: "Raiz",
      songs: ["Saudade do Interior", "Viola de Ouro", "Poeira da Estrada"],
    },
    {
      id: "classicos",
      name: "Clássicos",
      songs: ["Jeito de Mato", "Ai Coração", "Boate Azul"],
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "João Silva",
      text: "Show incrível! A energia da Manu é contagiante.",
      photo: "",
    },
    {
      id: 2,
      name: "Maria Oliveira",
      text: "Melhor show que já assisti. Recomendo demais!",
      photo: "",
    },
    {
      id: 3,
      name: "Carlos Mendes",
      text: "Profissionalismo e talento definem Manu Dias.",
      photo: "",
    },
  ],
  partners: [
    { id: 1, name: "Parceiro 1", logo: "", link: "" },
    { id: 2, name: "Parceiro 2", logo: "", link: "" },
    { id: 3, name: "Parceiro 3", logo: "", link: "" },
  ],
  newsletter: {
    title: "Newsletter",
    description: "Receba novidades e lançamentos exclusivos.",
    placeholder: "Seu e-mail",
  },
  contact: {
    whatsapp: "5511999999999",
    instagram: "manudiasoficial",
    email: "contato@manudiasoficial.com.br",
    address: "Piracicaba, SP - Brasil",
    map: "",
  },
  seo: {
    title: "Manu Dias - Cantora & Compositora",
    description: "Shows de modão, universitário e raiz. Contrate Manu Dias para seu evento.",
    keywords: "manu dias, cantora, modão, universitário, show, piracicaba, sertanejo",
    ogImage: "",
  },
  settings: {
    artistName: "Manu Dias",
    slogan: "Voz que emociona, show que contagia",
    logo: "",
    favicon: "",
    primaryColor: "#D4AF37",
    secondaryColor: "#111111",
    socials: {
      instagram: "https://instagram.com/manudiasoficial",
      youtube: "",
      spotify: "",
      tiktok: "",
    },
  },
};

export default initialData;
