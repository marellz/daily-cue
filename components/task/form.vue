<template>
  <div class="space-y-4">
    <form-input label="Task title" v-model="form.title" />
    <form-text label="Task description" :rows="4" v-model="form.description" />
    <form-group label="Tags">
      <div class="flex flex-wrap gap-3 mt-2">
        <div v-for="tag in tags" :key="tag._id">
          <input type="checkbox" class="h-0 w-0 absolute" :id="`tag-${tag._id}`" v-model="form.tags" :value="tag._id" />
          <label :for="`tag-${tag._id}`">
            <p class="inline-flex space-x-2 items-center border rounded-full text-sm py-1 px-2 leading-normal ring-2 ring-transparent ring-offset-2"
              :class="[TagColors[tag.color], {
                'ring-slate-600': selectedTag(tag._id)
              }]">
              <span>{{ tag.name }}</span>
              <transtion name="status">
                <Check v-if="selectedTag(tag._id)" :size="20" />
              </transtion>
            </p>
          </label>
        </div>
      </div>
    </form-group>
    <div class="grid grid-cols-2 gap-4">
      <form-select label="Task status" v-model="form.status">
        <option v-for="option in status" :value="option.name" :key="option.name">
          {{ option.label }}
        </option>
      </form-select>
      <form-group v-if="form.status !== 'completed'" label="Due date">
        <div class="space-y-2">
          <form-datepicker v-model="form.due_date" disable-older />
          <form-timepicker v-model="form.due_date" />
        </div>
      </form-group>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type Moment } from "moment";
import { type TaskForm } from "~/types/task";
import { newTask, status } from "~/data/tasks";
import { useTagsStore } from "~/store/tags";
import { Check } from "lucide-vue-next";
import { TagColors } from "~/types/tag";

const emit = defineEmits(["submit"]);

const tagsStore = useTagsStore()

const tags = computed(() => tagsStore.tags)

const props = defineProps<{
  task?: TaskForm;
}>();

const selectedDate = ref<Moment | null>(null);

const form = defineModel<TaskForm>({ default: newTask });

const selectedTag = (id: string) => form.value.tags.includes(id)

watch(selectedDate, (v: Moment | null) => {
  if (v) {
    form.value.due_date = v.toDate();
  }
});

onMounted(() => {
  if (props.task) {
    form.value = props.task;
  }
});
</script>
