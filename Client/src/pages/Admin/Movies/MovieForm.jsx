import { Button, Form, Select, Tabs, message, Upload } from "antd";
import Item from "antd/es/list/Item";
import { useCallback, useEffect, useState } from "react";
import { antValidatioError } from "../../../helpers";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLoading } from "../../../redux/loadersSlice";
import { GetAllArtists } from "../../../apis/artists";
import { AddMovie, GetMovieById, UpdateMovie } from "../../../apis/movies";
import { UploadImage } from "../../../apis/images";

function MovieForm() {
  const [artists, setArtists] = useState();
  const [movie, setMovies] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [file, setFile] = useState(null);

  const onFinish = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await AddMovie(values);
      dispatch(setLoading(false));
      message.success(response.message);
      navigate("/admin");
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
    console.log("hello", values);
  };
  const onSubmit = async (values) => {
      console.log("selected", selectedArtist);
      try {
        dispatch(setLoading(true));
        // const response = await AddArtist(values);
        let response;
        if (selectedArtist) {
          response = await UpdateMovie(selectedMovie._id, values);
        } else {
          response = await AddArtist(values);
        }
        reloadData();
        dispatch(setLoading(false));
        setShowArtistModal(false);
        console.log("res====", response);
        message.success(response.message);
      } catch (error) {
        message.error(error.message);
        dispatch(setLoading(false));
      }
    };
    
  const fetchAllArtists = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetAllArtists();
      setArtists(
        response.data.map((artist) => ({
          value: artist._id,
          label: artist.name,
        }))
      );
      dispatch(setLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(setLoading(false));
    }
  };

  const getMovieById = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await GetMovieById(id);
      setMovies(response.data);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  const fetchData = useCallback(async () => {
    if (params.id) {
      getMovieById(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    fetchAllArtists();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const imageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      dispatch(setLoading(true));
      const response = await UploadImage(formData);
      if (response.success) {
        await UpdateMovie(movie._id, {
          ...movie,
          images: [...(movie?.images || []), response.data],
        });
      }
      dispatch(setLoading(false));
      message.success(response.message);
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  const deleteImage = async (image) => {
    try {
      dispatch(setLoading(true));
      const updatedImages = movie?.images?.filter((item) => item !== image);
      const response = await UpdateMovie(movie._id, { ...movie, images: updatedImages });
      dispatch(setLoading(false));
      message.success(response.message);
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  return (
    (movie || !params.id) && (
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-gray-600 text-xl font-semibold">
            {movie ? "Update Movie" : "Add Movie"}
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => navigate("/admin")}
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 justify-end"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <Tabs>
          <Item tab="Detail" key="1">
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
                      { value: "action", label: "Action" },
                      { value: "comedy", label: "Comedy" },
                      { value: "drama", label: "Drama" },
                      { value: "horror", label: "Horror" },
                      { value: "romance", label: "Romance" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Language"
                  name="language"
                  rules={antValidatioError}
                >
                  <Select
                    showSearch
                    options={[
                      { value: "english", label: "English" },
                      { value: "telegu", label: "Telegu" },
                      { value: "hindi", label: "Hindi" },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Trailer" name="trailer" rules={antValidatioError}>
                  <input type="text" />
                </Form.Item>
              </div>
              <Form.Item label="Cast & Crew" name="cast" rules={antValidatioError}>
                <Select mode="tags" options={artists} />
              </Form.Item>
              <div className="flex justify-end gap-5">
                <Button onClick={() => navigate("/admin")}>Cancel</Button>
                <Button htmlType="submit" type="primary">
                  Save
                </Button>
              </div>
            </Form>
          </Item>

          <Item tab="Poster" key="2">
            <div className="flex flex-wrap gap-5 mb-10">
              {movie?.images?.map((image) => (
                <div key={image} className="flex gap-5 border border-dashed p-3">
                  <img
                    src={image}
                    alt=""
                    className="w-20 h-20 object-cover"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 float-right"
                    onClick={() => deleteImage(image)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              ))}
                 
              </div>
              <div className="flex justify-end gap-5">
                <Button onClick={() => navigate("/admin")}>Cancel</Button>
                <Button htmlType="submit" type="primary">
                  Save
                </Button>
            </div>

            {/* <Upload
              onChange={(info) => {
                setFile(info.file);
                console.log("info file", info);
              }}
              beforeUpload={() => false}
              listType="picture"
            >
              <Button onClick={imageUpload}>Upload Poster</Button>
            </Upload> */}
            <Upload
              // fileList={[file]}
              onChange={(info) => {
                setFile(info.file);
                console.log("info file", info);
              }}
              beforeUpload={() => false}
              listType="picture"
            >
              <Button> upload</Button>
            </Upload>
          </Item>
        </Tabs>
      </div>
    )
  );
}

export default MovieForm;

// import { Button, Form, Select, Tabs, message } from "antd";
// import Item from "antd/es/list/Item";
// import { useCallback, useEffect, useState } from "react";
// import { antValidatioError } from "../../../helpers";
// import { useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { setLoading } from "../../../redux/loadersSlice";
// import { GetAllArtists } from "../../../apis/artists";
// import { AddMovie, GetMovieById } from "../../../apis/movies";
// import Details from "../../../components/Details";

// function MovieForm() {
//   const [artists, setArtists] = useState();
//   // const [movie,setMovies]=useState({});
//   const [movie,setMovies]=useState()
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const params=useParams()
//   const onFinish = async (values) => {
//     try {
//       dispatch(setLoading(true));
//       const response = await AddMovie(values);
//       // naviagte("/admin/movies")
//       dispatch(setLoading(false));
//       message.success(response.message);
//       navigate("/admin")
//     } catch (error) {
//       dispatch(setLoading(false));
//       message.error(error.message);
//     }
//     console.log("hello",values)
//   };

//   const fetchAllArtists = async () => {
//     try {
//       dispatch(setLoading(true));
//       const response = await GetAllArtists();
//       setArtists(
//         response.data.map((artist) => ({
//           value: artist._id,
//           label: artist.name,
//         }))
//       );
//       dispatch(setLoading(false));
//     } catch (error) {
//       message.error(error.message);
//       dispatch(setLoading(false));
//     }
//   };
//   const getMovieById=async(id)=>{
//     try {
//       dispatch(setLoading(true));
//       const response = await GetMovieById(id);
//       console.log("res11===============",response)
//       setMovies(response.data)
//       console.log("movie=============",movie)
//       dispatch(setLoading(false));
//     } catch (error) {
//       dispatch(setLoading(false));
//       message.error(error.message);
//     }
//   }
//   const fetchData = useCallback(async()=> {
//     console.log("params",params)
//     if(params.id)
//     {console.log("---------------------------------------------------")
//        getMovieById(params.id)
//       console.log("======================================================")
//     }
//     console.log("movie1111",movie)
//   }, [])
//   useEffect(() => {
//     fetchAllArtists();
//   }, []);
//   useEffect(()=>{
//     fetchData()

//   },[fetchData])
//   return (
//   (movie || !params.id) && <div>
//       <div className="flex justify-between items-center ">
//         <h1 className="text-gray-600 text-xl font-semibold">{movie ? "Update Movie" : "Add Movie"}</h1>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           onClick={() => navigate("/admin")}
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6 justify-end"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg>
//       </div>

//       <Tabs>
//         {<Item tab="Details" key="1">
//           <Form
//             layout="vertical"
//             className="flex flex-col gap-5"
//             onFinish={onFinish}
//             initialValues={movie}
//           >
//             <div className="grid grid-cols-3 gap-5">
//               <Form.Item
//                 label="Name"
//                 name="name"
//                 rules={antValidatioError}
//                 className="col-span-2"
//               >
//                 <input />
//               </Form.Item>
//               <Form.Item
//                 label="Release Date"
//                 name="releaseDate"
//                 rules={antValidatioError}
//               >
//                 <input type="date" />
//               </Form.Item>
//             </div>
//             <Form.Item label="Plot" name="plot" rules={antValidatioError}>
//               <textarea />
//             </Form.Item>
//             <div className="grid grid-cols-3 gap-5">
//               <Form.Item
//                 label="Hero"
//                 name="hero"
//                 rules={antValidatioError}
//                 className="col-span-1"
//               >
//                 <Select showSearch options={artists}></Select>
//               </Form.Item>
//               <Form.Item
//                 label="Heroine"
//                 name="heroine"
//                 rules={antValidatioError}
//               >
//                 <Select showSearch options={artists}></Select>
//               </Form.Item>
//               <Form.Item
//                 label="Director"
//                 name="director"
//                 rules={antValidatioError}
//               >
//                 <Select showSearch options={artists}></Select>
//               </Form.Item>
//             </div>
//             <div className="grid grid-cols-3 gap-5">
//               <Form.Item
//                 label="Genre"
//                 name="genre"
//                 rules={antValidatioError}
//                 className="col-span-1"
//               >
//                 <Select
//                   showSearch
//                   options={[
//                     {
//                       value: "action",
//                       label: "Action",
//                     },
//                     {
//                       value: "comedy",
//                       label: "Comedy",
//                     },
//                     {
//                       value: "drama",
//                       label: "Drama",
//                     },
//                     {
//                       value: "horror",
//                       label: "Horror",
//                     },
//                     {
//                       value: "romance",
//                       label: "Romance",
//                     },
//                   ]}
//                 ></Select>
//               </Form.Item>
//               <Form.Item
//                 label="Language"
//                 name="language"
//                 rules={antValidatioError}
//               >
//                 <Select
//                   showSearch
//                   options={[
//                     {
//                       value: "english",
//                       label: "English",
//                     },
//                     {
//                       value: "telegu",
//                       label: "Telegu",
//                     },
//                     {
//                       value: "hindi",
//                       label: "Hindi",
//                     },
//                   ]}
//                 ></Select>
//               </Form.Item>
//               <Form.Item
//                 label="Trailer"
//                 name="trailer"
//                 rules={antValidatioError}
//               >
//                 <input type="text" />
//               </Form.Item>
//             </div>
//             <Form.Item
//               label="Cast & Crew"
//               name="cast"
//               rules={antValidatioError}
//             >
//               <Select mode="tags" options={artists}></Select>
//             </Form.Item>
//             <div className="flex justify-end gap-5">
//               <Button onClick={() => navigate("/admin")}>Cancel</Button>
//               <Button htmlType="submit" type="primary" >
//                 Save
//               </Button>
//             </div>
//           </Form>
//         </Item>}
//         {/* <Item tab="Details" key="1"> */}
//         {/* <Details/> */}
//         {/* </Item> */}
//         <Item tab="Poster" key="2">
//         {/* <Item tab="Image" key="2" disabled={!movie}> */}
//           <div className="flex flex-wrap gap-5 mb-10">
//             {movie?.images?.map((image) => (
//               <div key={image} className="flex gap-5 border border-dashed p-3 ">
//                 <img
//                   src={movie?.images?.[0]}  
//                   alt=""
//                   className="w-20 h-20 object-cover"
//                 ></img>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-6 h-6 float-right"
//                   onClick={() => {
//                     deleteImage(image);
//                   }}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                   />
//                 </svg>
//               </div>
//             ))}
//             </div>

//             <Upload
//               // fileList={[file]}
//               onChange={(info) => {
//                 setFile(info.file);
//                 console.log("info file", info);
//               }}
//               beforeUpload={() => false}
//               listType="picture"
//             >
//               <Button> upload</Button>
//             </Upload>
//           </Item>
//         {/* </Item> */}
//       </Tabs>
//     </div>
//   );
// }

// export default MovieForm;
