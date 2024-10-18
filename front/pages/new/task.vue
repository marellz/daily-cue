<template>
  <layout-container>
    <div>
      <page-title>Create a task</page-title>

      <form @submit.prevent="createTask">
        <div class="space-y-4 gap-10">
          <div class="flex space-x-2 items-center">
            <nuxt-link to="/tasks">
                <button class="btn">Cancel</button>
            </nuxt-link>
            <button class="btn">Save Task</button>
          </div>
        </div>
      </form>
    </div>
  </layout-container>
</template>
<script lang="ts" setup>
const createTask = () => {};
</script>
