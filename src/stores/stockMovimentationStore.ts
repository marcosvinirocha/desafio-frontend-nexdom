import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api";

export interface StockMovimentation {
  id?: number;
  produtoId: number;
  tipoMovimentacao: "ENTRADA" | "SAIDA";
  quantidade: number;
  valorVenda: number;
}

export const useStockMovimentationStore = defineStore(
  "stockMovimentation",
  () => {
    const stockMovimentations = ref<StockMovimentation[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function addStockMovimentation(
      stockMovimentation: StockMovimentation,
    ) {
      loading.value = true;
      try {
        await api.post("/movimentacoes", stockMovimentation);
      } catch (err) {
        error.value = "Erro ao adicionar movimentação";
      } finally {
        loading.value = false;
      }
    }

    return {
      stockMovimentations,
      loading,
      error,
      addStockMovimentation,
    };
  },
);
