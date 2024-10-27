import { endpoints } from 'consts/consts';
import { makeAutoObservable, runInAction } from 'mobx';
import { DetailType, IDetail } from 'types/types';
import { getData } from 'utils/api';

class TableStore {
  details: IDetail[] = [];
  isBroken: boolean = false;
  idDetailEdit: number | null = null;
  idDetailDescription: number | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getDetails(details: DetailType): Promise<void> {
    try {
      const data = await getData(endpoints[details]);
      runInAction(() => {
        this.details = data;
        if (this.details.length > 0) {
          this.idDetailDescription = this.details[0].id;
        }
      });
    } catch (error) {
      console.error("Failed to fetch drills:", error);
    }
  }

  getDetailsParameters(details: DetailType) {
    switch (details) {
      case 'drills': {
        return this.getDiameters();}
      case 'screws':
        return this.getScrewsLength();
      case 'plates':
        return this.getPlatesAmount();
    }
  }

  getDiameters(): number[] {
    if (!this.details || !this.details.length) return [];
    const diameters = this.details.map((drill) => drill.diameter);
    return Array.from(new Set(diameters)).sort((a, b) => a - b);
  }

  getScrewsLength(): number[] {
    if (!this.details || !this.details.length) return [];
    return Array.from(new Set(this.details.map((screw) => screw.length))).sort((a, b) => a! - b!);
  }

  getPlatesAmount(): number[] {
    if (!this.details || !this.details.length) return [];
    return Array.from(new Set(this.details.map((plate) => plate.amount))).sort((a, b) => a! - b!);
  }

  handleIsBroken(): void {
    this.isBroken = !this.isBroken;
    this.getDetails('drills');
  }

  getDetailIdEdit(id: number): void {
    this.idDetailEdit = id;
    // console.log(this.idDetailEdit);
  }

  getDetailIdDescription(id: number): void {
    this.idDetailDescription = id;
  }
}

export default new TableStore();
