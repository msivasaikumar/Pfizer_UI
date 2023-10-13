import { useState, useEffect, useRef, useContext } from "react";
import "./Home.scss";
import CountsCard from "../../components/common/CountsCard/CountsCard";
import { cardList, MyProjects, ProjectSpecificData } from "../../jsonData";
import Table from "../../components/common/Table/Table";
import { ProjectTableHeaders } from "../../utils/constants";
import Button from "@mui/material/Button";
import KebabMenu from "../../components/common/KebabMenu/KebabMenu";
import EditIcon from "../../assets/images/edit.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";
import ConfirmationBox from "../../components/common/ConfirmationBox/ConfirmationBox";
import CreateEditDeleteProject from "../../components/CreateEditProjectForm/CreateEditDeleteProject";
import Plus from "../../assets/icons/plus.svg";
import SidebarContext from "../../context/SidebarContext";

export default function HomePage() {
  const [tableRows, setTableRows] = useState([[...ProjectTableHeaders]]);
  const [tablePageNo, setTablePageNo] = useState(0);
  const [openModal, setOpenModal] = useState(false); // [create|edit|delete] to open
  const selectedProjectRef = useRef({});
  const [actionType, setActionType] = useState("");
  const sidebarContext = useContext(SidebarContext);
  const kebabMenuOptions = [
    {
      key: "edit",
      label: "Edit",
      icon: EditIcon
    },
    {
      key: "delete",
      label: "Delete",
      icon: DeleteIcon
    }
  ];

  const handleKebabMenuItemClick = (optionIndex, selectionFor = "") => {
    const selectedValue = ProjectSpecificData.filter((item) => item.project_name === selectionFor)[0];
    selectedProjectRef.current = selectedValue;
    setActionType(kebabMenuOptions[optionIndex].key);
    setOpenModal(true);
  };

  const generateTableContent = () => {
    const newTableData = [...tableRows];
    MyProjects.forEach((project, index) => {
      newTableData[index + 1] = [
        project.project_name,
        project.domain,
        project.last_updated,
        project.owner,
        <div key={index} className="d-flex">
          <Button variant="text" sx={{ textDecoration: "underline" }} onClick={() => console.warn("Viewing ", project.project_name)}>
            View Details
          </Button>
          <KebabMenu
            handleMenuItemClick={(optionIndex) => handleKebabMenuItemClick(optionIndex, project.project_name)}
            menuOptions={kebabMenuOptions}
            closeOnSelect
          />
        </div>
      ];
    });
    setTableRows(newTableData);
  };

  useEffect(() => {
    generateTableContent();
    sidebarContext.setSidebarButtons([
      {
        text: "Create Project",
        onClick: () => {
          setActionType("create");
          setOpenModal(true);
        },
        icon: Plus
      }
    ]);
  }, []);

  return (
    <div className="home-container">
      <h1 className="heading">Overview</h1>
      <div className="cards-container d-flex">
        {cardList.map((cardData, index) => (
          <CountsCard key={index} title={cardData.title} count={cardData.count} />
        ))}
      </div>
      <h1 className="heading mt-5 mb-3">All Projects</h1>
      <Table rows={tableRows} isPaginated pageNo={tablePageNo} handlePageChange={(_, newPage) => setTablePageNo(newPage)} />
      <ConfirmationBox
        title={`${actionType === "create" ? "Create" : actionType === "edit" ? "Edit" : "Delete"} Project`}
        isOpen={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <CreateEditDeleteProject actionType={actionType} projectData={selectedProjectRef.current} />
      </ConfirmationBox>
    </div>
  );
}
