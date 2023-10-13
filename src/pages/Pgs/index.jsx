import React, { useState } from "react";
import ChatContainer from "../../components/ChatContainer";
import RootCauseAnalysis from "../../components/RootCauseAnalysis";
import TabsContainer from "../../components/common/TabsContainer/TabsContainer";

import "./index.scss";

function Pgs() {
  const [activeTab, setActiveTab] = useState(0);

  const switchToTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabLabels = ["Root Cause Analysis", "Incident description"];

  return (
    <div className="App">
      <div className="tab-content">
        <TabsContainer
          tabLabels={tabLabels}
          tabsAriaLabel="Asset and Derivative Tabs"
          activeTabIndex={activeTab}
          handleChange={switchToTab}
          isSticky
        />
        {activeTab === 1 && <ChatContainer />}
        {activeTab === 0 && <RootCauseAnalysis activeTab={activeTab} switchToTab={switchToTab} />}
      </div>
    </div>
  );
}

export default Pgs;
