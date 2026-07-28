const STORAGE_KEY = "card-game19:data";

const SEED = {
  decks: [
    { id: "deck-1", name: "Geografía", description: "Capitales y países", accent: "#f5d77a", created_date: "2026-01-01" },
  ],
  cards: [
    { id: "card-1", deck_id: "deck-1", question: "Capital de Francia", answer: "París", label: "Europa", created_date: "2026-01-01" },
    { id: "card-2", deck_id: "deck-1", question: "Capital de Japón", answer: "Tokio", label: "Asia", created_date: "2026-01-02" },
    { id: "card-3", deck_id: "deck-1", question: "Capital de Chile", answer: "Santiago", label: "América", created_date: "2026-01-03" },
    { id: "card-4", deck_id: "deck-1", question: "Capital de Egipto", answer: "El Cairo", label: "África", created_date: "2026-01-04" },
    { id: "card-5", deck_id: "deck-1", question: "Capital de Canadá", answer: "Ottawa", label: "América", created_date: "2026-01-05" },
    { id: "card-6", deck_id: "deck-1", question: "Capital de Australia", answer: "Canberra", label: "Oceanía", created_date: "2026-01-06" },
    { id: "card-7", deck_id: "deck-1", question: "Capital de Rusia", answer: "Moscú", label: "Europa", created_date: "2026-01-07" },
    { id: "card-8", deck_id: "deck-1", question: "Capital de India", answer: "Nueva Delhi", label: "Asia", created_date: "2026-01-08" },
  ],
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) throw new Error("empty");
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
    return SEED;
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function sortBy(items, orderKey) {
  if (!orderKey) return items;
  const desc = orderKey.startsWith("-");
  const key = desc ? orderKey.slice(1) : orderKey;
  return [...items].sort((a, b) => {
    if (a[key] < b[key]) return desc ? 1 : -1;
    if (a[key] > b[key]) return desc ? -1 : 1;
    return 0;
  });
}

function makeCollection(collectionKey) {
  return {
    async list(orderKey) {
      const data = load();
      return sortBy(data[collectionKey], orderKey);
    },
    async filter(query, orderKey) {
      const data = load();
      const matches = data[collectionKey].filter((item) =>
        Object.entries(query).every(([k, v]) => item[k] === v)
      );
      return sortBy(matches, orderKey);
    },
    async create(fields) {
      const data = load();
      const record = { id: crypto.randomUUID(), created_date: new Date().toISOString(), ...fields };
      data[collectionKey].push(record);
      save(data);
      return record;
    },
    async update(id, fields) {
      const data = load();
      const idx = data[collectionKey].findIndex((item) => item.id === id);
      if (idx === -1) throw new Error(`${collectionKey} ${id} not found`);
      data[collectionKey][idx] = { ...data[collectionKey][idx], ...fields };
      save(data);
      return data[collectionKey][idx];
    },
    async delete(id) {
      const data = load();
      data[collectionKey] = data[collectionKey].filter((item) => item.id !== id);
      save(data);
    },
  };
}

export const store = {
  entities: {
    Deck: makeCollection("decks"),
    Flashcard: makeCollection("cards"),
  },
};
