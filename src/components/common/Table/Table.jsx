import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import "./Table.scss";

export default function Table({
  rows = [],
  isPaginated = false,
  handlePageChange = () => {},
  rowsPerPage = 5,
  pageNo = 0,
  totalItems = rows.length - 1
}) {
  return (
    <div className="table-container">
      {rows.length > 0 && (
        <TableContainer>
          <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {rows[0].map((cell, index) => (
                  <TableCell sx={{ flexGrow: 1 }} key={index}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(isPaginated ? rows.slice(1).slice(pageNo * rowsPerPage, pageNo * rowsPerPage + rowsPerPage) : rows.slice(1)).map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  {row.map((cell, idx) => (
                    <TableCell key={idx} component="th" scope="row">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
          {isPaginated && (
            <div className="d-flex align-items-center justify-content-between pagination-container">
              <p className="records-count">
                Displaying {rows.length - 1} of {totalItems} records
              </p>
              <TablePagination
                component="div"
                count={totalItems}
                rowsPerPageOptions={[]}
                rowsPerPage={rowsPerPage}
                page={pageNo}
                onPageChange={handlePageChange}
                labelDisplayedRows={() => `${pageNo + 1} of ${Math.ceil(totalItems / rowsPerPage)}`}
                showFirstButton
                showLastButton
              />
            </div>
          )}
        </TableContainer>
      )}
    </div>
  );
}
