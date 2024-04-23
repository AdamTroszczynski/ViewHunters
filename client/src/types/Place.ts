export type Place = {
  id: number;
  name: string;
  geoWidth: number;
  geoHeight: number;
  photo: string[];
  category: string;
  description: string;
  code: string;
  isDiscovered: boolean;
};

export type ExploredPlace = {
  id: number;
  name: string;
  category: string;
  photo: string;
};
