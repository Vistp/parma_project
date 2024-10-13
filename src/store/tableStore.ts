import { endpoints } from 'consts/consts';
import { makeAutoObservable } from 'mobx';
import { IDrill } from 'types/types';
import { getData } from 'utils/api';

class TableStore {
  drills: IDrill[] = [];
  isBroken: boolean = false;
  idDrillEdit: number = 1;
  idDrillDescription: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  async getDrills(): Promise<void> {
    this.drills = await getData(endpoints.drills);
  }

  getDiameters(): number[] {
    if (!this.drills || !this.drills.length) return [];
    return Array.from(new Set(this.drills.map((drill) => drill.diameter))).sort((a, b) => a - b);
  }

  handleIsBroken(): void {
    this.isBroken = !this.isBroken;
    this.getDrills();
  }

  getDrillIdEdit(id: number): void {
    this.idDrillEdit = id;
    console.log(this.idDrillEdit);
  }

  getDrillIdDescription(id: number): void {
    this.idDrillDescription = id;
  }
}

export default new TableStore();
