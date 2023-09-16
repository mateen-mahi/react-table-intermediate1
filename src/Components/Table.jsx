import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import Table from "react-bootstrap/Table";
import axios from "../Features/axios";
import { useSelector, useDispatch } from "react-redux";
import {
  emptyEditItem,
  editRow,
  toggleModel,
} from "../Features/Counter/ProductSlice";
import { MdDelete } from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import Model from "./Model";
import "./Table.css";

function Children() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const CheckBoxHandle = () => setIsChecked(!isChecked);
  const showModel = useSelector((state) => state.products.showModel);
  const freshApi = useSelector((state) => state.products.fresh);

  const getDataFunc = () => {
    axios
      .get("/items")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDataFunc();
  }, [freshApi]);

  const DeleteRowHandle = (deleteId) => {
    axios.delete(`/items/${deleteId}`)
    .then(getDataFunc)
    .catch(err =>console.log(err));
  };

  const SearchHandle = (e) => {
    setSearchItem(e.target.value);
  };

  const ToggleModelHandle = () => {
    dispatch(toggleModel());
  };

  const editRowHandle = (actionValue) => {
    dispatch(editRow(actionValue));
    dispatch(toggleModel());
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Group",
        accessor: "group",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Filter Method for Search and CheckBox
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (searchItem) {
        return row.values.name.toLowerCase().includes(searchItem.toLowerCase());
      } else if (!isChecked) {
        return row.values.status === "Active";
      }

      return true;
    });
  }, [rows, isChecked, searchItem]);

  return (
    <>
      {showModel && <Model />}
      <div className="tableContainer">
        <div className="TopFunctions">
          <h3>Customers List </h3>
          <div className="checkContainer">
            <input
              type="checkbox"
              onChange={CheckBoxHandle}
              name="inactive-check"
              id="inactive-check"
              className="form-check-input"
            />
            <label htmlFor="inactive-check" className="form-check-label">
              Show Inactive Customers
            </label>
          </div>
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search"
              name="search"
              onChange={SearchHandle}
              className="form-control"
            />
            <button
              onClick={() => {
                dispatch(emptyEditItem());
                ToggleModelHandle();
              }}
              className="btn btn-primary"
            >
              New
            </button>
          </div>
        </div>
        <Table bordered striped responsive="sm" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {filteredRows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                  <td>
                    <div className="iconContainer">
                      <MdDelete
                        className="delete-icon"
                        onClick={() => DeleteRowHandle(row.original.id)}
                      />
                      <BsFillPencilFill
                        className="edit-icon"
                        onClick={() => {
                          editRowHandle(row.original);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Children;
