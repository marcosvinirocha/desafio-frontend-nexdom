import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api";

export interface Produto {
  codigo: string;
  descricao: string;
  tipo: "ELETRONICO" | "ELETRODOMESTICO" | "MOVEL";
  valorFornecedor: number;
  quantidadeEstoque: number;
}

export const useProductStore = defineStore("product", () => {
  const products = ref<Produto[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function addProduct(product: Produto) {
    loading.value = true;
    try {
      await api.post("/produtos", product);
    } catch (err) {
      error.value = "Erro ao adicionar produto";
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    loading,
    error,
    addProduct,
  };
});
