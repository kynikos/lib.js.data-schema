// This file is part of data-schema
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.data-schema/blob/master/LICENSE

export const ASCEND = 'ascend'
export const DESCEND = 'descend'


export class SchemaField {
  constructor(props) {
    if (props.dataIndex == null) {
      throw new Error("'dataIndex' must be defined")
    }
    this.dataIndex = props.dataIndex
    this.key = props.key || this.dataIndex
    this.title = props.title == null ? null : props.title
    if (
      (props.defaultSortPriority == null) !==
      (props.defaultSortOrder == null)
    ) {
      throw new Error("'defaultSortPriority' and 'defaultSortOrder' must be " +
        `defined together (dataIndex: ${props.dataIndex})`)
    }
    // 'defaultSortPriority' does not exist in Ant Design's Table component
    this.defaultSortPriority = props.defaultSortPriority == null
      ? null
      : props.defaultSortPriority
    if (!(
      props.defaultSortOrder == null ||
      [ASCEND, DESCEND].includes(props.defaultSortOrder)
    )) {
      throw new Error("'defaultSortOrder' must be a string that either " +
        `starts with 'asc' or 'des' (dataIndex: ${props.dataIndex})`)
    }
    // 'defaultSortOrder' must be compatible with Ant Design's Table component
    this.defaultSortOrder = props.defaultSortOrder == null
      ? null
      : props.defaultSortOrder
    // 'sortAscendLabel' does not exist in Ant Design's Table component
    this.sortAscendLabel = props.sortAscendLabel == null
      ? null
      : props.sortAscendLabel
    // 'sortDescendLabel' does not exist in Ant Design's Table component
    this.sortDescendLabel = props.sortDescendLabel == null
      ? null
      : props.sortDescendLabel
    this.renderify = props.renderify == null
      ? this._renderify.bind(this)
      : (props.renderify && props.renderify.bind(this))
    this.searchify = props.searchify == null
      ? this._searchify.bind(this)
      : (props.searchify && props.searchify.bind(this))
    this.filterify = props.filterify == null
      ? this._filterify.bind(this)
      : (props.filterify && props.filterify.bind(this))
    this.sortify = props.sortify == null
      ? this._sortify.bind(this)
      : (props.sortify && props.sortify.bind(this))
    this.exportify = props.exportify == null
      ? this._exportify.bind(this)
      : (props.exportify && props.exportify.bind(this))
    this.width = props.width == null ? null : props.width
    this.sorter = props.sorter == null
      ? this._sorter.bind(this)
      : (props.sorter && props.sorter.bind(this))
    this.className = props.className == null ? null : props.className

    // this._ancestorFieldTitlesPath is initialized later in _postInit()
    this._ancestorFieldTitlesPath = null
  }

  _postInit({fieldsFlat, dataIndexToFields, keyToField, ancestorsPath}) {
    if (this.key in keyToField) {
      if (this.key === 'key') {
        // Note that this is effectively thrown when the *second* field
        // with a 'key' key is found, since the first is the actual
        // primary-key field
        throw new Error("'key' is reserved for the primary key")
      }
      throw new Error(`Duplicated key: ${this.key}`)
    }

    fieldsFlat.push(this)
    keyToField[this.key] = this

    if (this.dataIndex in dataIndexToFields) {
      dataIndexToFields[this.dataIndex].push(this)
    } else {
      dataIndexToFields[this.dataIndex] = [this]
    }

    this._ancestorFieldTitlesPath = ancestorsPath.concat(this.title || this.key)

    // Some fields (e.g. FieldAuxiliary) are only loaded to be used
    // by other fields; they don't specify a 'title'
    if (this.title != null) {
      return {
        // When deserializing the data with load(), this schema
        // uses the unique 'key' as 'dataIndex'
        dataIndex: this.key,
        key: this.key,
        title: this.title,
        render: this.render,
        defaultSortPriority: this.defaultSortPriority,
        defaultSortOrder: this.defaultSortOrder,
        sortAscendLabel: this.sortAscendLabel,
        sortDescendLabel: this.sortDescendLabel,
        sorter: this.sorter,
        width: this.width,
        className: this.className,
      }
    }

    return null
  }

  _renderify(value, item, index) {
    return value && String(value) || ''
  }

  render(value) {
    return value.renderable
  }

  _searchify(value, item, index) {
    return value && String(value).toLowerCase() || ''
  }

  search(value, lowerCaseTerm) {
    return value.searchable.indexOf(lowerCaseTerm) >= 0
  }

  _filterify(value, item, index) {
    return value && String(value) || ''
  }

  filter(value, filter) {
    return value.filterable.indexOf(filter) >= 0
  }

  _sortify(value, item, index) {
    return value && String(value).toLowerCase() || ''
  }

  _sorter(a, b) {
    const av = a[this.key].sortable
    const bv = b[this.key].sortable
    if (av < bv) { return -1 }
    if (av > bv) { return 1 }
    return 0
  }

  _exportify(value, item, index) {
    return value && String(value) || ''
  }

  export(value) {
    return value.exportable
  }

  deserialize(value, item, index) {
    return {
      serialized: value,
      renderable: this.renderify(value, item, index),
      searchable: this.searchify(value, item, index),
      filterable: this.filterify(value, item, index),
      sortable: this.sortify(value, item, index),
      exportable: this.exportify(value, item, index),
    }
  }
}
