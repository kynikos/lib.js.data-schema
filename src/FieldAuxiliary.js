// This file is part of data-schema
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.data-schema/blob/master/LICENSE

import {SchemaField} from './SchemaField'


export class FieldAuxiliary extends SchemaField {
  _searchify(value, item, index) {
    return null
  }

  search(value, lowerCaseTerm) {
    return false
  }
}
