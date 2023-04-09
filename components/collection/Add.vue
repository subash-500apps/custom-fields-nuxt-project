<template>
  <div class="row-span-3 col-span-4 bg-white h-[calc(100vh-150px)]">
    <!-- Start of form -->
    <form @submit.prevent="save" @reset.prevent="$emit('hide', false)">
      <div class="mx-2 mt-3">
        <div class="text-center mb-0 rounded-0">
          <div class="flex justify-between items-center">
            <input
              id="name"
              v-model="fields.project_id"
              type="text"
              name="name"
              class="block rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 w-full placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 mt-2"
              placeholder="Project ID"
              required
            />
          </div>
        </div>
      </div>
      <div class="mx-2 mt-3">
        <div class="flex justify-between items-center">
          <input
            v-model="fields.name"
            type="text"
            class="block px-3 rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 w-full"
            placeholder="Name"
            required
          />
        </div>
        <div class="mt-3">
          <input
            v-model="fields.contacts"
            rows="4"
            class="block px-3 rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 w-full"
            placeholder="Contacts"
          />
        </div>
        <div class="mt-3">
          <input
            v-model="fields.type"
            rows="4"
            class="block px-3 rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 w-full"
            placeholder="Type"
          />
        </div>
        <div class="mt-3">
          <input
            v-model="fields.role_id"
            rows="4"
            class="block px-3 rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 w-full"
            placeholder="Role ID"
          />
        </div>
      </div>
      <div class="flex justify-end mr-3 mt-4">
        <button
          type="reset"
          class="border rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mr-3"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-white-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-600"
        >
          {{ fields.uid ? "Update" : "Save" }}
        </button>
      </div>
    </form>
    <!-- End of form -->
  </div>
</template>

<script setup lang="ts">
// Emit events
const emit = defineEmits(["saveFields", "edit", "hide"]);
const fields: any = ref({});
// Save fields
const save = () => {
  emit("hide", false);
  emit(!fields.value.uid ? "saveFields" : "edit", fields.value);
};
</script>
