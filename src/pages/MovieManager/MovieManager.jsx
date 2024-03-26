import React, { Fragment, useEffect } from "react";
import { Button, Space, Table } from "antd";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovieThunk } from "../../redux/slice/phimSlice";
import { NavLink } from "react-router-dom";

const MovieManager = () => {
  const { arrMovie } = useSelector((state) => state.phimSlice);
  // console.log(arrMovie);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMovieThunk("abc"));
  }, []);
  const { Search } = Input;

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      // value: (text, object) => {
      //   return <span>{text}</span>;
      // },
      sorter: (a, b) => a.maPhim - b.maPhim,
      defaultSortOrder: "descend",
      // sortDirections: ["descend"],
      width: "15%",
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      width: "15%",
      render: (text, film) => {
        return (
          <>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              style={{
                width: "50px",
                height: "50px",
                display: "block",
                margin: "0 auto",
              }}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${film}/50/50`;
              }}
            />
          </>
        );
      },
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend"],
      width: "20%",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text) => <div className="line-clamp-2">{text}</div>,
      // sorter: (a, b) => {
      //   let moTaA = a.moTa.toLowerCase().trim();
      //   let moTaB = b.moTa.toLowerCase().trim();
      //   if (moTaA > moTaB) {
      //     return 1;
      //   }
      //   return -1;
      // },
      // sortDirections: ["ascend"],
      width: "35%",
      align: "center",
    },
    {
      title: " Actions",
      dataIndex: "hanhDong",
      render: (text, film) => {
        return (
          <Fragment className="text-center">
            <NavLink className="mr-5 text-2xl" to="/">
              <button className="text-blue-400">
                <i class="fa-thin fa-pen-to-square"></i>
              </button>
            </NavLink>
            <NavLink className="text-2xl" to="/">
              <button className="text-red-600">
                <i class="fa-thin fa-trash"></i>
              </button>
            </NavLink>
          </Fragment>
        );
      },

      width: "15%",
      align: "center",
    },
  ];
  const data = arrMovie;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <h3 className="text-4xl mb-5">Quản lý phim</h3>
      <NavLink className="mb-5" to="/admin/them-phim">
        <Button className="mb-5">Thêm phim</Button>
      </NavLink>
      <Search
        className="mb-5"
        placeholder="input search text"
        allowClear
        size="large"
        onSearch={onSearch}
      />
      <Table
        className="text-center"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};

export default MovieManager;
