import backIcon from "../../../assets/images/back-arrow.svg";
import { commonText } from "../../../i18n/Common";
import { useNavigate } from "react-router-dom";
import "./NavHeader.scss";
import { NavHeaderText } from "../../../i18n/Components";

const NavHeader = ({ icon = backIcon, path = "/", navigationHeader = NavHeaderText.navigationHeader }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex nav-header">
      <img src={icon} alt={commonText.backIconAlt} role="presentation" onClick={() => navigate(path)} />
      <button type="button" className="navigation-header ms-2" onClick={() => navigate(path)}>
        {navigationHeader}
      </button>
    </div>
  );
};

export default NavHeader;
