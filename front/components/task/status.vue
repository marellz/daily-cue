<template>
  <div class="space-x-3" ref="target">
    <button
      type="button"
      class="tag"
      :class="[variant(status)]"
      @click="showNext = !showNext"
    >
      <span>
        {{ status }}
      </span>
    </button>
    <template v-if="nextStatus">
      <transition name="status" mode="out-in">
        <button
          v-if="showNext"
          type="button"
          class="tag"
          :class="[variant(nextStatus.name)]"
          @click="updateStatus(nextStatus.name)"
        >
          <span>
            {{ nextStatus.name }}
          </span>
        </button>
      </transition>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { type Status, type Task, type TaskStatus } from "@/types/task";
import { status as statusTags } from "@/data/tasks";
import { onClickOutside } from "@vueuse/core";
import { useTasksStore } from "~/store/tasks";
const store = useTasksStore()
enum StatusEnum {
  default = "bg-slate-200 text-gray-500",
  completed = "bg-green-100 text-green-500",
  in_progress = "bg-blue-100 text-blue-500",
  pending = "bg-amber-100 text-amber-500",
  overdue = "bg-red-100 text-red-500",
}

const props = withDefaults(
  defineProps<{
    task: Task;
  }>(),
  {}
);

const emit = defineEmits(["update-status"]);
const status = computed(() => props.task.status ?? "default");
const nextStatus = computed(() => {
  if (status.value === "completed") {
    return null;
  } else {
    let index = statusTags.findIndex((s: Status) => s.name === status.value);
    return statusTags[index + 1];
  }
});
const target = ref();
const showNext = ref(false);
onClickOutside(target, () => {
  showNext.value = false;
});
const variant = (_status: TaskStatus) => StatusEnum[_status];
const updateStatus = async (status: TaskStatus) => {
  if (props.task._id) {
    await store.update(props.task._id, {...props.task, status });
    showNext.value = false
  }
};
</script>
<style lang="scss">
.status-enter-from,
.status-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.status-enter-to,
.status-leave-from {
  opacity: 1;
  transform: translateX(4px);
}

.status-leave-active,
.status-enter-active {
  transition: all 0.15s ease;
}
</style>
