import { UploadFile } from "antd";

interface CustomFile extends File {
  originFileObj?: File;
  url?: string;
};

interface IFormDrill{
  name?: string;
  diameter?: number;
  length_xD?: number;
  deep_of_drill?: number;
  plates?: number;
  screws?: number;
  key?: string;
  company?: string;
  is_broken?: boolean;
  storage?: string;
  description?: string;
  images?: File[] | UploadFile[];
};

interface IScrew {
  id: number;
  type: string;
  length: number;
  thread: string;
  step_of_thread: number;
  company: string;
  description: string;
  image_path: string;
  create_at?: string;
  update_at?: string
  images?: File[] | UploadFile[];
};

interface IPlate {
  type: string;
  sub_type: string;
  material: string;
  amount: number;
  min_amount: number;
  company: string;
  description: string;
  id: number;
  image_path: string;
  create_at?: string;
  update_at?: string;
  images?: File[] | UploadFile[];
};

interface IDrill {
  id: number;
  name: string;
  diameter: number;
  deep_of_drill: number;
  screws?: Array<IScrew>;
  company: string;
  image_path: string;
  plates?: Array<IPlate>;
  length_xD: number;
  key?: string;
  is_broken?: boolean;
  storage: string;
  create_at?: string;
  update_at?: string;
};

interface IDetail extends IDrill, IScrew, IPlate {};

type DetailType = 'drills' | 'screws' | 'plates' | 'archive_drills'; //обязательно во множ числе

interface ErrorInterface {
  message: string;
}

interface SuccessInterface {
  message: string;
}

export type {
  CustomFile,
  IFormDrill,
  IDrill,
  IScrew,
  IPlate,
  IDetail,
  DetailType,
  ErrorInterface,
  SuccessInterface,
}