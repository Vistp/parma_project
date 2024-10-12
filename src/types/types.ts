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
  
  export interface IScrew {
    type: string;
    length: number;
    thread: string;
    stepOfThread: number;
    company: string;
    description: string;
    id: number;
    imagePath: string;
    createAt: string;
    updateAt: string;
}

export interface IPlate {
    type: string;
    subType: string;
    material: string;
    amount: number;
    minAmount: number;
    company: string;
    description: string;
    id: number;
    imagePath: string;
    createAt: string;
    updateAt: string;
}


  export interface IDrill {
    id: number;
    name: string;
    diameter: number;
    deep_of_drill: number;
    screws?: Array<IScrew>;
    company: string;
    image_path: string,
    create_at?: string;
    plates?: Array<IPlate>;
    length_xD: number;
    key?: string;
    is_broken?: boolean,
    storage: string,
    update_at?: string;
  }
  