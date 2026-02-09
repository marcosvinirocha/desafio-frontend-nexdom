<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useProductStore } from '@/stores/productsStore';
import { toast } from 'vue-sonner';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Input from './ui/input/Input.vue';
import { Button } from '@/components/ui/button';
import { useStockMovimentationStore, type StockMovimentation } from '@/stores/stockMovimentationStore';

const productStore = useProductStore();
const movimentacaoStore = useStockMovimentationStore();

const movimentacaoSchema = toTypedSchema(z.object({
    produtoId: z.number().min(1, 'Selecione um produto'),
    tipoMovimentacao: z.enum(['ENTRADA', 'SAIDA']),
    quantidade: z.number().min(1, 'Quantidade mínima é 1'),
    valorVenda: z.number().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
    if (data.tipoMovimentacao === 'SAIDA') {
        if (!data.valorVenda || Number(data.valorVenda) <= 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "O valor de venda é obrigatório para saídas",
                path: ['valorVenda'],
            });
        }
    }
}));

const form = useForm({
    validationSchema: movimentacaoSchema,
    initialValues: {
        tipoMovimentacao: 'SAIDA',
        quantidade: 1,
        valorVenda: 0
    }
});

const onSubmit = form.handleSubmit(async (values) => {
    try {
        await movimentacaoStore.addStockMovimentation(values as StockMovimentation);
        toast.success('Movimentação registrada com sucesso!');
        form.resetForm();
        await productStore.getProducts();
        await productStore.getProductsByType();
        await productStore.getProductsByProfit();
    } catch (error) {
        toast.error('Erro ao registrar movimentação. Verifique o estoque.');
    }

    console.log(values)
});
</script>

<template>
    <form @submit="onSubmit" class="space-y-4 p-4 bg-white rounded-lg shadow-sm border">
        <h2 class="text-xl font-bold mb-4">Registrar Movimentação</h2>

        <FormField v-slot="{ componentField }" name="produtoId">
            <FormItem>
                <FormLabel>Produto</FormLabel>
                <Select v-bind="componentField">
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um produto" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem v-for="p in productStore.products" :key="p.id" :value="p.id">
                            {{ p.codigo }} - {{ p.descricao }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        </FormField>

        <div class="grid grid-cols-2 gap-4">
            <FormField v-slot="{ componentField }" name="tipoMovimentacao">
                <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select v-bind="componentField">
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="ENTRADA">Entrada</SelectItem>
                            <SelectItem value="SAIDA">Saída</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="quantidade">
                <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                        <Input type="number" v-bind="componentField"
                            @input="(val: { target: { value: any; }; }) => form.setFieldValue('quantidade', Number(val.target.value))" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>

        <FormField v-if="form.values.tipoMovimentacao === 'SAIDA'" v-slot="{ componentField }" name="valorVenda">
            <FormItem>
                <FormLabel>Valor da Operação (R$)</FormLabel>
                <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" v-bind="componentField"
                        @input="(val: { target: { value: any; }; }) => form.setFieldValue('valorVenda', parseFloat(val.target.value))" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <Button type="submit" class="w-full" :disabled="movimentacaoStore.loading">
            {{ movimentacaoStore.loading ? 'Processando...' : 'Confirmar Movimentação' }}
        </Button>
    </form>
</template>