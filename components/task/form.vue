<template>
  <div class="space-y-4">
    <form @submit="submit" v-if="form">
      <form-input label="Task title" v-model="form.title" />
      <form-text
        label="Task description"
        :rows="4"
        v-model="form.description"
      />
      <form-group label="Tags">
        <div class="flex flex-wrap gap-3 mt-2">
          <div v-for="tag in tags" :key="tag.id">
            <input
              type="checkbox"
              class="h-0 w-0 absolute"
              :id="`tag-${tag.id}`"
              v-model="form.tags"
              :value="tag.id"
            />
            <label :for="`tag-${tag.id}`">
              <p
                class="inline-flex space-x-2 items-center border rounded-full text-sm py-1 px-2 leading-normal ring-2 ring-transparent ring-offset-2"
                :class="[
                  TagColors[tag.color],
                  {
                    'ring-slate-600': selectedTag(tag.id),
                  },
                ]"
              >
                <span>{{ tag.name }}</span>
                <transtion name="status">
                  <Check v-if="selectedTag(tag.id)" :size="20" />
                </transtion>
              </p>
            </label>
          </div>
        </div>
      </form-group>
      <div class="grid grid-cols-2 gap-4">
        <form-select label="Task status" v-model="form.status">
          <option
            v-for="option in status"
            :value="option.name"
            :key="option.name"
          >
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
      <div class="flex items-center space-x-2 justify-end mt-4">
        <base-button @click="cancel"> <span>Cancel</span></base-button>
        <base-button class="btn-primary" @click="submit">
          <Check />
          <span>Create task</span>
        </base-button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { type Moment } from "moment";
import { type TaskForm } from "~/store/tasks";
import { status } from "~/data/tasks";
import { useTagsStore } from "~/store/tags";
import { Check } from "lucide-vue-next";
import { TagColors } from "~/types/tag";

const tagsStore = useTagsStore();

const emit = defineEmits(["submit", "cancel"]);
const tags = computed(() => tagsStore.tags);

const newTask : TaskForm = {
  tags: [],
  status: "pending",
  title: "",
  due_date: "",
  user_id: "",
};

const props = defineProps<{
  task?: TaskForm;
}>();

const form = ref<TaskForm|null>(null);
const selectedDate = ref<Moment | null>(null);
const selectedTag = (id: string) => form.value?.tags.includes(id);

watch(selectedDate, (v: Moment | null) => {
  if (v && form.value) {
    form.value.due_date = v.toString();
  }
});

const submit = () => {
  emit("submit", form.value);
};

const cancel = () => {
  if (!confirm("Are you sure you wan to cancel? Your changes will be lost.")) {
    return;
  }

  emit("cancel");
};

onMounted(() => {
  if (props.task) {
    form.value = props.task;
  } else {
    form.value = newTask
  }
});
</script>
