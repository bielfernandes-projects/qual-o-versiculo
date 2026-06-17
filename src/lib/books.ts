export type Testament = "all" | "old" | "new";

export const OLD_TESTAMENT = [
  "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio",
  "Josué", "Juízes", "Rute", "1 Samuel", "2 Samuel",
  "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras",
  "Neemias", "Tobias", "Judite", "Ester", "1 Macabeus",
  "2 Macabeus", "Jó", "Salmos", "Provérbios", "Eclesiastes",
  "Cântico dos Cânticos", "Sabedoria", "Eclesiástico",
  "Isaías", "Jeremias", "Lamentações", "Baruc",
  "Ezequiel", "Daniel", "Oseias", "Joel", "Amós",
  "Abdias", "Jonas", "Miqueias", "Naum", "Habacuc",
  "Sofonias", "Ageu", "Zacarias", "Malaquias",
];

export const NEW_TESTAMENT = [
  "Mateus", "Marcos", "Lucas", "João",
  "Atos dos Apóstolos", "Romanos", "1 Coríntios", "2 Coríntios",
  "Gálatas", "Efésios", "Filipenses", "Colossenses",
  "1 Tessalonicenses", "2 Tessalonicenses", "1 Timóteo", "2 Timóteo",
  "Tito", "Filêmon", "Hebreus", "Tiago",
  "1 Pedro", "2 Pedro", "1 João", "2 João", "3 João",
  "Judas", "Apocalipse",
];

export function getBooksForTestament(testament: Testament): string[] | null {
  if (testament === "old") return OLD_TESTAMENT;
  if (testament === "new") return NEW_TESTAMENT;
  return null;
}

const ALL_BOOKS = [...OLD_TESTAMENT, ...NEW_TESTAMENT];

export function parseCitation(query: string): { book: string; chapter: number; verse: number } | null {
  const match = query.match(/^([A-ZÀ-Úa-zà-ú\s]+?)\s+(\d+):(\d+)$/);
  if (!match) return null;

  const input = match[1].trim();
  const chapter = parseInt(match[2], 10);
  const verse = parseInt(match[3], 10);
  if (!chapter || !verse) return null;

  const book = ALL_BOOKS.find(
    (b) => b.toLowerCase() === input.toLowerCase(),
  );
  if (!book) return null;

  return { book, chapter, verse };
}
