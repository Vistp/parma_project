import { endpoints } from 'consts/consts';
import { makeAutoObservable, runInAction } from 'mobx';
import { IDrill } from 'types/types';
import { getData } from 'utils/api';

class TableStore {
  drills: IDrill[] = [];
  isBroken: boolean = false;
  idDrillEdit: number | null = null;
  idDrillDescription: number | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getDrills(): Promise<void> {
    try {
      const data = await getData(endpoints.drills);
      runInAction(() => {
        this.drills = data;
        if (this.drills.length > 0) {
          this.idDrillDescription = this.drills[0].id;
        }
      });
    } catch (error) {
      console.error("Failed to fetch drills:", error);
    }
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
