<template>
  <v-flex>
    <v-data-table
      class="elevation-1"
      hide-default-footer
      :headers="gridHeaders"
      :items="gridItems"
      :loading="gridLoading"
      :show-select="showSelect"
      :single-select="singleSelect"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      @page-count="pageCount = $event"
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
              <!-- [S]checkbox -->
              <template v-if="key === 0 && showSelect">
                <v-checkbox
                  class="mt-0"
                  hide-details
                  @click="makeSelectedItems(item, idx)"
                ></v-checkbox>
              </template>
              <!-- [E]checkbox -->

              <!-- [S]edit field -->
              <template v-else-if="editFlag === true && editRow === idx && editCol === key">
                <v-select
                  v-if="header.dropdown"
                  v-model="item[header.value]"
                  :items="header.dropitems"
                  item-text="name"
                  item-value="value"
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
              <!-- [E]edit field -->

              <!-- [S]display data -->
              <span v-else>
                <v-select
                  v-if="header.dropdown"
                  v-model="item[header.value]"
                  :items="header.dropitems"
                  item-text="name"
                  item-value="value"
                  readonly
                ></v-select>
                <span v-else>
                  {{ item[header.value] }}
                </span>
              </span>
              <!-- [E]display data -->
            </td>
          </tr>
        </tbody>

        <!-- [S]no-data -->
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
        <!-- [E]no-data -->
      </template>
    </v-data-table>

    <!-- [S]pagination -->
    <div
      class="text-xs-center pt-2"
    >
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="totalVisible"
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
    'showSelect',
    // eslint-disable-next-line vue/require-prop-types
    'singleSelect',
    // eslint-disable-next-line vue/require-prop-types
    'loading',
  ],
  data() {
    return {
      // loading: false,
      gridHeaderContainer: {},
      gridItemContainer: {},
      gridItemDefaultSet: {},

      // pagination
      page: 2,
      pageCount: 0,
      itemsPerPage: 10,

      // editOption
      editFlag: false,
      editRow: 0,
      editCol: 0,
      editColumn: '',

      // selectedOption
      selectedItems: {},

      useSelector: false,

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
      console.log(this.editFlag, this.editRow, this.editColumn)
    },

    close() {
      this.editColumn = { ...this.gridItemDefaultSet }
    },

    pageChangeHandle(page) {
      console.log('page', page)
    },

    setPageInfo(pageInfo) {
      console.log('in pageInfo', pageInfo)
      this.page = pageInfo.curPage
      console.log('this.pageCount1 : [', this.pageCount, ']')
      this.pageCount = pageInfo.totPage
      console.log('this.pageCount2 : [', this.pageCount, ']')
      console.log('[', pageInfo, ']')
      console.log('this.pageCount : [', this.pageCount, ']')
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
    },

    makeSelectedItems(item, idx) {
      // console.log('makeSelectedItems', item, idx)
      this.selectedItems[idx] = item
      console.log(this.selectedItems)
    },
  },
}
</script>
