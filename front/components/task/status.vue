<template>
  <div class="space-x-2 flex items-center" ref="target">
    <button
      v-if="status"
      type="button"
      class="tag inline-flex items-center space-x-2"
      @mouseenter="showNextArrow = true"
      @mouseleave="showNextArrow = false"
      :class="[variant(statusName)]"
      @click="showNext = !showNext"
    >
      <span>
        {{ status.label }}
      </span>

      <template v-if="status.name !== 'completed'">
        <transition name="status">
          <ArrowRight v-if="showNextArrow || showNext" :size="16" class="text-slate-500"/>
        </transition>
      </template>
    </button>
    <template v-if="nextStatus">
      <transition name="status">
        <div v-if="showNext" class="flex items-center space-x-2">
          <button
            type="button"
            class="tag"
            :class="variant(nextStatus.name)"
            @click="updateStatus(nextStatus.name)"
          >
            <span>
              {{ nextStatus.label }}
            </span>
          </button>
        </div>
      </transition>
    </template>
  </div>
</template>
<script lang="ts" setup>
import type { Status, Task, TaskStatus, TaskStatusOptions } from "@/types/task";
import { status as statusTags, StatusEnum } from "@/data/tasks";
import { onClickOutside } from "@vueuse/core";
import { useTasksStore } from "~/store/tasks";
import { ArrowRight } from "lucide-vue-next";

const store = useTasksStore()

const props = withDefaults(
  defineProps<{
    task: Task;
  }>(),
  {}
);

const emit = defineEmits(["update-status"]);
const statusName = computed(() => props.task.status ?? "default");
const status = computed(() => statusTags.find((st)=>st.name === statusName.value))
const nextStatus = computed(() => {
  if (statusName.value === "completed") {
    return null;
  } else {
    let index = statusTags.findIndex((s: Status) => s.name === statusName.value);
    return statusTags[index + 1];
  }
});
const target = ref();
const showNext = ref(false);
const showNextArrow = ref(false);
onClickOutside(target, () => {
  showNext.value = false;
});
const variant = (_status: TaskStatusOptions) => StatusEnum[_status];
const updateStatus = async (_status: TaskStatus) => {
  if (props.task._id) {
    await store.update(props.task._id, {...props.task, status: _status });
    showNext.value = false
    emit('update-status')
  }
};
</script>
<style lang="scss">

// todo: rename this transition to something more generic
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
