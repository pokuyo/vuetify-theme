<template>
  <v-data-table
    :headers="riskGridHeader"
    :items="riskGridItems"
    class="elevation-1"
  >
    <template v-slot:body="{items, headers}">
      <tbody>
        <tr
          v-for="(item, idx) in items"
          :key="idx"
        >
          <td
            v-for="(header, key) in headers"
            :key="key"
          >
            <v-edit-dialog
              :return-value.sync="item[header.value]"
              large
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              {{ item[header.value] }}
              <template v-slot:input>
                <v-text-field
                  v-model="item[header.value]"
                  label="Edit"
                  single-line
                >
                </v-text-field>
              </template>
            </v-edit-dialog>
          </td>
        </tr>
      </tbody>
    </template>
    <!-- [S]v-dailog -->
  </v-data-table>
</template>

<script>
export default {
  props: [
    // eslint-disable-next-line vue/require-prop-types
    'riskGridHeader',
    // eslint-disable-next-line vue/require-prop-types
    'riskGridItems',
  ],
  data() {
    return {
    //   headers: {},
    //   items: {},
    }
  },
  created() {
    this.headers = this.riskGridHeader
    this.items = this.riskGridItems
  },
}
</script>
