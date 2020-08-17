import React from 'react';
import { Form as AntForm } from 'antd';
import { isArray, cloneDeep } from 'lodash'
import { FormProps, FormItemProps } from '../interface'

export const Form = (props: FormProps) => {
    const { cols = 5, children, ...restProps } = props
    const items: JSX.Element[] = []
    if (isArray(children)) {
        const cells: JSX.Element[] = []
        let count: number = 0
        children.forEach(item => {
            const { br, colSpan = 1 } = item.props
            cells.push(item)
            count += colSpan
            if (count === cols || br) {
                items.push(<tr>{cloneDeep(cells)}</tr>)
                cells.splice(0)
                count = 0
            }
        })
    }

    const colsNode: JSX.Element[] = []
    for (let i = 0; i < cols; i += 1) {
        colsNode.push(<th aria-label="th" style={{ width: `${Math.round(1 / cols * 10000) / 100.00}%` }} />)
    }
    return (
        <AntForm
            {...restProps}
        >
            <table
                style={{
                    borderCollapse: 'separate',
                    borderSpacing: '8px 0px',
                }}
            >
                <tr>
                    {colsNode}
                </tr>
                {items}
            </table>
        </AntForm>
    )
}

const Item = (props: FormItemProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { colSpan, rowSpan, style, br, ...restProps } = props
    const cleanMarginBottom: React.CSSProperties = {}
    if (!props.name && !props.label) {
        cleanMarginBottom.marginBottom = 0
    }
    return (
        <td
            colSpan={colSpan}
            rowSpan={rowSpan}
        >
            <AntForm.Item
                style={{
                    ...cleanMarginBottom,
                    ...style,
                }}
                {...restProps}
            />
        </td>
    )
}
Form.Item = Item
