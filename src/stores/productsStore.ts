import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/services/api";

export interface Produto {
  id?: number;
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

  async function getProducts() {
    loading.value = true;
    try {
      const response = await api.get("/produtos");
      products.value = response.data;
    } catch (err) {
      error.value = "Erro ao buscar produtos";
    } finally {
      loading.value = false;
    }
  }

  async function updateProduct(id: number, product: Produto) {
    loading.value = true;
    try {
      await api.put(`/produtos/${id}`, product);
    } catch (err) {
      error.value = "Erro ao atualizar produto";
    } finally {
      loading.value = false;
    }
  }

  async function deleteProduct(id: number) {
    loading.value = true;
    try {
      await api.delete(`/produtos/${id}`);
      await getProducts();
    } catch (err) {
      error.value = "Erro ao deletar produto";
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    loading,
    error,
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
  };
});
