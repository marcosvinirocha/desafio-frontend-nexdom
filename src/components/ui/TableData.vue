<script setup lang="ts">
import DrawerProducts from "../DrawerProducts.vue";
import { FolderOpen, Info, Search, Trash } from "lucide-vue-next";
import { useProductStore } from '@/stores/productsStore';
import { computed, onMounted, ref } from 'vue';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

const productsStore = useProductStore();
const searchQuery = ref("");

const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
};

const filteredProducts = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return productsStore.products;

    return productsStore.products.filter(product => {
        return product.descricao.toLowerCase().includes(query) ||
            product.codigo.toString().toLowerCase().includes(query);
    });
});

onMounted(() => {
    productsStore.getProducts();
});
</script>

<template>
    <div class="flex flex-col">
        <div class=" overflow-x-auto">
            <div class="min-w-full inline-block align-middle">
                <div class="flex items-center justify-between mb-4 gap-2">
                    <div class="relative text-gray-500 focus-within:text-gray-900">
                        <div class="absolute inset-y-0 left-1 flex items-center pl-3 pointer-events-none">
                            <Search class="w-5 h-5" />
                        </div>
                        <input type="text" id="default-search"
                            class="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Pesquisar produto" v-model="searchQuery">
                    </div>
                    <DrawerProducts />
                </div>
                <div v-if="productsStore.products.length === 0" class="flex items-center justify-center h-64">
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <Info />
                            </EmptyMedia>
                        </EmptyHeader>
                        <EmptyTitle>Nenhum produto cadastrado</EmptyTitle>

                    </Empty>
                </div>
                <div v-else class="overflow-hidden ">
                    <table class=" min-w-full rounded-xl">
                        <thead>
                            <tr class="bg-gray-50">
                                <th scope="col"
                                    class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl">
                                    Código </th>
                                <th scope="col"
                                    class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">
                                    Descrição </th>

                                <th scope="col"
                                    class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">
                                    Tipo </th>
                                <th scope="col"
                                    class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl">
                                    Valor </th>
                                <th scope="col"
                                    class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl">
                                    Quantidade </th>
                            </tr>
                        </thead>
                        <tbody v-for="product in filteredProducts" :key="product.id" class="divide-y divide-gray-300 ">
                            <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                                <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 "> {{
                                    product.codigo }}</td>
                                <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {{
                                    product.descricao }}</td>
                                <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                    <span v-if="product.tipo === 'ELETRONICO'"
                                        class="bg-blue-300 text-blue-900 inline-block text-center px-2 py-1 rounded text-md font-semibold">Eletrônico</span>
                                    <span v-if="product.tipo === 'ELETRODOMESTICO'"
                                        class="bg-green-300 text-green-900 inline-block text-center px-2 py-1 rounded text-md font-semibold">Eletrodoméstico</span>
                                    <span v-if="product.tipo === 'MOVEL'"
                                        class="bg-yellow-300 text-yellow-900 inline-block text-center px-2 py-1 rounded text-md font-semibold">Móvel</span>
                                </td>
                                <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                    {{ formatarMoeda(product.valorFornecedor) }}</td>
                                <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                    {{ product.quantidadeEstoque }}</td>
                                <td class=" p-5 ">
                                    <div class="flex items-center gap-1">
                                        <button
                                            class="p-2  rounded-full  group transition-all duration-500  flex item-center">
                                            <DrawerProducts v-if="product.id" :product="product" :isEditing="true" />
                                        </button>
                                        <button
                                            class="p-2 rounded-full  group transition-all duration-500  flex item-center">
                                            <Trash class="w-5 h-5" @click="productsStore.deleteProduct(product.id!)" />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
