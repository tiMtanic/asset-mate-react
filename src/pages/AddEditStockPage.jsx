import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddEditStockForm from "../components/AddEditStockForm";
import PageHeader from "../components/PageHeader";
import PageContent from "../components/PageContent";

function AddEditStockPage() {
  const { stockId } = useParams();
  const isEditMode = stockId != null;

  return (
    <Box>
      <PageHeader
        icon={isEditMode ? EditRoundedIcon : AddRoundedIcon}
        title={isEditMode ? "Edit Stock" : "Add Stock"}
        caption={
          isEditMode
            ? "Update the information for this stock"
            : "Add a new stock"
        }
      />
      <PageContent>
        <AddEditStockForm />
      </PageContent>
    </Box>
  );
}

export default AddEditStockPage;
