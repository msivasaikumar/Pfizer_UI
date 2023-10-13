import React, { useEffect, useRef, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// eslint-disable-next-line import/no-unresolved
import "~bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line import/no-unresolved
import "~bootstrap/dist/js/bootstrap.min";

import "./App.scss";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import Header from "./components/common/Header/Header";
import HomePage from "./pages/Home/Home";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import ProjectTemplates from "./pages/ProjectTemplates/ProjectTemplates";
import ProjectDocuments from "./pages/ProjectDocuments/ProjectDocuments";
import DocumentAuthoringSidebar from "./components/DocumentAuthoringSidebar/DocumentAuthoringSidebar";
import UploadBox from "./components/common/UploadBox/UploadBox";
import QuillEditor from "./components/QuillEditor/QuillEditor";
import InfoCard from "./components/InfoCard/InfoCard";
import DocumentHeader from "./components/DocumentHeader/DocumentHeader";
import ToastMessage from "./components/common/ToastMessage/ToastMessage";
import ConfirmationBox from "./components/common/ConfirmationBox/ConfirmationBox";
import KebabMenuExample from "./components/examples/KebabMenuExample";
import { TOAST_TYPE } from "./models/components/enums";
import InputPrompt from "./pages/InputPrompt";
import TabsExample from "./components/examples/TabsExample";
import ApplicationCard from "./components/ApplicationCard/ApplicationCard";
import AppCardDetails from "./components/ApplicationCard/AppCardDetails";
import FolderData from "./components/FolderData/FolderData";
import SidebarContext from "./context/SidebarContext";
import EditDocument from "./pages/EditDocument/EditDocument";
import CreateTemplate from "./pages/CreateTemplate/CreateTemplate";
import Pgs from "./pages/Pgs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
});

const text = {
  heading: "Document Authoring",
  subHeading: "Home"
};

const messages = [
  {
    msg: "You are a research agent who is provided with a user query and some context. Your task is to answer questions which can help your team \nresearch on the user’s questions. These are previously asked questions: {unanswered_questions}",
    isReply: false
  },
  {
    msg: "This is a chat message reply",
    isReply: true,
    citationsContent: "MAX608.0.pdf, , pages :- 2, 4, 6"
  }
];

const appCardDetailsList = [
  {
    title: "Created: ",
    value: 12
  },
  {
    title: "Uploaded: ",
    value: 7
  }
];
const ChatMessages = () => (
  <div>
    {messages.map((message, index) => (
      <div key={index}>
        <ChatMessage textMessage={message.msg} isReply={message.isReply} citationsContent={message.citationsContent} />
      </div>
    ))}
  </div>
);

function App() {
  const rootRef = useRef(null);
  const [containerStart, setContainerStart] = useState(99);
  const [sidebarButtons, setSidebarButtons] = useState([]);
  useEffect(() => {
    if (rootRef.current) {
      setContainerStart(window.innerHeight - 16 - rootRef.current.getBoundingClientRect().top);
    }
  }, []);
  const [open, setIsOpen] = useState(true);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header heading={text.heading} subHeading={text.subHeading} />
        <div ref={rootRef} className="root-container d-flex justify-content-center px-2">
          <div className="main-container position-relative d-flex mb-2 mt-2" style={{ height: `${containerStart}px` }}>
            <SidebarContext.Provider value={useMemo(() => ({ sidebarButtons, setSidebarButtons }), [sidebarButtons, setSidebarButtons])}>
              <DocumentAuthoringSidebar buttons={sidebarButtons} user={{ firstName: "John", lastName: "Doe" }} />
              <div className="content-container col-md-10 ml-auto">
                <Routes>
                  {/* List of all projects */}
                  <Route path="/" element={<HomePage />} />
                  {/* Project details page */}
                  <Route path="/project/:id" element={<ProjectDetails />} />
                  <Route path="/input-prompt" element={<InputPrompt />} />
                  {/* TODO: to be moved to ProjectTemplates page once the component is ready */}
                  <Route path="/create-template" element={<CreateTemplate />} />
                  {/* manage templates for project */}
                  <Route path="/project/:id/templates" element={<ProjectTemplates />} />

                  {/* manage documents authored for project */}
                  <Route path="/project/:id/documents" element={<ProjectDocuments />} />

                  {/* open selected document from manage documents */}
                  <Route path="/document/:id" element={<EditDocument />} />

                  <Route path="/upload" element={<UploadBox title="test" />} />
                  <Route path="/chat" element={<ChatMessages />} />
                  <Route path="/edit" element={<QuillEditor />} />
                  <Route path="/info" element={<InfoCard header="Total Projects" info={37} />} />
                  <Route path="/toast" element={<ToastMessage severity={TOAST_TYPE.SUCCESS} isVisible message="This is a success message" />} />
                  <Route path="/kebab" element={<KebabMenuExample />} />
                  <Route path="/tabs" element={<TabsExample />} />
                  <Route
                    path="/app-card"
                    element={
                      <ApplicationCard
                        title="Manage Templates"
                        description="This contains all your created and uploaded templates and you can manage your existing templates or add new ones."
                        folderChildren={<FolderData title="Title" value={12} type="folder" />}
                        detailedChildren={<AppCardDetails detailsList={appCardDetailsList} />}
                        btnText="View"
                        className="mt-3"
                      />
                    }
                  />
                  <Route
                    path="/confirm"
                    element={
                      <ConfirmationBox isOpen={open} handleClose={() => setIsOpen(false)} agreeText="Agree" disagreeText="Disagree" title="Title">
                        <div>This can be any child component</div>
                      </ConfirmationBox>
                    }
                  />
                  <Route
                    path="/dochead"
                    element={
                      <DocumentHeader
                        navigationHeader="Back to Home"
                        documentNameLabel="Document Name : "
                        defaultTitle="Document Name"
                        templateLabel="template name : "
                        templateName="dummy"
                        numOfSections={4}
                        path="/info"
                      />
                    }
                  />
                  {/* PGS Pod Component */}
                  <Route path="/pgs" element={<Pgs />} />
                </Routes>
              </div>
            </SidebarContext.Provider>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
