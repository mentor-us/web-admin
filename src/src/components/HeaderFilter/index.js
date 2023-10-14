import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";

import SelectMultiple from "components/SelectMultiple";

import {
  getAccountDetailColumnHeadersMenteeSelector,
  getAccountDetailColumnHeadersMentorSelector
} from "redux/accountDetail/selector";
import {
  updateAccountDetailColumnHeadersMentee,
  updateAccountDetailColumnHeadersMentor
} from "redux/accountDetail/slice";
import { getAccountColumnHeadersSelector } from "redux/accounts/selector";
import { updateAccountColumnHeaders } from "redux/accounts/slice";
import {
  getGroupDetailColumnHeadersMenteeSelector,
  getGroupDetailColumnHeadersMentorSelector
} from "redux/groupDetail/selector";
import {
  updateGroupDetailColumnHeadersMentee,
  updateGroupDetailColumnHeadersMentor
} from "redux/groupDetail/slice";
import { getGroupColumnHeadersSelector } from "redux/groups/selector";
import { updateGroupColumnHeaders } from "redux/groups/slice";
import { getCategoryColumnHeadersSelector } from "redux/groupsCategory/selector";
import { updateCategoryColumnHeaders } from "redux/groupsCategory/slice";
import { getStatisticColumnHeadersSelector } from "redux/statistic/selector";
import { updateStatisticColumnHeaders } from "redux/statistic/slice";
import { getStatisticDetailColumnHeadersSelector } from "redux/statisticDetail/selector";
import { updateStatisticDetailColumnHeaders } from "redux/statisticDetail/slice";

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
