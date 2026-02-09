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

export interface ProdutoPorTipo {
  produtoId: number;
  codigo: string;
  descricao: string;
  tipo: "ELETRONICO" | "ELETRODOMESTICO" | "MOVEL";
  quantidadeTotalSaida: number;
  quantidadeDisponivel: number;
}

export interface ProdutoPorLucro {
  produtoId: number;
  codigo: string;
  descricao: string;
  quantidadeTotalSaida: number;
  lucroTotal: number;
}

export const useProductStore = defineStore("product", () => {
  const products = ref<Produto[]>([]);
  const productsByType = ref<ProdutoPorTipo[]>([]);
  const productsByProfit = ref<ProdutoPorLucro[]>([]);
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

  async function getProductsByType() {
    loading.value = true;
    try {
      const response = await api.get("/produtos/resumo-por-tipo");
      productsByType.value = response.data;
    } catch (err) {
      error.value = "Erro ao buscar produtos";
    } finally {
      loading.value = false;
    }
  }

  async function getProductsByProfit() {
    loading.value = true;
    try {
      const response = await api.get("/produtos/lucro-por-produto");
      productsByProfit.value = response.data;
    } catch (err) {
      error.value = "Erro ao buscar produtos";
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    productsByType,
    productsByProfit,
    loading,
    error,
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProductsByType,
    getProductsByProfit,
  };
});
