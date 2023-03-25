import { Resource } from './resource.interface';

export interface GetImagesFullResponse {
  resources: Resource[];
  next_cursor: string;
}
