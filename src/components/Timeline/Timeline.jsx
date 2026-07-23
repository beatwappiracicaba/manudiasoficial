import Reveal from "../Reveal/Reveal";

export default function Timeline() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("timelineItems");
    return saved ? JSON.parse(saved) : [
      { year: "2018", title: "Primeiros Passos", description: "Início da trajetória musical em Piracicaba." },
      { year: "2019", title: "Primeiro show", description: "Apresentação marcante que conquistou o público local." },
      { year: "2020", title: "Reconhecimento", description: "Prêmios e reconhecimento regional." },
      { year: "2022", title: "A Princesinha do Modão", description: "Título consolidado e agenda crescente." },
      { year: "2024", title: "Nacional", description: "Expansão da carreira para novas cidades e estados." },
    ];
  });

  useEffect(() => {
    localStorage.setItem("timelineItems", JSON.stringify(items));
  }, [items]);

  return (
    <section id="timeline" className="py-24 relative">
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card to-dark" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gold-gradient">Trajetória</span>
            </h2>
            <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

          <div className="space-y-16">
            {items.map((item, index) => (
              <Reveal key={item.year} direction={index % 2 === 0 ? "left" : "right"}>
                <div className={`flex items-center gap-8 ${index % 2 === 0 ? "md-flex-row" : "md-flex-row-reverse"}>
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="glass-card p-6 inline-block">
                      <span className="text-gold font-bold text-xl">{item.year}</span>
                      <h3 className="text-xl font-bold mt-2 mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-gold shadow-gold z-10 shrink-0" />
                  <div className="flex-1 hidden md:block" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
