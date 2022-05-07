// This file is part of data-schema
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.data-schema/blob/master/LICENSE


export class SchemaFieldGroup {
  constructor(title, ...fieldsSubTree) {
    // Support dynamic schemas where fields may be set to null or undefined
    this.title = title
    this.fieldsSubTree = fieldsSubTree.filter((field) => field != null)

    // _ancestorFieldTitlesPath is initialized later in _postInit()
    this._ancestorFieldTitlesPath = null
  }

  _postInit({fieldsFlat, dataIndexToFields, keyToField, ancestorsPath}) {
    this._ancestorFieldTitlesPath =
            // Note that for example the root field group has 'null' title
            this.title
              ? ancestorsPath.concat(this.title)
              : ancestorsPath.slice()

    return this.fieldsSubTree.reduce(
      (columns, currField) => {
        if (currField.fieldsSubTree != null) {
          return columns.concat({
            title: currField.title,
            children: currField._postInit({
              fieldsFlat,
              dataIndexToFields,
              keyToField,
              ancestorsPath: this._ancestorFieldTitlesPath,
            }),
          })
        }

        const column = currField._postInit({
          fieldsFlat,
          dataIndexToFields,
          keyToField,
          ancestorsPath: this._ancestorFieldTitlesPath,
        })

        if (column) {
          return columns.concat(column)
        }

        return columns
      },
      [],
    )
  }
}
