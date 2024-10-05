  export interface IFormDrill{
    name?: string;
    diameter?: number;
    length_xD?: number;
    deep_of_drill?: number;
    plate?: string;
    key?: string;
    company?: string;
    is_broken?: boolean;
    storage?: string;
    description?: string;
  }
  
  
  export interface IDrill {
    id: number;
    name: string;
    diameter: number;
    deep_of_drill: number;
    screws?: string;
    company: string;
    image_path: string,
    create_at?: string;
    plate?: string;
    length_xD: number;
    key?: string;
    is_broken?: boolean,
    storage: string,
    update_at?: string;
  }
  