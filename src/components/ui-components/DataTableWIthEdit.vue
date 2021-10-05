<template>
  <v-flex>
    <v-data-table
      :headers="gridHeaders"
      :items="gridItems"
      class="elevation-1"
      :page.sync="page"
      :loading="gridLoading"
      hide-default-footer
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      @addRow="addDataRow"
    >
      <template v-slot:body="{items, headers}">
        <tbody v-if="items.length > 0">
          <tr
            v-for="(item, idx) in items"
            :key="idx"
          >
            <td
              v-for="(header, key) in headers"
              :key="key"
              @click="rowClick(header, idx, key)"
            >
              <template v-if="editFlag === true && editRow === idx && editCol === key">
                <v-select
                  v-if="header.dropdown"
                  v-model="item[header.value]"
                  :items="header.dropitems"
                >
                </v-select>
                <v-text-field
                  v-else
                  v-model="item[header.value]"
                  :hide-details="true"
                  dense
                  single-line
                  @keydown.enter="close"
                />
              </template>
              <span v-else>{{ item[header.value] }}</span>
            </td>
          </tr>
        </tbody>
        <!-- nodata -->
        <tbody v-else>
          <tr>
            <td
              :colspan="headers.length"
              align="center"
            >
              {{ noResult }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <!-- [S]pagination -->
    <div
      class="text-xs-center pt-2"
    >
      <v-pagination
        v-model="page"
        :length="pageCount"
        circle
        @input="pageChangeHandle"
      ></v-pagination>
    </div>
    <!-- [E]pagination -->
  </v-flex>
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

      page: 1,
      pageCount: 0,
      itemsPerPage: 10,

      editFlag: false,
      editRow: 0,
      editCol: 0,
      editColumn: '',

      noResult: '데이터가 존재하지 않습니다.',
    }
  },

  created() {
    // grid header
    this.headers = this.gridHeaders
    this.gridHeaderContainer = this.headers

    // grid load data
    this.items = this.gridItems
    this.gridItemContainer = this.items

    // this.gridItemDefaultSet = this.gridDefaultItems // default items set

    // loading indicator
    this.gridLoading = this.loading
  },

  // method
  methods: {
    // ROW click event
    rowClick(header, idx, key) {
      console.log('row click event')
      this.editFlag = true
      this.editRow = idx
      this.editCol = key
      this.editColumn = header.text
      console.log(this.editFlag, this.editIdx, this.editColumn)
      this.addRow()
    },
    close() {
      this.editColumn = { ...this.gridItemDefaultSet }
    },
    testmethod() {
      console.log('testmethod')
    },

    pageChangeHandle(page) {
      console.log('page', page)
    },

    setTest() {
      console.log('test')
    },

    addRow() {
      console.log('addRow')

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.gridHeaderContainer.length; i++) {
        this.gridItemDefaultSet[this.gridHeaderContainer[i].value] = ''
      }

      const addRowObject = { ...this.gridItemDefaultSet }
      addRowObject.isNew = true
      this.gridItems.unshift(addRowObject)

      // let headerRow = this
    },
  },
}
</script>
