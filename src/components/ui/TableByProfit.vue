<script setup lang="ts">
import type { ProdutoPorLucro } from '@/stores/productsStore'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Info } from 'lucide-vue-next'

const props = defineProps<{
    products: ProdutoPorLucro[]
}>()

const formatarNumeroBR = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);
};
</script>

<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8 border-solid border-2 border-gray-400 rounded-lg">
                <span class="text-lg font-bold">Produtos por lucro</span>
                <div class="overflow-hidden">
                    <table v-if="products.length > 0" class="min-w-full">
                        <thead class="bg-white border-b">
                            <tr>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Código
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Produto
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Quantidade total saída
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Lucro total (R$)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products" :key="product.codigo" class="bg-gray-100 border-b">

                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ product.codigo }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ product.descricao }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ product.quantidadeTotalSaida }}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{ formatarNumeroBR(product.lucroTotal) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else>
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <Info />
                                </EmptyMedia>
                            </EmptyHeader>
                            <EmptyTitle>Nenhum produto cadastrado</EmptyTitle>

                        </Empty>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>