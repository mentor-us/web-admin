import { useSelector } from "react-redux";
import {
  getAccountDetailColumnHeadersMenteeSelector,
  getAccountDetailColumnHeadersMentorSelector
} from "features/accountDetail/selector";
import {
  updateAccountDetailColumnHeadersMentee,
  updateAccountDetailColumnHeadersMentor
} from "features/accountDetail/slice";
import { getAccountColumnHeadersSelector } from "features/accounts/selector";
import { updateAccountColumnHeaders } from "features/accounts/slice";
import {
  getGroupDetailColumnHeadersMenteeSelector,
  getGroupDetailColumnHeadersMentorSelector
} from "features/groupDetail/selector";
import {
  updateGroupDetailColumnHeadersMentee,
  updateGroupDetailColumnHeadersMentor
} from "features/groupDetail/slice";
import { getGroupColumnHeadersSelector } from "features/groups/selector";
import { updateGroupColumnHeaders } from "features/groups/slice";
import { getCategoryColumnHeadersSelector } from "features/groupsCategory/selector";
import { updateCategoryColumnHeaders } from "features/groupsCategory/slice";
import { getStatisticColumnHeadersSelector } from "features/statistic/selector";
import { updateStatisticColumnHeaders } from "features/statistic/slice";
import { getStatisticDetailColumnHeadersSelector } from "features/statisticDetail/selector";
import { updateStatisticDetailColumnHeaders } from "features/statisticDetail/slice";
import { PropTypes } from "prop-types";

import SelectMultiple from "components/SelectMultiple";
import useAuditLogStore from "hooks/client/useAuditLogStore.ts";

const useHeaderFilter = (type) => {
  const headerFilter = { value: undefined, setValue: undefined, isDisableRedux: false };

  switch (type) {
    case "groups": {
      const data = useSelector(getGroupColumnHeadersSelector);
      headerFilter.value = data;
      headerFilter.setValue = updateGroupColumnHeaders;
      break;
    }
    case "group-detail-mentee": {
      const data = useSelector(getGroupDetailColumnHeadersMenteeSelector);
      headerFilter.value = data;
      headerFilter.setValue = updateGroupDetailColumnHeadersMentee;
      break;
    }
    case "group-detail-mentor": {
      const data = useSelector(getGroupDetailColumnHeadersMentorSelector);
      headerFilter.value = data;
      headerFilter.setValue = updateGroupDetailColumnHeadersMentor;
      break;
    }
    case "group-category": {
      const data = useSelector(getCategoryColumnHeadersSelector);
      headerFilter.value = data;
      headerFilter.setValue = updateCategoryColumnHeaders;
      break;
    }
    case "account-management": {
      const data = useSelector(getAccountColumnHeadersSelector);
      headerFilter.value = data;
      headerFilter.setValue = updateAccountColumnHeaders;
      break;
    }
    case "account-detail-mentee": {
      const data = useSelector(getAccountDetailColumnHeadersMenteeSelector);
      headerFilter.value = data;
      headerFilter.setValue = updateAccountDetailColumnHeadersMentee;
      break;
    }
    case "account-detail-mentor": {
      const data = useSelector(getAccountDetailColumnHeadersMentorSelector);
      headerFilter.value = data;
      headerFilter.setValue = updateAccountDetailColumnHeadersMentor;
      break;
    }
    case "statistic": {
      const data = useSelector(getStatisticColumnHeadersSelector);
      headerFilter.value = data;
      headerFilter.setValue = updateStatisticColumnHeaders;
      break;
    }
    case "statistic-detail": {
      const data = useSelector(getStatisticDetailColumnHeadersSelector);
      data.value = data;
      data.setValue = updateStatisticDetailColumnHeaders;
      break;
    }
    case "audit-log": {
      const { columnHeaders, setColumnColumnHeader } = useAuditLogStore();
      headerFilter.value = columnHeaders;
      headerFilter.setValue = setColumnColumnHeader;
      headerFilter.isDisableRedux = true;
      break;
    }
    default:
      break;
  }

  return headerFilter;
};

function HeaderFilter({ type }) {
  const { value, setValue, isDisableRedux } = useHeaderFilter(type);

  return setValue ? (
    <SelectMultiple
      label="Cột hiển thị"
      value={value}
      setValue={setValue}
      isDisableRedux={isDisableRedux}
    />
  ) : null;
}

HeaderFilter.propTypes = {
  type: PropTypes.string.isRequired
};

export default HeaderFilter;
