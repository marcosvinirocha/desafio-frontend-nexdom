<script setup lang="ts">
import type { ProdutoPorLucro } from '@/stores/productsStore'
import { computed } from 'vue';

const props = defineProps<{
    products: ProdutoPorLucro[]
    quantidadeEstoque: number
}>()

const lucroTotal = computed(() => {
    return props.products.reduce((total, produto) => total + produto.lucroTotal, 0)
})


const saidas = computed(() => {
    return props.products.reduce((total, produto) => total + produto.quantidadeTotalSaida, 0)
})

const formatarNumeroBR = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(valor);
};

</script>

<template>
    <div class=" h-[30vh] w-[97vw]">
        <div class="grid gap-2 lg:gap-8 md:grid-cols-3 p-5 pt-10 pr-80">
            <div
                class="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800 border-solid border-2 border-gray-400 rounded-lg">
                <div class="space-y-2">
                    <div
                        class="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span>Lucro Total (R$)</span>
                    </div>

                    <div class="text-3xl dark:text-gray-100">
                        {{ formatarNumeroBR(lucroTotal) }}
                    </div>
                </div>
            </div>

            <div
                class="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800 border-solid border-2 border-gray-400 rounded-lg">
                <div class="space-y-2">
                    <div
                        class="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span>Produtos em Estoque</span>
                    </div>

                    <div class="text-3xl dark:text-gray-100">
                        {{ quantidadeEstoque }}
                    </div>
                </div>

            </div>

            <div
                class="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800 border-solid border-2 border-gray-400 rounded-lg">
                <div class="space-y-2">
                    <div
                        class="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">

                        <span>Saídas</span>
                    </div>

                    <div class="text-3xl dark:text-gray-100">
                        {{ saidas }}
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>