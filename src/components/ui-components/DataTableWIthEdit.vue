<template>
  <v-data-table
    :headers="gridHeaders"
    :items="gridItems"
    class="elevation-1"
    :loading="gridLoading"
    loading-text="Loading"
  >
    <!-- noData 처리 필요 -->
    <template v-slot:no-data>
      데이터 없음
    </template>

    <template v-slot:body="{items, headers}">
      <tbody>
        <tr
          v-for="(item, idx) in items"
          :key="idx"
        >
          <td
            v-for="(header, key) in headers"
            :key="key"
            @click="rowClick(header, idx, key)"
          >
            <v-text-field
              v-if="editFlag === true && editRow === idx && editCol === key"
              v-model="item[header.value]"
              :hide-details="true"
              dense
              single-line
              @keydown.enter="close"
            />
            <span v-else>{{ item[header.value] }}</span>
            <!-- <v-edit-dialog
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
            </v-edit-dialog> -->
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
    'gridHeaders',
    // eslint-disable-next-line vue/require-prop-types
    'gridItems',
    // eslint-disable-next-line vue/require-prop-types
    'gridDefaultItems',
    // eslint-disable-next-line vue/require-prop-types
    'loading',
  ],
  data() {
    return {
      // loading: false,
      gridHeaderContainer: {},
      gridItemContainer: {},
      gridItemDefaultSet: {},
      editFlag: false,
      editRow: 0,
      editCol: 0,
      editColumn: '',
    }
  },
  created() {
    this.headers = this.gridHeaders
    this.items = this.gridItems
    this.gridHeaderContainer = this.headers
    this.gridItemContainer = this.items
    this.gridItemDefaultSet = this.gridDefaultItems
    this.gridLoading = this.loading
  },
  methods: {
    // ROW click event
    rowClick(header, idx, key) {
      this.editFlag = true
      this.editRow = idx
      this.editCol = key
      this.editColumn = header.text
      console.log(this.editFlag, this.editIdx, this.editColumn)
    },
    close() {
      this.editColumn = { ...this.gridItemDefaultSet }
    },
  },
}
</script>
