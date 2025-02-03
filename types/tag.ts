export enum TagColors {
  black = "bg-black text-white border-black",
  celadon = "bg-celadon text-white border-celadon"
}

export interface Tag {
  _id: string;
  name: string;
  description?: string;
  color: keyof typeof TagColors;
  user: string;
}

export interface TagForm {
  name: string;
}
