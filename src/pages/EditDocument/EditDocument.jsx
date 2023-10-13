import DocumentHeader from "../../components/DocumentHeader/DocumentHeader";

const EditDocument = () => (
  <div className="p-4">
    <DocumentHeader
      navigationHeader="Back to Home"
      documentNameLabel="Document Name : "
      defaultTitle="Document Name"
      templateLabel="template name : "
      templateName="dummy"
      numOfSections={4}
      path="/"
    />
  </div>
);

export default EditDocument;
