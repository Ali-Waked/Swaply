<script setup>
import ButtonGroup from "../../components/front/global/ButtonGroup.vue";
import HeaderTitle from "../../components/front/global/HeaderTitle.vue";
import MainButton from "../../components/front/global/MainButton.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import WoringAlert from "../../components/front/global/WoringAlert.vue";
import { inject, onMounted, reactive, ref, watch } from "vue";
import TradeDialog from "../../components/front/TradeDialog.vue";
import SingleOffer from "../../components/front/SingleOffer.vue";
import ChatApp from "../../components/front/ChatApp.vue";
import ChatSidebar from "../../components/front/ChatSidebar.vue";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/vue/24/outline";
import HeaderPage from "../../components/front/global/HeaderPage.vue";
import LogoSection from "../../components/front/global/LogoSection.vue";
import useFormats from "../../mixins/formats";
import axiosClient from "../../axiosClient";
import ConfirmDeleteDialog from "../../components/dashboard/global/ConfirmDeleteDialog.vue";
import { reach } from "yup";

const isDialogOpen = ref(false);
const isOpenChat = ref(false);
const emitter = inject("emitter");
const numberOfUnRedChat = ref(0);
const chat = reactive({
  isOpen: false,
  with: {},
  is_user: false,
});
const startChat = (data) => {
  chat.isOpen = true;
  chat.with = data;
  chat.is_user = true;
};
const dialog = ref(false);
watch(
  () => isDialogOpen.value,
  (newVal) => {
    if (newVal) {
      emitter.emit("hiddenButton", true);
      return;
    }
    emitter.emit("hiddenButton", false);
  }
);
const chatWith = (data) => {
  dialog.value = false;
  chat.isOpen = true;
  chat.with = data;
  chat.is_user = false;
};
const loading = ref(false);
const deleteDialog = reactive({
  dialog: false,
  data: [],
});
const data = ref([]);
const editData = ref({});

const edit = (item) => {
  editData.value = item;
  isDialogOpen.value = true;
};
watch(
  () => isDialogOpen.value,
  (newVal) => {
    if (!newVal) {
      editData.value = {};
    }
  }
);

const confirmDelete = (id) => {
  deleteDialog.dialog = true;
  deleteDialog.data = id;
};

const confirm = async () => {
  try {
    const response = await axiosClient.delete(`barters/${deleteDialog.data}`);
    if (response.status == 200) {
      emitter.emit("showNotificationAlert", ["success", "تم حذف العرض ينجاح!"]);
      data.value.data = data.value.data.filter(
        (el) => el.id !== deleteDialog.data
      );
    }
  } catch (e) {
    // console.error(e);
  }
};
const acceptDialog = reactive({
  dialog: false,
  data: {},
});
const showAcceptDialog = (data) => {
  acceptDialog.dialog = true;
  acceptDialog.data = data;
};
const acceptBarter = async () => {
  try {
    const response = await axiosClient.post(
      `/barters/${acceptDialog.data.id}/respond`
    );
    if (response.status == 200) {
      emitter.emit("showNotificationAlert", [
        "success",
        "تم ارسال طلبك ينجاح!",
      ]);
      await fetchBarters();
    }
  } catch (e) {
    // console.log(e);
  }
};
const acceptUserDialog = reactive({
  dialog: false,
  data: {},
});
const showConfirmAcceptUserDialog = (data) => {
  // console.log(data);
  acceptUserDialog.dialog = true;
  acceptUserDialog.data = data;
};
const acceptUser = async () => {
  // console.log("accept");
  try {
    const response = await axiosClient.post(
      `/barters/${acceptUserDialog.data.barter_id}/respond/${acceptUserDialog.data.id}`
    );
    if (response.status == 200) {
      emitter.emit("showNotificationAlert", [
        "success",
        "تم قبول هذا المستخدم لعميلة التبادل!",
      ]);
      await fetchBarters();
    }
  } catch (e) {
    // console.log(e);
  }
};
const completedBarter = async (barterId) => {
  try {
    loading.value = true;
    const response = await axiosClient.put(
      `/barters/${barterId}/mark-as-completed`
    );
    if (response.status == 200) {
      emitter.emit("showNotificationAlert", [
        "success",
        "تم انهاء هذه المقايضة بنجاح!",
      ]);
      data.value.data = data.value.data.filter((el) => el.id !== barterId);
    }
  } catch (e) {
    // console.error(e);
  } finally {
    loading.value = false;
  }
};
const fetchBarters = async () => {
  try {
    loading.value = true;
    const response = await axiosClient.get("/barters");
    if (response.status == 200) {
      data.value = response.data.barters;
    }
  } catch (e) {
    // console.error(e);
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  await fetchBarters();
});
</script>

<template>
  <div class="min-h-screen">
    <HeaderPage>
      <LogoSection />
    </HeaderPage>
    <HeaderTitle
      title="لوحة المقايضة"
      subtitle="تبادل السلع و الخدمات مع المجتمع"
    />
    <MainButton
      class="mt-4 py-4"
      label="اعرض مقايضة جديدة"
      @click="isDialogOpen = true"
    >
      <template #icon>
        <PlusIcon class="h-5 w-5" />
      </template>
    </MainButton>
    <WoringAlert
      class="my-4"
      title="تنبيه أمني"
      text="تاكد من لقاء الاشخاص في اماكن امنة. وتحقق من هوية الشخص و درجة الثقة قبل التبادل"
    />
    <TradeDialog
      :model-value="isDialogOpen"
      @update:modelValue="(val) => (isDialogOpen = val)"
      :editData="editData"
    />
    <div class="offers">
      <div class="flex justify-between items-center">
        <h5 class="title font-[500] text-[20px] text-black dark:text-white">
          العروض المتاحة
        </h5>
        <div
          class="message-icon relative left-4 cursor-pointer text-white bg-gray-600 flex items-center justify-center w-10 h-10 rounded-full font-bold"
          @click="dialog = true"
        >
          <button>
            <ChatBubbleLeftEllipsisIcon class="w-6" />
          </button>
          <span
            v-if="numberOfUnRedChat"
            class="text-white bg-red-600 text-[9px] w-5 h-5 rounded-full absolute -top-[7px] -right-2 flex justify-center items-center text-center p-1 text-wrap"
            >{{ numberOfUnRedChat }}</span
          >
        </div>
      </div>

      <div class="offers-list pb-8">
        <template v-if="data?.data?.length">
          <template v-for="item in data.data" :key="item.id">
            <SingleOffer
              :item="item"
              @startChat="startChat($event)"
              @delete="confirmDelete($event)"
              @edit="edit($event)"
              @send-accept-response="showAcceptDialog($event)"
              @accept-user="showConfirmAcceptUserDialog($event)"
              @mark-as-complete="completedBarter($event)"
            />
          </template>
        </template>
        <template v-else>
          <p
            class="text-gray-700 text-center  text-sm mt-12 dark:text-gray-300"
          >
            لا يوجد حتى الان اي عروض للمقايضة. قم باضافة عرضك الخاص بك
          </p>
        </template>
      </div>
    </div>
    <ChatApp
      v-model:is-open="chat.isOpen"
      v-model:with="chat.with"
      v-model:is-user="chat.is_user"
    />
    <ChatSidebar
      v-model="dialog"
      @chatWith="chatWith($event)"
      v-model:numberOfUnRedChat="numberOfUnRedChat"
    />

    <ConfirmDeleteDialog
      v-model="deleteDialog.dialog"
      title="حدف العرض"
      message="هل انت متاكد من حذف هذا العرض؟"
      button-label="حذف العرض"
      @confirm="confirm"
    />
    <ConfirmDeleteDialog
      v-model="acceptDialog.dialog"
      title="قبول عملة التبادل"
      message="هل انت متاكد من ارسال طلب لقبول هذه المقايضة؟"
      button-label="قبول"
      @confirm="acceptBarter"
    />
    <ConfirmDeleteDialog
      v-model="acceptUserDialog.dialog"
      title="الموافقة على عملية التبادل"
      message="هل انت متاكد على ارسال رد الموافقة على عملية التبادل هذه؟ عند ارسال رد الموافقة لن تتمكن من تغيير الشخص."
      button-label="ارسال"
      @confirm="acceptUser"
    />
  </div>
</template>

<style lang="scss" scoped>
// .message-icon {
//   &:hover {
//     span {
//       display: block;
//     }
//   }
// }
</style>
