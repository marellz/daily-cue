<template>
  <div>
    <layout-container>
      <h1 class="text-[69px]">Hello</h1>

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
