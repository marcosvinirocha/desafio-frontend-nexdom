import { defineStore } from "pinia";

export interface Produto {
  codigo: string;
  descricao: string;
  tipo: "Eletrônico" | "Eletrodoméstico" | "Móvel";
  valorFornecedor: number;
  quantidade: number;
}

// 2. Definir o formato do Estado
interface ProductState {
  products: Produto[];
  loading: boolean;
  error: string | null;
}

export const useProductStore = defineStore("product", {
  state: (): ProductState => ({
    products: [],
    loading: false,
    error: null,
  }),

  actions: {
    // async fetchProducts() {
    //   this.loading = true;
    //   try {
    //     const response = await api.get<Produto[]>('/produtos'); // Tipando o retorno do Axios
    //     this.products = response.data;
    //   } catch (err) {
    //     this.error = 'Erro ao carregar produtos';
    //   } finally {
    //     this.loading = false;
    //   }
    // },
  },

  getters: {
    totalItens: (state) => state.products.length,
    valorTotalEstoque: (state) =>
      state.products.reduce(
        (acc, p) => acc + p.valorFornecedor * p.quantidade,
        0,
      ),
  },
});
