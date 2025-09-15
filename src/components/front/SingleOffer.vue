<script setup >
import {
  ChatBubbleOvalLeftIcon,
  CheckBadgeIcon,
  CubeIcon,
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/outline";
import { ArrowsRightLeftIcon, CheckIcon } from "@heroicons/vue/24/solid";
import { MapPinIcon } from "@heroicons/vue/24/outline";
import { ClockIcon } from "@heroicons/vue/24/outline";
import MainButton from "./global/MainButton.vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { ChevronUpIcon } from "@heroicons/vue/24/outline";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { StarIcon } from "@heroicons/vue/24/outline";
import { ShieldCheckIcon } from "@heroicons/vue/24/outline";
import { CalendarIcon } from "@heroicons/vue/24/outline";
import { computed, onMounted, ref } from "vue";
import ScondButton from "./ScondButton.vue";
import axiosClient from "../../axiosClient";
import useFormats from "../../mixins/formats";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth/auth";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const { getRelativeTime } = useFormats();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}
const isSendRequest = computed(() => {
  return props.item.myResponse ? true : false;
});

const requestStatus = computed(() => {
  const status = props.item.myResponse?.status;
  return status == "accepted"
    ? {
        text: "مقبول",
        parent_style:
          "bg-green-50 border border-green-100 p-4 dark:bg-green-800 dark:border-green-700",
        label_style: "text-green-800 dark:text-white",
        text_style: "text-green-600 dark:text-green-300",
      }
    : status == "rejected"
    ? {
        text: "تم رفضه",
        parent_style:
          "bg-red-50 border border-red-100 p-4 dark:bg-red-800 dark:border-red-700",
        label_style: "text-red-800 dark:text-white",
        text_style: "text-red-600 dark:text-red-300",
      }
    : {
        text: "معلق",
        parent_style:
          "bg-orange-50 border border-orange-100 p-4 dark:bg-orange-800 dark:border-orange-700",
        label_style: "text-orange-800 dark:text-white",
        text_style: "text-orange-600 dark:text-orange-300",
      };
});
</script>

<template>
  <div
    class="single-offer p-4 bg-white dark:bg-gray-800 rounded-[10px] hover:shadow-md border border-gray-300 transition relative my-4 last-of-type:mb-0"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="info flex items-center gap-2">
        <div
          class="icon bg-gray-100 dark:bg-gray-700 h-10 w-10 flex items-center justify-center rounded-full"
        >
          <UserIcon class="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </div>
        <div class="">
          <span class="font-[500] flex">
            <span class="text-gray-800 dark:text-white">{{
              item.user.name
            }}</span>
            <span
              class="text-[11px] border border-gray-200 dark:border-green-600 py-1.5 px-3 rounded-full flex items-center gap-1 ml-2 w-fit justify-center mr-2"
            >
              <CheckIcon class="w-3 h-3 text-gray-600 dark:text-green-600" />
              <span class="text-gray-600 dark:text-green-600">موثوق</span>
            </span>
          </span>
          <div
            class="degree text-gray-400 dark:text-gray-300 text-[12px] font-[500] mt-1"
          >
            درجة الموثوقية 80%
          </div>
        </div>
      </div>
      <div
        class="text-white bg-red-600 dark:bg-red-500 rounded-md w-12 h-6 px-7 flex items-center justify-center"
      >
        <span class="font-[500] text-[10px] leading-none">عاجل</span>
      </div>
    </div>

    <div
      class="flex items-center justify-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
    >
      <div class="flex flex-col items-center">
        <span class="font-[400] text-[14px] text-gray-500 dark:text-gray-300"
          >يعرض</span
        >
        <span class="text-green-600 dark:text-green-400 font-[400]">{{
          item.offer_item
        }}</span>
      </div>
      <ArrowsRightLeftIcon class="w-5 h-5 text-gray-600 dark:text-gray-300" />
      <div class="flex flex-col items-center">
        <span class="font-[400] text-[14px] text-gray-500 dark:text-gray-300"
          >يريد</span
        >
        <span class="text-blue-600 dark:text-blue-400 font-[400]">{{
          item.request_item
        }}</span>
      </div>
    </div>
    <div class="text-[14px] text-gray-600 dark:text-gray-300 font-[400] mt-4">
      <div class="message">{{ item.description }}</div>
      <div class="location flex items-center justify-between mt-2">
        <div>
          <MapPinIcon
            class="w-4 h-4 text-gray-600 dark:text-gray-300 inline-block"
          />
          <span
            class="inline-block mr-1 text-[12px] text-gray-500 dark:text-gray-400"
            >{{ item.location }}</span
          >
        </div>
        <span class="time flex items-center gap-1">
          <ClockIcon
            class="w-4 h-4 text-gray-600 dark:text-gray-300 inline-block"
          />
          <span
            class="inline-block mr-1 text-[12px] text-gray-500 dark:text-gray-400"
            >{{ getRelativeTime(item.created_at) }}</span
          >
        </span>
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-4">
      <div class="flex items-center gap-2">
        <button
          @click="toggle"
          class="flex-1 flex items-center justify-center p-2 border rounded-lg text-[14px] transition-all border-gray-300 bg-white text-black hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          <span class="font-[500]">تفاصيل اكثر</span>
          <ChevronDownIcon
            :class="isOpen ? 'rotate-180 transform' : ''"
            class="w-4 h-4 mr-2 mt-[2px] transition-transform text-black dark:text-white"
          />
        </button>

        <MainButton
          class="text-[14px] flex-1"
          label="بدا المحادثة"
          @click="$emit('startChat', item.user)"
        />
      </div>

      <div v-show="isOpen" class="p-2 text-gray-600 w-full transition-all">
        <div
          class="info-user bg-blue-50 border border-blue-100 p-4 rounded-lg dark:bg-blue-900/20 dark:border-blue-700"
        >
          <div class="flex items-center gap-2 mb-4">
            <UserIcon class="w-4 h-4 text-blue-900 dark:text-blue-400" />
            <span
              class="font-[500] text-blue-900 text-[16px] dark:text-blue-300"
            >
              معلومات المستخدم
            </span>
          </div>
          <div class="flex flex-col gap-3">
            <div
              class="flex items-start sm:items-center flex-col sm:flex-row gap-2 justify-between"
            >
              <div class="flex flex-1 gap-2 items-center">
                <span class="flex items-center gap-1">
                  <span class="icon flex items-center">
                    <StarIcon
                      class="w-4 h-4 inline-block text-amber-600 dark:text-amber-400"
                    />
                  </span>
                  <span
                    class="text-gray-500 text-[14px] font-[400] dark:text-gray-400"
                  >
                    التقييم:
                  </span>
                </span>
                <span
                  class="value text-black font-[400] text-[14px] dark:text-white"
                >
                  <span class="rate ml-1">4.8/5</span>
                  <span class="opration"
                    >({{ item.batar_count ?? 0 }} عملية)</span
                  >
                </span>
              </div>
              <div class="flex flex-1">
                <span class="flex items-center gap-1">
                  <span class="icon flex items-center">
                    <CalendarIcon
                      class="w-[14px] h-[14px] text-blue-700 dark:text-blue-400 inline-block"
                    />
                  </span>
                  <span
                    class="text-gray-500 text-[14px] font-[400] dark:text-gray-400"
                  >
                    عضو
                    {{
                      getRelativeTime(item.user.created_at).replace(
                        "قبل",
                        "منذ"
                      )
                    }}
                  </span>
                </span>
              </div>
            </div>
            <div
              class="flex items-start sm:items-center flex-col sm:flex-row gap-2 justify-start"
            >
              <div class="flex flex-1 gap-2 items-center">
                <span class="flex items-center gap-1">
                  <span class="icon flex items-center">
                    <ChatBubbleOvalLeftIcon
                      class="w-[14px] h-[14px] text-green-700 dark:text-green-400 inline-block"
                    />
                  </span>
                  <span
                    class="text-gray-500 text-[14px] font-[400] dark:text-gray-400"
                  >
                    التواصل:
                  </span>
                </span>
                <span
                  class="value text-black font-[400] text-[14px] dark:text-white"
                >
                  {{ item.contact_method ?? "غير معروف" }}
                </span>
              </div>
              <div class="flex flex-1 gap-2 items-center">
                <span class="flex items-center gap-1">
                  <span class="icon flex items-center">
                    <ShieldCheckIcon
                      class="w-[15px] h-[15px] text-green-700 dark:text-green-400 inline-block"
                    />
                  </span>
                  <span
                    class="text-gray-500 text-[14px] font-[400] dark:text-gray-400"
                  >
                    درجةالثقة:
                  </span>
                </span>
                <span
                  class="value text-green-700 font-[400] text-[14px] dark:text-green-400"
                >
                  87%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="cart-details bg-green-50 border border-green-100 p-4 rounded-lg mt-4 dark:bg-green-900/20 dark:border-green-700"
        >
          <div class="flex items-center gap-2 mb-4">
            <CubeIcon class="w-4 h-4 text-green-900 dark:text-green-400" />
            <span
              class="font-[500] text-green-900 text-[16px] dark:text-green-300"
            >
              تفاصيل السة المعروضة
            </span>
          </div>
          <div>
            <div
              class="jsutify-between mb-2 flex items-start sm:items-center flex-col sm:flex-row gap-2"
            >
              <div class="flex-1">
                <span
                  class="text-gray-500 text-[14px] font-[400] block dark:text-gray-400"
                  >الحالة:</span
                >
                <span
                  class="text-green-700 text-[14px] font-[500] block dark:text-green-300"
                  >{{ item.offer_status ?? "غير معروف" }}</span
                >
              </div>
              <div class="flex-1">
                <span
                  class="text-gray-500 text-[14px] font-[400] block dark:text-gray-400"
                  >الكمية:</span
                >
                <span
                  class="text-green-700 text-[14px] font-[500] block dark:text-green-300"
                  >{{ item.quantity ?? "غير معروف" }}</span
                >
              </div>
            </div>
            <div class="flex items-center jsutify-between mb-2">
              <div class="flex-1">
                <span
                  class="text-gray-500 text-[14px] font-[400] block dark:text-gray-400"
                  >التوفر:</span
                >
                <span
                  class="text-green-700 text-[14px] font-[500] block dark:text-green-300"
                  >{{ item.availability ?? "غير معروف" }}</span
                >
              </div>
            </div>
            <div class="flex items-center jsutify-between">
              <div class="flex-1">
                <span
                  class="text-gray-500 text-[14px] font-[400] block dark:text-gray-400"
                  >تفضيلات التبادل:</span
                >
                <span
                  class="text-green-700 text-[14px] font-[500] block dark:text-green-300"
                  >{{ item.exchange_preferences ?? "غير معروف" }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <div
          class="cart-details bg-gray-50 border border-gray-100 p-4 rounded-lg mt-4 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="font-[500] text-dark text-[16px] dark:text-white"
              >وصف مفصل</span
            >
          </div>
          <div class="text-gray-500 text-[14px] font-[400] dark:text-gray-300">
            <p>
              {{ item.description }}
            </p>
          </div>
        </div>
        <div
          class="cart-details bg-blue-50 border border-blue-100 p-4 rounded-lg mt-4 dark:bg-blue-800 dark:border-blue-700"
          v-if="user.id == item.user_id"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="font-[500] text-green-800 text-[16px] dark:text-white"
              >المستخدمين المستعدون لقبول عملية التبادل</span
            >
          </div>
          <div class="text-gray-500 text-[14px] font-[400] dark:text-gray-300">
            <ul class="mt-4">
              <li class="grid grid-cols-3 mb-3 text-green-700 font-[500]">
                <span>اسم المستخدم</span>
                <span>تاريخ ارسال الطلب</span>
                <span class="text-center">الاجراء</span>
              </li>
              <li>
                <ul v-for="response in item.sentResponses" :key="response.id">
                  <li
                    class="grid grid-cols-3 border-b last-of-type:border-none border-b-gray-200 gap-3"
                  >
                    <span class="">{{ response.user.name }}</span>
                    <span>
                      {{
                        getRelativeTime(response.created_at).replace(
                          "قبل",
                          "منذ"
                        )
                      }}</span
                    >
                    <span class="flex justify-center">
                      <template v-if="!item.accepted_by">
                        <span
                          @click="$emit('acceptUser', response)"
                          class="border-2 border-green-600 text-sm rounded-lg cursor-pointer px-4 py-1 text-green-600 font-[400] flex justify-center items-center transition-colors hover:text-white hover:bg-green-600"
                          >قبول</span
                        >
                      </template>
                      <template v-else>
                        <span
                          v-if="response.user_id == item.accepted_by"
                          class="border-2 border-green-600 text-sm rounded-full cursor-default px-4 py-1 gap-1 bg-green-600 text-white font-[400] flex justify-center items-center"
                        >
                          <CheckIcon class="w-[18px]" />
                          <span>تم قبوله</span>
                        </span>
                        <span
                          v-else
                          class="border-2 border-red-600 text-sm rounded-full cursor-default px-4 py-1 gap-1 bg-red-600 text-white font-[400] flex justify-center items-center"
                        >
                          <XMarkIcon class="w-[18px]" />
                          <span>تم رفضه</span>
                        </span>
                      </template>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="cart-details border p-4 rounded-lg mt-4"
          :class="requestStatus.parent_style"
          v-if="isSendRequest"
        >
          <div class="flex items-center gap-2 mb-3">
            <span
              class="font-[500] text-dark text-[16px]"
              :class="requestStatus.label_style"
              >حالة طلبك</span
            >
          </div>
          <div class="text-[14px] font-[400]" :class="requestStatus.text_style">
            <p>
              {{ requestStatus.text }}
            </p>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2"
        >
          <template v-if="user && user.id !== item.user_id">
            <ScondButton
              title="رسالة سريعة"
              class="text-gray-600 hover:bg-gray-200 hover:text-black border-gray-300"
              @click="$emit('startChat', item.user)"
            >
              <template #icon>
                <ChatBubbleOvalLeftIcon class="w-4 h-4" />
              </template>
            </ScondButton>
            <ScondButton
              v-if="!isSendRequest"
              title="ارسال طلب لقبول عملة المبادلة"
              class="text-green-600 hover:bg-green-600 hover:text-white border-green-600"
              @click="$emit('sendAcceptResponse', item)"
            >
              <template #icon>
                <PaperAirplaneIcon class="w-4 h-4" />
              </template>
            </ScondButton>
          </template>
          <template v-else>
            <ScondButton
              v-if="item.accepted_by"
              title="تم اكتمام العملية"
              class="text-green-600 hover:bg-green-600 hover:text-white border-green-600"
              @click="$emit('markAsComplete', item.id)"
            >
              <template #icon>
                <CheckBadgeIcon class="w-5 h-5" />
              </template>
            </ScondButton>
            <ScondButton
              title="تعديل العرض"
              @click="$emit('edit', item)"
              class="text-blue-600 hover:bg-blue-600 hover:text-white border-blue-600"
            >
              <template #icon>
                <PencilIcon class="w-4 h-4" />
              </template>
            </ScondButton>
            <ScondButton
              title="حذف العرض"
              class="text-red-600 hover:bg-red-600 hover:text-white border-red-600"
              @click="$emit('delete', item.id)"
            >
              <template #icon>
                <TrashIcon class="w-4 h-4" />
              </template>
            </ScondButton>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

