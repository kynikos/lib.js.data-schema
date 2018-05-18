'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Generated by CoffeeScript 2.2.3
(function () {
  // This file is part of antd-schema-table
  // Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
  // Licensed under MIT
  // https://github.com/kynikos/lib.js.antd-schema-table/blob/master/LICENSE
  var AntDTable, Component, FieldString, List, Papa, SchemaField, Spin, Table, _FieldPrimaryKey, h;

  var _require = require('react');

  Component = _require.Component;
  h = _require.createElement;


  AntDTable = require('antd/lib/table');

  Spin = require('antd/lib/spin');

  try {
    Papa = require('papaparse');
  } catch (error) {
    Papa = null;
  }

  SchemaField = function () {
    function SchemaField(props) {
      _classCallCheck(this, SchemaField);

      var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
      this.dataIndex = function () {
        if ((ref = props.dataIndex) != null) {
          return ref;
        } else {
          throw Error("dataIndex must be defined");
        }
      }();
      this.key = props.key || this.dataIndex;
      this.title = (ref1 = props.title) != null ? ref1 : null;
      this.defaultSortOrder = (ref2 = props.defaultSortOrder) != null ? ref2 : null;
      this.renderify = (ref3 = props.renderify) != null ? ref3 : this._renderify;
      this.searchify = (ref4 = props.searchify) != null ? ref4 : this._searchify;
      this.filterify = (ref5 = props.filterify) != null ? ref5 : this._filterify;
      this.sortify = (ref6 = props.sortify) != null ? ref6 : this._sortify;
      this.exportify = (ref7 = props.exportify) != null ? ref7 : this._exportify;
      this.width = (ref8 = props.width) != null ? ref8 : null;
    }

    _createClass(SchemaField, [{
      key: '_renderify',
      value: function _renderify(value, item, index) {
        return value && String(value) || "";
      }
    }, {
      key: 'render',
      value: function render(value) {
        return value.renderable;
      }
    }, {
      key: '_searchify',
      value: function _searchify(value, item, index) {
        return value && String(value).toLowerCase() || "";
      }
    }, {
      key: 'search',
      value: function search(value, lowerCaseTerm) {
        return value.searchable.indexOf(lowerCaseTerm) >= 0;
      }
    }, {
      key: '_filterify',
      value: function _filterify(value, item, index) {
        return value && String(value) || "";
      }
    }, {
      key: 'filter',
      value: function filter(value, _filter) {
        return value.filterable.indexOf(_filter) >= 0;
      }
    }, {
      key: '_sortify',
      value: function _sortify(value, item, index) {
        return value && String(value).toLowerCase() || "";
      }
    }, {
      key: 'sorter',
      value: function sorter(a, b) {
        var av, bv;
        av = a[this.key].sortable;
        bv = b[this.key].sortable;
        if (av < bv) {
          return -1;
        }
        if (av > bv) {
          return 1;
        }
        return 0;
      }
    }, {
      key: '_exportify',
      value: function _exportify(value, item, index) {
        return value && String(value) || "";
      }
    }, {
      key: 'export',
      value: function _export(value) {
        return value.exportable;
      }
    }, {
      key: 'deserialize',
      value: function deserialize(value, item, index) {
        return {
          serialized: value,
          renderable: this.renderify(value, item, index),
          searchable: this.searchify(value, item, index),
          filterable: this.filterify(value, item, index),
          sortable: this.sortify(value, item, index),
          exportable: this.exportify(value, item, index)
        };
      }
    }]);

    return SchemaField;
  }();

  // 'key' is part of the deserialized data items, so give it a special schema
  // field so that it's not needed to explicitly exclude 'key' when iterating
  // through the items' keys
  _FieldPrimaryKey = function (_SchemaField) {
    _inherits(_FieldPrimaryKey, _SchemaField);

    function _FieldPrimaryKey() {
      _classCallCheck(this, _FieldPrimaryKey);

      return _possibleConstructorReturn(this, (_FieldPrimaryKey.__proto__ || Object.getPrototypeOf(_FieldPrimaryKey)).apply(this, arguments));
    }

    _createClass(_FieldPrimaryKey, [{
      key: 'render',
      value: function render(value) {
        return value;
      }
    }, {
      key: '_searchify',
      value: function _searchify(value, item, index) {
        return null;
      }
    }, {
      key: 'search',
      value: function search(value, lowerCaseTerm) {
        return false;
      }
    }, {
      key: 'filter',
      value: function filter(value, _filter2) {
        return true;
      }
    }, {
      key: 'sorter',
      value: function sorter(a, b) {
        return 0;
      }
    }, {
      key: 'export',
      value: function _export(value) {
        return value;
      }
    }, {
      key: 'deserialize',
      value: function deserialize(value, item, index) {
        return value;
      }
    }]);

    return _FieldPrimaryKey;
  }(SchemaField);

  module.exports.FieldAuxiliary = function (_SchemaField2) {
    _inherits(FieldAuxiliary, _SchemaField2);

    function FieldAuxiliary() {
      _classCallCheck(this, FieldAuxiliary);

      return _possibleConstructorReturn(this, (FieldAuxiliary.__proto__ || Object.getPrototypeOf(FieldAuxiliary)).apply(this, arguments));
    }

    _createClass(FieldAuxiliary, [{
      key: '_searchify',
      value: function _searchify(value, item, index) {
        return null;
      }
    }, {
      key: 'search',
      value: function search(value, lowerCaseTerm) {
        return false;
      }
    }]);

    return FieldAuxiliary;
  }(SchemaField);

  FieldString = function (_SchemaField3) {
    _inherits(FieldString, _SchemaField3);

    function FieldString() {
      _classCallCheck(this, FieldString);

      return _possibleConstructorReturn(this, (FieldString.__proto__ || Object.getPrototypeOf(FieldString)).apply(this, arguments));
    }

    _createClass(FieldString, [{
      key: '_renderify',
      value: function _renderify(value, item, index) {
        return value != null ? value : "";
      }
    }, {
      key: '_searchify',
      value: function _searchify(value, item, index) {
        return value && value.toLowerCase() || "";
      }
    }, {
      key: '_filterify',
      value: function _filterify(value, item, index) {
        return value && value.toLowerCase() || "";
      }
    }, {
      key: '_sortify',
      value: function _sortify(value, item, index) {
        return value && value.toLowerCase() || "";
      }
    }, {
      key: '_exportify',
      value: function _exportify(value, item, index) {
        return value != null ? value : "";
      }
    }]);

    return FieldString;
  }(SchemaField);

  module.exports.FieldString = FieldString;

  module.exports.FieldBooleany = function (_FieldString) {
    _inherits(FieldBooleany, _FieldString);

    function FieldBooleany(props) {
      _classCallCheck(this, FieldBooleany);

      var _this4 = _possibleConstructorReturn(this, (FieldBooleany.__proto__ || Object.getPrototypeOf(FieldBooleany)).call(this, props));

      _this4.trueyValue = props.trueyValue;
      _this4.falseyValue = props.falseyValue;
      return _this4;
    }

    _createClass(FieldBooleany, [{
      key: '_renderify',
      value: function _renderify(value, item, index) {
        if (value) {
          return this.trueyValue;
        } else {
          return this.falseyValue;
        }
      }
    }, {
      key: '_searchify',
      value: function _searchify(value, item, index) {
        if (value) {
          return this.trueyValue.toLowerCase();
        } else {
          return this.falseyValue.toLowerCase();
        }
      }
    }, {
      key: '_filterify',
      value: function _filterify(value, item, index) {
        if (value) {
          return this.trueyValue;
        } else {
          return this.falseyValue;
        }
      }
    }, {
      key: '_sortify',
      value: function _sortify(value, item, index) {
        if (value) {
          return this.trueyValue;
        } else {
          return this.falseyValue;
        }
      }
    }, {
      key: '_exportify',
      value: function _exportify(value, item, index) {
        if (value) {
          return this.trueyValue;
        } else {
          return this.falseyValue;
        }
      }
    }]);

    return FieldBooleany;
  }(FieldString);

  module.exports.FieldList = function (_FieldString2) {
    _inherits(FieldList, _FieldString2);

    function FieldList(props) {
      _classCallCheck(this, FieldList);

      var _this5 = _possibleConstructorReturn(this, (FieldList.__proto__ || Object.getPrototypeOf(FieldList)).call(this, props));

      _this5.glue = props.glue || ', ';
      return _this5;
    }

    _createClass(FieldList, [{
      key: '_renderify',
      value: function _renderify(value, item, index) {
        return value.join(this.glue);
      }
    }, {
      key: '_searchify',
      value: function _searchify(value, item, index) {
        return value.join(this.glue).toLowerCase();
      }
    }, {
      key: '_filterify',
      value: function _filterify(value, item, index) {
        return value.join(this.glue).toLowerCase();
      }
    }, {
      key: '_sortify',
      value: function _sortify(value, item, index) {
        return value.join(this.glue).toLowerCase();
      }
    }, {
      key: '_exportify',
      value: function _exportify(value, item, index) {
        return value.join(this.glue);
      }
    }]);

    return FieldList;
  }(FieldString);

  module.exports.FieldChoice = function (_FieldString3) {
    _inherits(FieldChoice, _FieldString3);

    function FieldChoice(props) {
      _classCallCheck(this, FieldChoice);

      var _this6 = _possibleConstructorReturn(this, (FieldChoice.__proto__ || Object.getPrototypeOf(FieldChoice)).call(this, props));

      _this6.choicesMap = props.choicesMap || {};
      return _this6;
    }

    _createClass(FieldChoice, [{
      key: '_renderify',
      value: function _renderify(value, item, index) {
        var ref;
        return (ref = this.choicesMap[value]) != null ? ref : "";
      }
    }, {
      key: '_searchify',
      value: function _searchify(value, item, index) {
        return value in this.choicesMap && this.choicesMap[value].toLowerCase() || "";
      }
    }, {
      key: '_filterify',
      value: function _filterify(value, item, index) {
        var ref;
        return (ref = this.choicesMap[value]) != null ? ref : "";
      }
    }, {
      key: '_sortify',
      value: function _sortify(value, item, index) {
        var ref;
        return (ref = this.choicesMap[value]) != null ? ref : "";
      }
    }, {
      key: '_exportify',
      value: function _exportify(value, item, index) {
        var ref;
        return (ref = this.choicesMap[value]) != null ? ref : "";
      }
    }]);

    return FieldChoice;
  }(FieldString);

  module.exports.FieldNumber = function (_SchemaField4) {
    _inherits(FieldNumber, _SchemaField4);

    function FieldNumber() {
      _classCallCheck(this, FieldNumber);

      return _possibleConstructorReturn(this, (FieldNumber.__proto__ || Object.getPrototypeOf(FieldNumber)).apply(this, arguments));
    }

    _createClass(FieldNumber, [{
      key: '_renderify',
      value: function _renderify(value, item, index) {
        return _get(FieldNumber.prototype.__proto__ || Object.getPrototypeOf(FieldNumber.prototype), '_renderify', this).call(this, value === 0 && '0' || value, item, index);
      }
    }, {
      key: '_searchify',
      value: function _searchify(value, item, index) {
        return _get(FieldNumber.prototype.__proto__ || Object.getPrototypeOf(FieldNumber.prototype), '_searchify', this).call(this, value === 0 && '0' || value, item, index);
      }
    }, {
      key: '_filterify',
      value: function _filterify(value, item, index) {
        return _get(FieldNumber.prototype.__proto__ || Object.getPrototypeOf(FieldNumber.prototype), '_filterify', this).call(this, value === 0 && '0' || value, item, index);
      }
    }, {
      key: '_sortify',
      value: function _sortify(value, item, index) {
        return value;
      }
    }, {
      key: 'sorter',
      value: function sorter(a, b) {
        var av, bv;
        av = a[this.key].sortable;
        bv = b[this.key].sortable;
        return av - bv;
      }
    }, {
      key: '_exportify',
      value: function _exportify(value, item, index) {
        return _get(FieldNumber.prototype.__proto__ || Object.getPrototypeOf(FieldNumber.prototype), '_exportify', this).call(this, value === 0 && '0' || value, item, index);
      }
    }]);

    return FieldNumber;
  }(SchemaField);

  module.exports.FieldDateTime = function (_SchemaField5) {
    _inherits(FieldDateTime, _SchemaField5);

    function FieldDateTime(props) {
      _classCallCheck(this, FieldDateTime);

      var _this8 = _possibleConstructorReturn(this, (FieldDateTime.__proto__ || Object.getPrototypeOf(FieldDateTime)).call(this, props));

      _this8.dateFormat = props.dateFormat || "L LTS";
      return _this8;
    }

    _createClass(FieldDateTime, [{
      key: '_renderify',
      value: function _renderify(value, item, index) {
        return value && moment(value).format(this.dateFormat) || "";
      }
    }, {
      key: '_searchify',
      value: function _searchify(value, item, index) {
        return value && moment(value).format(this.dateFormat).toLowerCase() || "";
      }
    }, {
      key: '_filterify',
      value: function _filterify(value, item, index) {
        return value && moment(value).format(this.dateFormat) || "";
      }
    }, {
      key: '_sortify',
      value: function _sortify(value, item, index) {
        return value && new Date(value) || null;
      }
    }, {
      key: 'sorter',
      value: function sorter(a, b) {
        var av, bv;
        av = a[this.key].sortable;
        bv = b[this.key].sortable;
        return av - bv;
      }
    }, {
      key: '_exportify',
      value: function _exportify(value, item, index) {
        return value != null ? value : "";
      }
    }]);

    return FieldDateTime;
  }(SchemaField);

  module.exports.Schema = function () {
    function Schema(settings) {
      var _this9 = this;

      _classCallCheck(this, Schema);

      var pkfield, ref, ref1;

      for (var _len = arguments.length, fields1 = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        fields1[_key - 1] = arguments[_key];
      }

      this.fields = fields1;
      this.rowKey = function () {
        if ((ref = settings.rowKey) != null) {
          return ref;
        } else {
          throw Error("'rowKey' not specified");
        }
      }();
      this.exportFileName = (ref1 = settings.exportFileName) != null ? ref1 : "data.csv";
      // 'key' is reserved for the primary key
      pkfield = new _FieldPrimaryKey({
        dataIndex: this.rowKey,
        key: 'key'
      });
      // NOTE: pkfield is needed in @fields for example by exportCSV()
      this.fields.unshift(pkfield);
      this.dataIndexToFields = {};
      this.keyToField = {};
      this.tableColumns = this.fields.reduce(function (columns, currField) {
        var defaultSortOrder, key, render, sorter, title, width;
        if (currField.key in _this9.keyToField) {
          if (currField.key === 'key') {
            throw Error("'key' is reserved for the primary key");
          }
          throw Error('Duplicated key: ' + currField.key);
        }
        _this9.keyToField[currField.key] = currField;
        if (!(currField.dataIndex in _this9.dataIndexToFields)) {
          _this9.dataIndexToFields[currField.dataIndex] = [currField];
        } else {
          _this9.dataIndexToFields[currField.dataIndex].push(currField);
        }
        // Some fields (e.g. FieldAuxiliary) are only loaded to be used
        // by other fields; they don't specify a 'title'
        if (currField.title != null) {
          key = currField.key;
          defaultSortOrder = currField.defaultSortOrder;
          title = currField.title;
          render = currField.render;
          sorter = currField.sorter;
          width = currField.width;

          columns.push({
            // When deserializing the data with load(), this schema
            // uses the unique 'key' as 'dataIndex'
            dataIndex: key,
            key: key,
            title: title,
            render: render,
            defaultSortOrder: defaultSortOrder,
            sorter: sorter,
            width: width
          });
        }
        return columns;
      }, []);
    }

    _createClass(Schema, [{
      key: 'load',
      value: function load(data) {
        var _this10 = this;

        return data.map(function (item, index) {
          return Object.keys(item).reduce(function (deserializedItem, currKey) {
            var field, i, len, ref, ref1;
            ref1 = (ref = _this10.dataIndexToFields[currKey]) != null ? ref : [];
            for (i = 0, len = ref1.length; i < len; i++) {
              field = ref1[i];
              deserializedItem[field.key] = field.deserialize(item[currKey], item, index);
            }
            return deserializedItem;
          }, {
            // The constructor checks that 'key' isn't used by any field
            key: item[_this10.rowKey]
          });
        });
      }
    }, {
      key: 'searchGlobal',
      value: function searchGlobal(deserializedData, searchText) {
        var _this11 = this;

        var searchTextLc;
        if (searchText) {
          searchTextLc = searchText.toLowerCase();
          return deserializedData.filter(function (item) {
            return Object.keys(item).some(function (key) {
              return _this11.keyToField[key].search(item[key], searchTextLc);
            });
          });
        }
        return deserializedData;
      }
    }, {
      key: 'exportCSV',
      value: function exportCSV(deserializedData) {
        var _this12 = this;

        var blob, csv, data, field, fields, link;
        // NOTE: Do *not* use "ID" as the first field title, or Excel
        // will think that it's a SYLK file and raise warnings
        // https://annalear.ca/2010/06/10/why-excel-thinks-your-csv-is-a-sylk/
        // I should be safe in this case because the first field should always
        // be 'key'
        fields = function () {
          var i, len, ref, results;
          ref = this.fields;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            field = ref[i];
            results.push(field.key);
          }
          return results;
        }.call(this);
        data = deserializedData.map(function (item) {
          var i, len, ref, results;
          ref = _this12.fields;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            field = ref[i];
            results.push(field.export(item[field.key]));
          }
          return results;
        });
        csv = Papa.unparse({ fields: fields, data: data });
        blob = new Blob([csv], {
          type: 'text/csv'
        });
        link = document.h('a');
        link.setAttribute("download", this.exportFileName);
        link.setAttribute("href", window.URL.createObjectURL(blob));
        document.body.insertBefore(link, null);
        link.click();
        // Apparently iOS Safari doesn't support ChildNode.remove() yet...
        return document.body.removeChild(link);
      }
    }]);

    return Schema;
  }();

  Table = function (_Component) {
    _inherits(Table, _Component);

    function Table() {
      _classCallCheck(this, Table);

      return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
    }

    _createClass(Table, [{
      key: 'render',
      value: function render() {
        var containerClassName, deserializedData, expandedRowRender, loading, pagination, rowClassName, rowSelection, schema, tableProps;
        var _props = this.props;
        schema = _props.schema;
        loading = _props.loading;
        deserializedData = _props.deserializedData;
        pagination = _props.pagination;
        rowSelection = _props.rowSelection;
        containerClassName = _props.containerClassName;
        rowClassName = _props.rowClassName;
        expandedRowRender = _props.expandedRowRender;

        tableProps = {
          // Note that in the deserialized rows, the rowKey is forced to 'key'
          // schema.rowKey refers to the serialized data
          rowKey: 'key',
          pagination: pagination || false,
          rowSelection: rowSelection || null,
          loading: loading,
          dataSource: deserializedData,
          columns: schema.tableColumns,
          bordered: true,
          size: 'small',
          expandedRowRender: expandedRowRender || null
        };
        if (containerClassName) {
          tableProps.className = containerClassName;
        }
        if (rowClassName) {
          tableProps.rowClassName = rowClassName;
        }
        return h(AntDTable, tableProps);
      }
    }]);

    return Table;
  }(Component);

  module.exports.Table = Table;

  module.exports.List = List = function List(props) {
    var field, index, row;
    return h('div', {
      className: props.listClassName
    }, props.loading ? h(Spin) : !(props.deserializedData && props.deserializedData.length) ? h('span', {}, "No data") : h.apply(undefined, ['table', {}].concat(_toConsumableArray(function () {
      var i, len, ref, results;
      ref = props.deserializedData;
      results = [];
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        row = ref[index];
        results.push(h.apply(undefined, ['tbody', {}].concat(_toConsumableArray(function () {
          var j, len1, ref1, results1;
          ref1 = props.schema.fields;
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            field = ref1[j];
            if (field.title) {
              results1.push(h('tr', {}, h('th', {}, field.title), h('td', {}, field.render(row[field.key]))));
            }
          }
          return results1;
        }()))));
      }
      return results;
    }()))));
  };

  module.exports.TableResponsive = function (props) {
    return h(props.narrowMode && List || Table, props);
  };
}).call(undefined);