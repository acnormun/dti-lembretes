import { log } from 'console';
import { defineStore } from 'pinia';

export const lembretes_store = defineStore('lembretes_store', {
  state: () => {
    const lembretes: Array<any> = [];

    return {
      lembretes,
    };
  },

  getters: {
    getLembretes: (state) => state.lembretes,
  },
  actions: {
    setLembretes(value: any) {
      this.lembretes.push(value);
    },
    deleteLembrete(value: any) {
      this.lembretes = this.lembretes.filter((item) => item.id != value.id);
    },
  },
});
