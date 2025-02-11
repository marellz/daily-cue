<template>
    <div>
        <form-label v-if="label" :for="id">
           {{ label }}
            <span v-if="required" class="text-error">&ast;</span>
       </form-label>
       <div>
           <textarea
               class="form-input"
               :class="{'form-input--error': error!== undefined}"
               v-model="model"
               :id
               :resize
               :disabled
               :required
               :placeholder
               :rows
               ref="input"
           ></textarea>
       </div>
       <form-error class="mt-1" v-if="error">{{ error }}</form-error>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

withDefaults(defineProps<{
    label?: string | undefined;
    error?: string | undefined;
    type?: string | undefined
    placeholder?: string | undefined
    resize?: boolean;
    required?: boolean;
    disabled?: boolean;
    rows?: number | string
}>(), {
    type: 'text'
})

const id = useId()

const model = defineModel<string|null|undefined>({ required: true });

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (input.value?.hasAttribute('autofocus')) {
        input.value?.focus();
    }
});

defineExpose({ focus: () => input.value?.focus() });
</script>


