<template>
  <div class="overflow-auto">
    <!--Fields data-->
    <table class="shadow-2xl border-2 border-gray-800 w-full">
      <thead class="bg-blue-600 text-white text-left">
        <tr>
          <th class="py-3">Role ID</th>
          <th class="py-3">Name</th>
          <th class="py-3">Type</th>
          <th class="py-3">Description</th>
          <th class="py-3">placeholder</th>
          <th class="py-3">Delete Fields</th>
        </tr>
      </thead>
          <tbody class="divide-y divide-gray-800">
        <tr
          v-for="(field, index) in fields"
          :key="index"
          class="text-left cursor-pointer"
        >
          <td class="py-3 pr-6 whitespace-nowrap">
            <span class="focus:border-purple-500" cols="10" rows="1">{{
              field.role_id
            }}</span>
          </td>
          <td class="py-3 pr-6 whitespace-nowrap">
            <span class="focus:border-purple-500" cols="10" rows="1">{{
              field.name
            }}</span>
          </td>
          <td class="py-3 pr-6 whitespace-nowrap">
            <span class="focus:border-purple-500" cols="10" rows="1">{{
              field.type
            }}</span>
          </td>
          <td class="py-3 pr-6 whitespace-nowrap">
            <span class="focus:border-purple-500" cols="10" rows="1">{{
              field.type_data.description
            }}</span>
          </td>
          <td class="py-3 pr-6 whitespace-nowrap">
            <span class="focus:border-purple-500" cols="10" rows="1">{{
              field.type_data.placeholder
            }}</span>
          </td>
          <td class="py-3 pr-6 whitespace-nowrap">
            <CollectionDelete @emitData="emitDeleteData(field)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
interface Templates {
  fields: Array<[{}]>;
}
// Define Emits
const emits = defineEmits(["deleteAction"]);
// Define props
const props = withDefaults(defineProps<Templates>(), {
  fields: () => {
    return [];
  },
});
// Emit action for delete
const emitDeleteData = (field: any) => {
  emits("deleteAction", field);
};
</script>
