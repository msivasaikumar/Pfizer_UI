import "./Template.scss";
import { ArrowBack } from "../../../assets";

const Template = () => (
  <div className="col-md-10 mt-3 bg-white">
    <p className="arrow-heading">
      <img alt="arrow" src={ArrowBack} className="arrow-back" />
      Back to Project Home
    </p>
    <p className="template-dashboard-title">Project Drug Trial</p>
    <h6 className="template-sub-title">
      Created on <span className="date-heading">August 15, 2023</span> by John Doe
    </h6>
    <h1 className="templates-title">Templates</h1>
  </div>
);

export default Template;
