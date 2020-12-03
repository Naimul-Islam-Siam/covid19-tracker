const styleConfirmedTotal = {
   color: "#DE3700"
}

const styleRecoveredTotal = {
   color: "rgb(96, 187, 105)"
}

const styleDeceasedTotal = {
   color: "#CC1034"
}


export const styleInfoBox = {
   display: "flex",
   flexDirection: "column",
   alignItems: "center"
};

export const styleInfoBoxTitle = {
   fontSize: "16px",
   color: "#333333",
   fontWeight: "600",
   marginBottom: "10px"
}

export const styleTotalFunc = title => {
   let styleTotal;

   if (title.toLowerCase() === "confirmed") {
      styleTotal = styleConfirmedTotal;
   }

   if (title.toLowerCase() === "recovered") {
      styleTotal = styleRecoveredTotal;
   }

   if (title.toLowerCase() === "deceased") {
      styleTotal = styleDeceasedTotal;
   }

   const margin = { marginBottom: "7px" };

   styleTotal = { ...styleTotal, ...margin };

   return styleTotal;
};

export const percentageStyle = {
   fontSize: "12px",
   fontWeight: "300"
};