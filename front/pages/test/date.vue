<template>
    <layout-container>
        <div class="flex items-start space-x-3">
            <form-datepicker v-model="filter.date" />
            <form-timepicker v-model="filter.time" />
        </div>

        <div class="p-5">
            {{ anotherDate.format('Do MMM YYYY') }}
        </div>

        <div class="p-4">
            {{ filter.date }}
        </div>

    </layout-container>
</template>

<script lang="ts" setup>
import useMoment from '~/composables/useMoment';

const moment = useMoment()

const anotherDate = computed(() => moment().subtract(3, 'days'))

const filter = ref({
    date: anotherDate.value
})
</script>