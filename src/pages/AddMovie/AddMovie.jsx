import React, { useContext, useState } from "react";
import InputCustom from "../../components/Input/InputCustom";
import { DatePicker, Switch, Rate, Button } from "antd";
import { useFormik } from "formik";
import { quanLyPhimServ } from "../../services/quanLyPhim";
import moment from "moment";
import * as Yup from "yup";
import Lottie from "react-lottie";
import * as addMovieAnimation from "./../../assets/animation/addMovie.json";
import "./addmovie.scss";
import { NotifyContext } from "../../template/AdminTemplate/AdminTemplate";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();
  const notify = useContext(NotifyContext);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: addMovieAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const disableDate = (current) => {
    const today = moment();
    return current && current < today;
  };
  const [image, setImage] = useState();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setFieldValue,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: true,
      dangChieu: false,
      hot: true,
      danhGia: 8,
      hinhAnh: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        // thực hiện tạo một đối tượng từ lớp đối tượng FormData
        let formData = new FormData();
        // sử dụng for in để duyệt object qua từng key và lấy dữ liệu truyền vào formdata
        for (let key in values) {
          if (key == "hinhAnh") {
            formData.append("File", values[key]);
          } else {
            formData.append(key, values[key]);
          }
        }

        const res = await quanLyPhimServ.themPhimUploadHinh(formData);
        notify("thêm phim thành công! chuyển hướng về trang quản lý phim");
        resetForm();
        setTimeout(() => {
          navigate("/admin/quan-li-phim");
        }, 1000);
        console.log(res);
      } catch (error) {
        console.log(error);
        // notify(error.respone.data.content);
      }
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().required("Vui lòng không bỏ trống"),
      trailer: Yup.string().required("Vui lòng không bỏ trống"),
      moTa: Yup.string().required("Vui lòng không bỏ trống"),
      ngayKhoiChieu: Yup.string().required("Vui lòng không bỏ trống"),
    }),
  });
  return (
    <div>
      <h3 className="text-4xl mb-5">Thêm phim mới</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="w-1/2 mr-5 mb-5">
            <InputCustom
              name="tenPhim"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.tenPhim}
              error={errors.tenPhim}
              touched={touched.tenPhim}
              label="Tên phim"
              placeholder="Nhập tên phim"
            />
          </div>
          <div className="w-1/2">
            <InputCustom
              name="trailer"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.trailer}
              error={errors.trailer}
              touched={touched.trailer}
              label="Trailer"
              placeholder="Nhập trailer"
            />
          </div>
        </div>
        <InputCustom
          name="moTa"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.moTa}
          error={errors.moTa}
          touched={touched.moTa}
          label="Mô tả"
          placeholder="Nhập mô tả"
        />
        <div className="flex justify-center mb-5 mt-5 text-center">
          <div className="w-2/6 my-auto">
            <label className="mr-2 label" htmlFor="">
              Nhập ngày chiếu
            </label>
            <DatePicker
              name="ngayKhoiChieu"
              onBlur={handleBlur}
              value={
                values.ngayKhoiChieu
                  ? moment(values.ngayKhoiChieu, "DD-MM-YYYY")
                  : null
              }
              // error={errors.ngayKhoiChieu}
              // touched={touched.ngayKhoiChieu}
              disabledDate={disableDate}
              onChange={(datejs, dateString) => {
                setFieldValue("ngayKhoiChieu", dateString);
              }}
              format="DD-MM-YYYY"
              // className={
              //   touched.ngayKhoiChieu && errors.ngayKhoiChieu ? "has-error" : ""
              // }
            />
            {touched.ngayKhoiChieu && errors.ngayKhoiChieu ? (
              <p className="text-red-500 text-sm">{errors.ngayKhoiChieu}</p>
            ) : null}
          </div>
          <div className="w-1/6 my-auto">
            <label className="mr-2 label" htmlFor="">
              Đang chiếu
            </label>

            <Switch
              defaultChecked
              onChange={(checked, event) => {
                console.log(checked);
                setFieldValue("dangChieu", checked);
              }}
              value={values.dangChieu}
            />
          </div>
          <div className="w-1/6 my-auto">
            <label className="mr-2 label" htmlFor="">
              Sắp chiếu
            </label>
            <Switch
              defaultChecked
              onChange={(checked, event) => {
                console.log(checked);
                setFieldValue("sapChieu", checked);
              }}
              value={values.sapChieu}
            />
          </div>
          <div className="w-1/6 my-auto">
            <label className="mr-2 label" htmlFor="">
              Hot
            </label>
            <Switch
              defaultChecked
              onChange={(checked, event) => {
                console.log(checked);
                setFieldValue("hot", checked);
              }}
              value={values.hot}
            />
          </div>
          <div className="w-1/6 my-auto">
            <label className="mr-2 label" htmlFor="">
              Đánh giá
            </label>
            <Rate
              onChange={(value) => {
                // console.log(value * 2);
                setFieldValue("danhGia", value * 2);
              }}
              value={values.danhGia / 2}
              allowHalf
            />
            {/* <p>{values.danhGia}</p> */}
          </div>
        </div>

        <div className="flex mb-5">
          <div className="take-pic flex-col w-5/12">
            <label htmlFor="">Hình ảnh</label>
            <br />
            <input
              className="mb-5"
              onChange={(event) => {
                let urlImage = URL.createObjectURL(event.target.files[0]);
                console.log(urlImage);
                setImage(urlImage);
                setFieldValue("hinhAnh", event.target.files[0]);
              }}
              type="file"
            />
            <img className="w-3/4" src={image} alt="" />
          </div>
          <div className="animation_addMovie my-auto w-7/12">
            <Lottie options={defaultOptions} height={400} width={600} />
          </div>
        </div>
        <div style={{ display: "grid", placeItems: "center" }}>
          <button
            // onClick={() => {
            //   notify("Thêm phim thành công!");
            // }}
            className="box"
            type="submit"
          >
            Thêm phim
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
