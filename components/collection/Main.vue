<template>
    <div class="p-[50px] flex divide-y-2 border-y">Custom Fields List
      <!--Add fields button-->
                 <div class="ml-[56rem]">
            <button class="border py-3 rounded-md shadow-sm text-white-600 text-sm bg-gray-500 px-4"  @click="open=true">
            <PlusIcon class="h-6 w-6"/>
            <p class="ml-3">Add Custom Field</p>
            </button>
        </div>
     
    </div>
    <!--List view-->
    <div class="p-[50px]" v-if="fieldsdata.length">
        <CollectionList :fields="fieldsdata" @deleteAction="deleteField"></CollectionList>
      </div>
      <!--Add custom fields sidebar-->
    <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <div class="fixed inset-0" />


      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl border">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-base font-semibold leading-6 text-gray-900">Custom Fields</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="open = false">
                          <span class="sr-only">Close</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
           <CollectionAdd @saveFields="saveField" @hide="(value)=>open=value"></CollectionAdd>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

let fieldsdata=ref([]) 
const url="https://v1-orm-lib.mars.hipso.cc/api/custom-fields/2?offset=0&limit=100&sort_column=id&sort_direction=desc"
const authHeader = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoiYzI4OGRlNzBjYWYyNDUxODk4ZDRhMGM2N2U0ZmVkZDIiLCJkIjoiMTY4MDA4OSIsInIiOiJzYSIsInAiOiJmcmVlIiwiYSI6ImZpbmRlci5pbyIsImwiOiJ1czEiLCJleHAiOjE2ODMyODExOTV9.gl7Z_P_zA3fGoIH9mulaZF4tcA2vvln4x_dremExFIo",
}
const post_url="https://v1-orm-lib.mars.hipso.cc/api/custom-fields/"
const delete_url="https://v1-orm-lib.mars.hipso.cc/api/custom-fields/"
// Get data using api call
const { pending, data } = useLazyFetch(
  `${url}`,
  { method: "GET", headers: authHeader }
  );
  if(data) fieldsdata=data
const open = ref(false)
// Save custom fields
const saveField = async (template: any) => {
  const staticData = ref({
    project_id: template.projectId,
    name: template.name,
    subject: template.subject,
    type_data: {
    "is_required": 1,
    "show_in_filter": 1,
    "length": 100,
    "description": "string",
    "placeholder": "string"
  },
    type: template.type,
   role_id:template.role_id
  });
  // Post call hits when click on save button
  await useLazyFetch(post_url, {
    method: "POST",
    headers: authHeader,
    body: staticData.value,
  });
  fieldsdata.value.unshift(staticData.value)
}

// Delete call hits when click on delete button
const deleteField=(fielddata: string) => {
  const { data: response } = useLazyFetch(`${delete_url}${fielddata.uid}`, {
    method: "DELETE",
    headers: authHeader,
  });
  if (response) {
    const index = fieldsdata.value.findIndex(
      (template: any) => template.uid === fielddata.uid
    );
    if (index !== -1) {
      fieldsdata.value.splice(index, 1);
    }
  }
}
</script>