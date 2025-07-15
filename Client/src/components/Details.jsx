import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useNavigate } from 'react-router-dom';  // If you use navigation

const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await AddMovie(values);
      // naviagte("/admin/movies")
      dispatch(setLoading(false));
      message.success(response.message);
      navigate("/admin")
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
    console.log("hello",values)
  };

const Details = () => {
    return (
        <div>
        <Form
            layout="vertical"
            className="flex flex-col gap-5"
            onFinish={onFinish}
            initialValues={movie}
          >
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Name"
                name="name"
                rules={antValidatioError}
                className="col-span-2"
              >
                <input />
              </Form.Item>
              <Form.Item
                label="Release Date"
                name="releaseDate"
                rules={antValidatioError}
              >
                <input type="date" />
              </Form.Item>
            </div>
            <Form.Item label="Plot" name="plot" rules={antValidatioError}>
              <textarea />
            </Form.Item>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Hero"
                name="hero"
                rules={antValidatioError}
                className="col-span-1"
              >
                <Select showSearch options={artists}></Select>
              </Form.Item>
              <Form.Item
                label="Heroine"
                name="heroine"
                rules={antValidatioError}
              >
                <Select showSearch options={artists}></Select>
              </Form.Item>
              <Form.Item
                label="Director"
                name="director"
                rules={antValidatioError}
              >
                <Select showSearch options={artists}></Select>
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <Form.Item
                label="Genre"
                name="genre"
                rules={antValidatioError}
                className="col-span-1"
              >
                <Select
                  showSearch
                  options={[
                    {
                      value: "action",
                      label: "Action",
                    },
                    {
                      value: "comedy",
                      label: "Comedy",
                    },
                    {
                      value: "drama",
                      label: "Drama",
                    },
                    {
                      value: "horror",
                      label: "Horror",
                    },
                    {
                      value: "romance",
                      label: "Romance",
                    },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                label="Language"
                name="language"
                rules={antValidatioError}
              >
                <Select
                  showSearch
                  options={[
                    {
                      value: "english",
                      label: "English",
                    },
                    {
                      value: "telegu",
                      label: "Telegu",
                    },
                    {
                      value: "hindi",
                      label: "Hindi",
                    },
                  ]}
                ></Select>
              </Form.Item>
              <Form.Item
                label="Trailer"
                name="trailer"
                rules={antValidatioError}
              >
                <input type="text" />
              </Form.Item>
            </div>
            <Form.Item
              label="Cast & Crew"
              name="cast"
              rules={antValidatioError}
            >
              <Select mode="tags" options={artists}></Select>
            </Form.Item>
            <div className="flex justify-end gap-5">
              <Button onClick={() => navigate("/admin")}>Cancel</Button>
              <Button htmlType="submit" type="primary" >
                Save
              </Button>
            </div>
          </Form>
        
        </div>
    )
}

export default Details
