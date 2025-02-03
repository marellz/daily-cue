<template>
    <div>
        <form-label v-if="label" :for="id">
           {{ label }}
           <span v-if="required" class="text-error">&ast;</span>
       </form-label>
       <div>
           <input
               class="form-input"
               :class="{'form-input--error': error!== undefined}"
               v-model="model"
               :type
               :id
               :placeholder
               :disabled
               :required
               ref="input"
           />
       </div>
       <form-error class="mt-1" v-if="error">{{ error }}</form-error>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

withDefaults(defineProps<{
    label?: string | undefined;
    error?: string | undefined;
    type?: string | undefined;
    placeholder?: string | undefined;
    disabled?: boolean;
    required?: boolean;
}>(), {
    type: 'text'
})

const id = useId()

const model = defineModel<string|null| undefined>({ required: true });

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (input.value?.hasAttribute('autofocus')) {
        input.value?.focus();
    }
});

defineExpose({ focus: () => input.value?.focus() });
</script>


