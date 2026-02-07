<template>
  <h1>Dashboard</h1>
  <Stats />
  <div class="flex gap-2 items-center justify-around mr-96">
    <Table />
    <Table />
  </div>
</template>

<script setup lang="ts">
import Stats from '@/components/ui/Stats.vue'
import Table from '@/components/ui/Table.vue'
</script>