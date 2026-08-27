import { Card, CardContent } from "@mui/material";
import React from "react";

function PageContent({ children, displayWithoutCard }) {
  return (
    <>
      {!displayWithoutCard ?
      <Card>
        <CardContent>{children}</CardContent>
      </Card> : children}
    </>
  );
}

export default PageContent;
