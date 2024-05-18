import UnlockedPlace from "./UnlockedPlace";

type Place = {
  id: number;
  name: string;
  geoWidth: number;
  geoHeight: number;
  photo: string | string[];
  category: string;
  description: string;
};

export default Place;
