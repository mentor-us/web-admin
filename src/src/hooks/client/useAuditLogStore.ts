import { compareDate, compareVietnameseWord, textContent } from "utils";
import { create } from "zustand";

interface ColumnHeaderInfo {
  text: string;
  textValue: string;
  isShow: boolean;
  Header?: string;
  accessor?: string;
  width?: string;
  notSorted?: boolean;
  sortType?: any;
  type?: string;
  align?: string;
}

interface ShortProfile {
  id: string;
  name: string;
  email: string;
  imageURL: string;
}

interface AuditRecordDTO {
  id: string;
  entityId: string;
  type: string;
  detail: string;
  user: ShortProfile;
  action: ActionType;
  domain: DomainType;
  createdAt: Date;
  updatedAt: Date;
}

interface AuditLogState {
  columnHeaders: ColumnHeaderInfo[];
  currentPageSearch: number;
  itemsPerPage: number;
  searchParams: object;
  query: string;
  isSelectAll: boolean;
  isSubmitSearch: boolean;
  auditLogData: AuditRecordDTO[];

  setState: (keyState: string, value: any) => void;
  setColumnColumnHeader: (payload: ColumnHeaderInfo) => void;
}

const defaultColumnHeaders: ColumnHeaderInfo[] = [
  {
    text: "STT",
    textValue: "no",
    isShow: true,
    Header: "STT",
    accessor: "no",
    width: "5%",
    notSorted: true,
    type: "normal",
    align: "center"
  },
  {
    text: "Ngày thực hiện",
    textValue: "createdDate",
    isShow: true,
    Header: "Ngày thực hiện",
    accessor: "createdDate",
    width: "15%",
    notSorted: false,
    sortType: compareDate,
    type: "normal",
    align: "center"
  },
  {
    text: "Nguời dùng",
    textValue: "user",
    isShow: true,
    Header: "Người dùng",
    accessor: "user",
    width: "15%",
    notSorted: false,
    sortType: (rowA: any, rowB: any, id: any, desc: any) => {
      const userAReactNode = rowA.values[id];
      const userBReactNode = rowB.values[id];
      return textContent(userAReactNode).localeCompare(textContent(userBReactNode), "vi");
    },
    type: "component",
    align: "center"
  },
  {
    text: "Loại đối tượng",
    textValue: "domain",
    isShow: true,
    Header: "Loại đối tượng",
    accessor: "domain",
    width: "15%",
    notSorted: false,
    sortType: compareVietnameseWord,
    type: "normal",
    align: "center"
  },
  {
    text: "Loại hành động",
    textValue: "action",
    isShow: true,
    Header: "Loại hành động",
    accessor: "action",
    width: "15%",
    notSorted: false,
    sortType: compareVietnameseWord,
    type: "normal",
    align: "center"
  },
  {
    text: "Chi tiết",
    textValue: "detail",
    isShow: true,
    Header: "Chi tiết",
    accessor: "detail",
    width: "50%",
    notSorted: true,
    type: "normal",
    align: "left"
  }
];

export enum DomainType {
  USER,
  GROUP,
  CHANNEL,
  GROUP_CATEGORY,
  GRADE,
  NOTE
}

export enum ActionType {
  CREATED,
  UPDATED,
  DELETED
}

const getEnumName = (enumType: any, value: any) => {
  return enumType[value];
};

export const domainTypeMap = {
  [getEnumName(DomainType, DomainType.USER)]: "Người dùng",
  [getEnumName(DomainType, DomainType.GROUP)]: "Nhóm",
  [getEnumName(DomainType, DomainType.CHANNEL)]: "Kênh",
  [getEnumName(DomainType, DomainType.GROUP_CATEGORY)]: "Danh mục nhóm",
  [getEnumName(DomainType, DomainType.GRADE)]: "Điểm số",
  [getEnumName(DomainType, DomainType.NOTE)]: "Ghi chú"
};

export const actionTypeMap = {
  [getEnumName(ActionType, ActionType.CREATED)]: "Tạo",
  [getEnumName(ActionType, ActionType.UPDATED)]: "Cập nhật",
  [getEnumName(ActionType, ActionType.DELETED)]: "Xóa"
};

const useAuditLogStore = create<AuditLogState>((set) => ({
  columnHeaders: defaultColumnHeaders,
  currentPageSearch: 0,
  itemsPerPage: 10,
  searchParams: {},
  query: "",
  isSelectAll: false,
  isSubmitSearch: false,
  auditLogData: [],
  setState: (keyState, value) =>
    set((state) => {
      return { ...state, [keyState]: value };
    }),
  setColumnColumnHeader: (payload: ColumnHeaderInfo) =>
    set((state) => {
      const updatedColumnHeaders = state.columnHeaders.map((column) => {
        if (column.textValue === payload.textValue) {
          return { ...column, isShow: !column.isShow };
        }
        return column;
      });

      return { ...state, columnHeaders: updatedColumnHeaders };
    })
}));

export default useAuditLogStore;
