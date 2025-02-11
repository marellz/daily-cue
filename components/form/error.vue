<template>
    <p class="text-sm text-red-600">
        <slot>
            {{ message }}
        </slot>
    </p>
</template>
<script setup lang="ts">
defineProps<{
    message?: string;
}>();
</script>
