<template>
    <div class="relative">
        <client-only>
            <button type="button" class="btn" @click="active = !active">
                <span>{{ selectedTime }}</span>
                <Clock :size="16" />
            </button>
        </client-only>
        <div v-show="active" class="card bg-white mt-2 absolute z-10">
            <div class="flex font-monospace h-20">
                <perfect-scrollbar>
                    <ul>
                        <li v-for="hour in times.hours">
                            <button type="button" class="time-btn" @click="setHour(hour)">
                                {{ hour }}
                            </button>
                        </li>
                    </ul>
                </perfect-scrollbar>
                <perfect-scrollbar>
                    <ul>
                        <li v-for="minutes in times.minutes">
                            <button type="button" class="time-btn" @click="setMinutes(minutes)">
                                {{ minutes }}
                            </button>
                        </li>
                    </ul>
                </perfect-scrollbar>
                <perfect-scrollbar>
                    <ul>
                        <li v-for="mer in times.meridiem">
                            <button type="button" class="time-btn" @click="setMeridiem(mer)">{{ mer }}</button>
                        </li>
                    </ul>
                </perfect-scrollbar>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import useMoment from '~/composables/useMoment';
const moment = useMoment()
const model = defineModel()
const active = ref(true)
const selectedTime = computed(() => model.value.format('HH:mm A'))
const times = computed(() => {
    let hours = Array(12).fill(0).map((h, i) => {
        let hour = i === 0 ? 12 : i
        return hour < 10 ? `0${hour}` : hour
    })
    let minutes = ['00', '15', '30', '45']
    let meridiem = ['AM', 'PM']
    return {
        hours,
        minutes,
        meridiem,
    }
})

const setHour = (v: number) => {
    model.value.hours(v)
}
const setMinutes = (v: string) => {

}
const setMeridiem = (v: string) => {

}

onMounted(() => {
    if (!model.value) {
        model.value = moment()
    }
})
</script>
<style lang="scss">
.time-btn {
    @apply p-1
}

ul {
    @apply border-l first:border-l-0 px-2
}
</style>