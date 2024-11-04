<template>
  <div class="relative" ref="target">
    <button
      type="button"
      ref="targetToggle"
      class="btn relative z-[2] rounded-3xl bg-white border-slate-100 hover:border-slate-300"
      @click="toggleUserDropdown"
    >
      <span>
        {{ user.name }}
      </span>
      <chevron-down />
    </button>

    <ul
      class="absolute border border-slate-200 rounded-3xl transform transition z-[1] w-full overflow-hidden top-0 p-3 space-y-2 bg-white"
      :style="{
        height: userDropdownActive ? 'auto' : `${targetToggleHeight}px`,
        paddingTop: userDropdownActive ? '50px' : '0',

        // transform: userDropdownActive ? 'translateY(0)' : `translateY(-${targetToggleHeight}px)`
      }"
      :class="{
        'opacity-0': !userDropdownActive,
        'opacty-full': userDropdownActive,
      }"
    >
      <li>
        <a href="#" class="py-2 px-3 block text-sm">
          <span>Go to profile</span>
        </a>
        <a
          class="p-2 rounded-full block text-sm hover:bg-red-200 hover:text-red-500"
          href="#"
          @click.prevent="auth.logout"
          >Logout</a
        >
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { ChevronDown } from "lucide-vue-next";
import { onClickOutside } from "@vueuse/core";

const target = ref();
const targetToggle = ref()
const targetToggleHeight = ref(0)
const auth = useAuthStore();
const userDropdownActive = ref(false);
const toggleUserDropdown = () => {

  //todo: implement dropdown effect properly
  userDropdownActive.value = !userDropdownActive.value;
};

const user = computed(() => auth.user ?? { name: "", email: "" });

onClickOutside(target, () => {
  userDropdownActive.value = false;
});

onMounted(() => {
  if(targetToggle.value){
    targetToggleHeight.value = targetToggle.value.clientHeight
  }
})
</script>
