import { ColumnsType } from 'antd/es/table'

type Props<T> = {
  columns: ColumnsType<T>
  source: T[]
  maxWidthPerCell?: number
}

type DynamicColumnInfo<T> = {
  columns: ColumnsType<T>
  tableWidth: number
}

export const useDynamicColumns = <T>({
  columns,
  source,
  maxWidthPerCell = 50,
}: Props<T>): DynamicColumnInfo<T> => {
  const columnsWithWidth = columns.map((column: any) => ({
    ...column,
    width: getTextWidth(column.title),
  }))

  source.map((entry: any) => {
    columnsWithWidth.map((column, indexColumn) => {
      const columnWidth = column.width
      const cellValue = Object.values(entry)[indexColumn] as string

      // Get the string width based on chars length
      let cellWidth = getTextWidth(cellValue)

      // Verify if the cell value is smaller than column's width
      if (cellWidth < columnWidth) cellWidth = columnWidth

      // Verify if the cell value width is bigger than our max width flag
      if (cellWidth > maxWidthPerCell) cellWidth = maxWidthPerCell

      // Update the column width
      columnsWithWidth[indexColumn].width = cellWidth
    })
  })

  const tableWidth = columnsWithWidth
    .map(column => column.width)
    .reduce((a, b) => {
      return a + b
    })

  return {
    columns: columnsWithWidth,
    tableWidth,
  }
}

const getTextWidth = (text?: string, font = '16px -apple-system') => {
  if (!text) return 100

  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (context) {
    context.font = font
    const metrics = context.measureText(text)
    return Math.round(metrics.width + 80)
  }

  return 100
}
