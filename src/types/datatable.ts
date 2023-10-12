import { DataForm } from "../../components/sideModal";
import { DropdownActions } from "../../components/tableAction";

export interface ITemplate {
    /** Header of table, please use lower case only */
    header: string,
    /** Key from data */
    key: string,
    /** Custom render data */
    render?: (id: string | number) => JSX.Element,
    /** Align item */
    itemAlign?: string
}

export interface IDataTable {
    url: string,
    filter?: Array<string>,
    template: Array<ITemplate>,
    title: string,
    allowCreate?: boolean,
    action?: Array<DropdownActions>,
    dataForm?: Array<DataForm>
}