<template>
  <h1>Dashboard</h1>
  <Stats :quantidadeEstoque="quantidadeEstoque" :products="productStore.productsByProfit" />
  <div class="flex flex-col gap-3  justify-around mr-[250px]">
    <Table :products="productStore.productsByType" />
    <TableByProfit :quantidadeEstoque="quantidadeEstoque" :products="productStore.productsByProfit" />
  </div>
</template>

<script setup lang="ts">
import Stats from '@/components/ui/Stats.vue'
import Table from '@/components/ui/TableByType.vue'
import TableByProfit from '@/components/ui/TableByProfit.vue'
import { useProductStore } from '@/stores/productsStore'
import { computed, onMounted } from 'vue'

const productStore = useProductStore()

const quantidadeEstoque = computed(() => {
  return productStore.productsByType.reduce((total, produto) => total + produto.quantidadeDisponivel, 0)
})

onMounted(() => {
  productStore.getProducts()
  productStore.getProductsByType()
  productStore.getProductsByProfit()
})
</script>