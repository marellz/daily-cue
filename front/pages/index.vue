<template>
  <div>
    <layout-container>
      <h1 class="text-[69px] font-bold">Hello stranger!</h1>
        <h1 class="text-[39px] text-gray-800 font-light">Welcome to DailyCue</h1>

      {{ tasks }}

      
    </layout-container>
  </div>
</template>
<script lang="ts" setup>
// import{ type Axios} from 'axios'
const tasks = ref([]);
const { $api } = useNuxtApp();
onMounted(async () => {
  const { items } = await $api.get("/tasks");
  tasks.value = items
});
</script>
