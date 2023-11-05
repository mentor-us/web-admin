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

function HeaderFilter({ type }) {
  const renderComponent = () => {
    let component = <div />;
    switch (type) {
      case "groups": {
        const data = useSelector(getGroupColumnHeadersSelector);
        component = (
          <SelectMultiple label="Cột hiển thị" value={data} setValue={updateGroupColumnHeaders} />
        );
        break;
      }

      case "group-detail-mentee": {
        const data = useSelector(getGroupDetailColumnHeadersMenteeSelector);
        component = (
          <SelectMultiple
            label="Cột hiển thị"
            value={data}
            setValue={updateGroupDetailColumnHeadersMentee}
          />
        );
        break;
      }

      case "group-detail-mentor": {
        const data = useSelector(getGroupDetailColumnHeadersMentorSelector);
        component = (
          <SelectMultiple
            label="Cột hiển thị"
            value={data}
            setValue={updateGroupDetailColumnHeadersMentor}
          />
        );
        break;
      }

      case "group-category": {
        const data = useSelector(getCategoryColumnHeadersSelector);
        component = (
          <SelectMultiple
            label="Cột hiển thị"
            value={data}
            setValue={updateCategoryColumnHeaders}
          />
        );
        break;
      }

      case "account-management": {
        const data = useSelector(getAccountColumnHeadersSelector);
        component = (
          <SelectMultiple label="Cột hiển thị" value={data} setValue={updateAccountColumnHeaders} />
        );
        break;
      }

      case "account-detail-mentee": {
        const data = useSelector(getAccountDetailColumnHeadersMenteeSelector);
        component = (
          <SelectMultiple
            label="Cột hiển thị"
            value={data}
            setValue={updateAccountDetailColumnHeadersMentee}
          />
        );
        break;
      }

      case "account-detail-mentor": {
        const data = useSelector(getAccountDetailColumnHeadersMentorSelector);
        component = (
          <SelectMultiple
            label="Cột hiển thị"
            value={data}
            setValue={updateAccountDetailColumnHeadersMentor}
          />
        );
        break;
      }

      case "statistic": {
        const data = useSelector(getStatisticColumnHeadersSelector);
        component = (
          <SelectMultiple
            label="Cột hiển thị"
            value={data}
            setValue={updateStatisticColumnHeaders}
          />
        );
        break;
      }

      case "statistic-detail": {
        const data = useSelector(getStatisticDetailColumnHeadersSelector);
        component = (
          <SelectMultiple
            label="Cột hiển thị"
            value={data}
            setValue={updateStatisticDetailColumnHeaders}
          />
        );
        break;
      }

      default:
        break;
    }
    return component;
  };

  return renderComponent();
}

HeaderFilter.propTypes = {
  type: PropTypes.string.isRequired
};

export default HeaderFilter;
