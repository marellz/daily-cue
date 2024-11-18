<template>
  <div class="relative" ref="target">
    <button
      type="button"
      ref="targetToggle"
      class="nav-link !text-sea-green !inline-flex space-x-1 items-center relative z-[2] rounded-3xl bg-white border-slate-100 hover:border-slate-300"
      @click="toggleUserDropdown"
    >
      <span>
        {{ user.name }}
      </span>
      <chevron-down />
    </button>

    <ul
      class="absolute border border-t-0 border-slate-200 rounded-b-3xl transform -bottom-[5px] transition z-[1] w-full overflow-hidden p-3 space-y-2 bg-white"
      :class="{
        'opacity-0 translate-y-[90%] invisible': !userDropdownActive,
        'opacity-full translate-y-full visible': userDropdownActive,
      }"
    >
      <li>
        <nuxt-link
          to="/user/profile"
          class="py-2 px-4 flex rounded-full text-sm hover:bg-slate-200"
        >
          <span>Go to profile</span>
        </nuxt-link>
        <a
          class="py-2 px-4 rounded-full flex text-sm hover:bg-red-200 hover:text-red-500"
          href="#"
          @click.prevent="logout"
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
const targetToggle = ref();
const targetToggleHeight = ref(0);
const auth = useAuthStore();
const userDropdownActive = ref(false);
const route = useRoute()
const toggleUserDropdown = () => {
  userDropdownActive.value = !userDropdownActive.value;
};

const user = computed(() => auth.user ?? { name: "", email: "" });

const logout = async () => {
  await auth.logout();
  useRouter().push("/");
};

onClickOutside(target, () => {
  userDropdownActive.value = false;
});

watch(() => route.path,() => {
  userDropdownActive.value = false
})

onMounted(() => {
  if (targetToggle.value) {
    targetToggleHeight.value = targetToggle.value.clientHeight;
  }
});
</script>
