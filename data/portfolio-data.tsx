interface DummySlideItem {
  id: number;
  image: string;
  title: string;
  number: string;
  sideText: string;
  detailedContent: {
    subtitle: string;
    mainText: string;
  };
}

interface CardStackItem {
  id: number;
  name: string;
  designation: string;
  image: string;
}

export const SlidesData: DummySlideItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Azure Peaks",
    number: "01",
    sideText: "Mountain Serenity",
    detailedContent: {
      subtitle: "Whispers of the Wild",
      mainText:
        "Breathe in the crisp mountain air and witness the grandeur of Azure Peaks. A sanctuary where nature's artistry is on full display, offering moments of profound peace and untamed beauty.",
    },
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Silent Valley",
    number: "02",
    sideText: "Tranquil Waters",
    detailedContent: {
      subtitle: "Reflections of Stillness",
      mainText:
        "Silent Valley, a hidden gem where time slows. The placid lake mirrors the sky, surrounded by ancient forests, inviting quiet contemplation and a deep connection with the earth.",
    },
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Coastal Dreams",
    number: "03",
    sideText: "Ocean's Embrace",
    detailedContent: {
      subtitle: "Where Sand Meets Sea",
      mainText:
        "Let the rhythm of the waves soothe your soul. Coastal Dreams is a stretch of pristine beach where the golden sands meet the endless azure, a perfect escape to rejuvenate and dream.",
    },
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Urban Canvas",
    number: "04",
    sideText: "City's Pulse",
    detailedContent: {
      subtitle: "Vibrancy in Concrete",
      mainText:
        "Experience the dynamic energy of Urban Canvas. A city that never sleeps, painted with bright lights, architectural marvels, and the diverse stories of its inhabitants. A symphony of modern life.",
    },
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Enchanted Forest",
    number: "05",
    sideText: "Mystic Woods",
    detailedContent: {
      subtitle: "Secrets of the Ancients",
      mainText:
        "Step into the Enchanted Forest, where sunlight filters through ancient canopies, and whispers of old magic linger in the air. A realm of mystery and wonder, waiting to be explored.",
    },
  },
];

export const CardStackData: CardStackItem[] = [
  {
    id: 1,
    name: "Azure Peaks",
    designation: "Mountain Serenity",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Silent Valley",
    designation: "Tranquil Waters",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Coastal Dreams",
    designation: "Ocean's Embrace",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Urban Canvas",
    designation: "City's Pulse",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Enchanted Forest",
    designation: "Mystic Woods",
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
