<script setup lang="ts">
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from '@/components/ui/sheet'
import {
    InputGroup,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import Input from './ui/input/Input.vue';
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate';
import { useProductStore } from '@/stores/productsStore';
import { toast } from 'vue-sonner'
import { ref, watch } from 'vue'
import { Pencil } from 'lucide-vue-next'

const props = defineProps({
    isEditing: {
        type: Boolean,
        default: false,
    },
    product: {
        type: Object,
        default: () => ({}),
    },
})

const productStore = useProductStore();
const closeButtonRef = ref<InstanceType<typeof SheetClose> | null>(null)

const schema = toTypedSchema(z.object({
    codigo: z.string().min(1, 'Campo obrigatório'),
    descricao: z.string().min(1, 'Campo obrigatório'),
    tipo: z.enum(['ELETRONICO', 'ELETRODOMESTICO', 'MOVEL'],),
    valorFornecedor: z.number().min(1, 'Campo obrigatório'),
    quantidadeEstoque: z.number().min(1, 'Campo obrigatório'),
}))

const form = useForm({
    validationSchema: schema,
    initialValues: {
        codigo: props.product.codigo,
        descricao: props.product.descricao,
        tipo: props.product.tipo,
        valorFornecedor: props.product.valorFornecedor,
        quantidadeEstoque: props.product.quantidadeEstoque,
    },
})


const onSubmit = form.handleSubmit(async (values) => {
    try {
        if (props.isEditing) {
            await productStore.updateProduct(props.product.id, values);
            toast.success('Produto atualizado com sucesso');
            await productStore.getProducts();
        } else {
            await productStore.addProduct(values);
            toast.success('Produto adicionado com sucesso');
            await productStore.getProducts();
        }
        const element = closeButtonRef.value?.$el as HTMLElement;
        element?.click();
        form.resetForm();
    } catch (error) {
        toast.error('Erro ao adicionar produto');
    }

    console.log(values);
})

watch(() => props.product, (newProduct) => {
    form.setValues({
        codigo: newProduct.codigo,
        descricao: newProduct.descricao,
        tipo: newProduct.tipo,
        valorFornecedor: newProduct.valorFornecedor,
        quantidadeEstoque: newProduct.quantidadeEstoque,
    })
}, { deep: true, immediate: true })
</script>

<template>
    <Sheet>
        <SheetTrigger>
            <Button :variant="isEditing ? 'outline' : 'default'">
                <template v-if="isEditing">
                    <Pencil class="w-5 h-5" />
                </template>
                <template v-else>
                    Criar Produto
                </template>
            </Button>

        </SheetTrigger>
        <SheetContent>
            <SheetClose ref="closeButtonRef" class="hidden" />
            <SheetHeader>
                <SheetTitle class="text-2xl font-bold">{{ isEditing ? 'Editar Produto' : 'Criar Produto' }}</SheetTitle>
            </SheetHeader>
            <form @submit="onSubmit" class="p-5">
                <FormField v-slot="{ componentField }" name="codigo">
                    <FormItem>
                        <FormLabel>Codigo</FormLabel>
                        <FormControl>
                            <Input placeholder="Digite o codigo" class="mb-2" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="descricao">
                    <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                            <Input placeholder="Descreva o produto" class="mb-2" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="tipo">
                    <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <FormControl>
                            <Select v-bind="componentField">
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ELETRONICO">Eletrônico</SelectItem>
                                    <SelectItem value="ELETRODOMESTICO">Eletrodoméstico</SelectItem>
                                    <SelectItem value="MOVEL">Móvel</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="valorFornecedor">
                    <FormItem>
                        <FormLabel>Valor Fornecedor</FormLabel>
                        <FormControl>
                            <InputGroup>
                                <InputGroupInput type="number" step="any" placeholder="Valor do produto" class="mb-2"
                                    v-bind="componentField" />
                                <InputGroupButton>
                                    <span class="text-xs">R$</span>
                                </InputGroupButton>
                            </InputGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="quantidadeEstoque">
                    <FormItem>
                        <FormLabel>Quantidade Estoque</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="Quantidade do produto" class="mb-2"
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <div class="flex justify-end mt-4">
                    <Button type="submit" :disabled="productStore.loading">
                        <template v-if="productStore.loading">
                            <Spinner />
                            Salvando...
                        </template>
                        <template v-else>
                            Salvar
                        </template>
                    </Button>
                </div>
            </form>
        </SheetContent>
    </Sheet>
</template>