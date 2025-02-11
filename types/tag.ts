export const TagColors : Record<string, string> = {
  black: "bg-black text-white border-black",
  celadon: "bg-celadon text-white border-celadon"
}

export interface Tag {
  _id: string;
  name: string;
  description?: string;
  color: string;
  user: string;
}

export interface TagForm {
  name: string;
}
