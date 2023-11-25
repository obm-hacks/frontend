import { Weather } from '@/types/Weather';

export type BuildingInfo = {
  'date': string;
  'prediction': number;
  'weather': Weather;
}