import React, { useState, useEffect, useContext } from "react";
import "../TopBar/TopBar.css";
import "./InventoryPage.css";
import NumberFormat from "react-number-format";
import recommended from "../../icons/Recommend.png";
import inputimage from "../../icons/Edit Profile Pict.png";
import removecat from "../../icons/RemoveCat.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faXmark,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@material-ui/core/Switch";
import { useIosSwitchStyles } from "./switch/index";

<<<<<<< HEAD
=======
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { connect } from "react-redux";
import { useMinimalSelectStyles } from "./select/index";
import TopBar from "../TopBar/TopBar";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { connect } from "react-redux";
import { useMinimalSelectStyles } from "./select/index";
const UP = -1;
const DOWN = 1;

function InventoryPage({ tenant }) {
<<<<<<< HEAD
  const items = [
    {
      id: 1,
      name: "Gurame",
      menu: [
        {
          id: 1,
          name: "Gurame Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "Lalala",
          recommended: true,
        },
        {
          id: 2,
          name: "Gurame Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 20,
          description: "Lalalalalalalala",
          recommended: false,
        },
      ],
    },
    {
      id: 2,
      name: "Kerapu",
      menu: [
        {
          id: 1,
          name: "Kerapu Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "lululululullu",
          recommended: true,
        },
        {
          id: 2,
          name: "Kerapu Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 40,
          description: "lulululullululu",
          recommended: false,
        },
      ],
    },
    {
      id: 3,
      name: "Udang",
      menu: [
        {
          id: 1,
          name: "Udang Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 90,
          description: "asdasdasdasda",
          recommended: true,
        },
        {
          id: 2,
          name: "Udang Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 70,
          description: "asdasdadasdadasdasdad",
          recommended: false,
        },
      ],
    },
    {
      id: 4,
      name: "Sayur",
      menu: [
        {
          id: 1,
          name: "Sayur Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "werwrewerwerwer",
          recommended: true,
        },
        {
          id: 2,
          name: "Sayur Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "asdasdadwqdwqdqwdq",
          recommended: false,
        },
        {
          id: 3,
          name: "Sayur Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 50,
          description: "iuitutyutyututyuy",
          recommended: true,
        },
        {
          id: 4,
          name: "Sayur Asam Pedas",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "iyuiyuiyuiyuiyuiyui",
          recommended: true,
        },
      ],
    },
  ];

  const [state, setState] = useState({ items });
  // set new state for bind key items
  const [value, setValue] = useState(1);
  const [catname, setCatname] = useState(null);
  const [formValues, setFormValues] = useState("");

  const [addcatopen, setAddCatopen] = useState(false);
  const handleAddCatopen = () => setAddCatopen(true);
  const handleAddCatclose = () => setAddCatopen(false);

  const [removecategoryopen, setRemoveCategoryOpen] = useState(false);

  function handleRemoveCat(catname) {
    setRemoveCategoryOpen(true);
    setCatname(catname);
  }
  const handleRemoveCatClose = () => setRemoveCategoryOpen(false);

  const [A, setA] = useState(null);
  const [B, setB] = useState(null);
  const [C, setC] = useState(null);
  const [val, setVal] = useState(null);

  const [edititemopen, setEdititemopen] = useState(false);
  const [edittoggled, setEdittoggled] = useState(null);
  const [productimage, setProductimage] = useState();

  function handlePassInfoShow(
    name,
    price,
    recommend,
    description,
    picture,
    category
  ) {
    setEdititemopen(true);
    setA(name);
    setB(price);
    setC(description);
    setVal(category - 1);
    setProductimage(picture);
    setEdittoggled(recommend);
  }

  console.log("pict", productimage);

  const handleEdititemclose = () => setEdititemopen(false);
=======
  const localUrl = process.env.REACT_APP_MENUURL;
  const imageUrl = process.env.REACT_APP_IMAGEURL;

  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryRetrieved, setInventoryRetrieved] = useState(false);

  const [addcategoryopen, setAddCategoryOpen] = useState(false);
  const [editcategory, setEditCategory] = useState(false);

  const [ValidCategoryName, setValidCategoryName] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState();
  const [categoryName, setCategoryName] = useState();
  const [categoryID, setCategoryID] = useState();
  const [itemID, setItemID] = useState();
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

  const [removecategoryopen, setRemoveCategoryOpen] = useState(false);
  const [additemopen, setAdditemopen] = useState(false);

<<<<<<< HEAD
  const [addtoggled, setAddtoggled] = useState(false);
=======
  const [itemName, setItemName] = useState();
  const [itemDuration, setItemDuration] = useState();
  const [itemDescription, setItemDescription] = useState();
  const [itemIsRecommended, setItemIsRecommended] = useState(false);
  const [itemPrice, setItemPrice] = useState();
  const [itemQuantity, setItemQuantity] = useState(0);

  const [edititemopen, setEditItemOpen] = useState(false);
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

  const [productImage, setProductImage] = useState();

  function handlePassInfoShow(
    name,
    menuImage,
    category,
    cookingtime,
    price,
    recommend,
    description,
    quantity
  ) {
    setEditItemOpen(true);
    setItemName(name);
    setItemDuration(cookingtime);
    setItemPrice(price);
    setItemDescription(description);
    setCategoryID(category);
    setProductImage(menuImage);
    setItemIsRecommended(recommend);
    setItemQuantity(quantity);
  }
  const iosStyles = useIosSwitchStyles();

  function handleMove(id, direction) {
    const items = inventoryData[0];


    const position = items.findIndex((i) => i.category.id === id);


    if (position < 0) {
      throw new Error("Given item not found.");
    } else if (
      (direction === UP && position === 0) ||
      (direction === DOWN && position === items.length - 1)
    ) {
      return; // canot move outside of array
    }

    const item = items[position]; // save item for later
    const newItems = items.filter((i) => i.category.id !== id); // remove item from array
    newItems.splice(position + direction, 0, item);

    setInventoryData([newItems]);
  }

  const [itemval, setItemval] = useState([]);

  function handleIncrement(i, v) {
    {
<<<<<<< HEAD
      categoryList.map((post, index) => {
        {
          if (post.id === i) {
            post.menu.map((posts, index) => {
=======
      inventoryData.map((item) => {
        return item.map((post, index) => {
          if (post.category.id === i) {
            post.category.menu.map((posts, index) => {
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
              if (posts.id === v) {
                posts.quantity = parseInt(posts.quantity) + 1;
                const url = localUrl + "/edit/" + tenant.tenant_id;
                fetch(url, {
                  method: "POST",
                  body: JSON.stringify({
                    cat_id: i,
                    menu_id: v,
                    menu_quantity: parseInt(posts.quantity),
                  }),
                  headers: { "content-type": "application/JSON" },
                })
                  .then((response) => response.json())
                  .then((result) => {
                    if (result.status === "SUCCESS") {
               
                      socket.emit("update category", result.data);
                      setInventoryData([result.data]);
                    } 
                  });
              }
            });
          }
          setItemval({ post });
        });
      });
    }
  }

  function handleDecrement(i, v) {
    {
<<<<<<< HEAD
      categoryList.map((post, index) => {
        {
          if (post.id === i) {
            post.menu.map((posts, index) => {
=======
      inventoryData.map((item) => {
        return item.map((post, index) => {
          if (post.category.id === i) {
            post.category.menu.map((posts, index) => {
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
              if (posts.id === v) {
                posts.quantity = parseInt(posts.quantity) - 1;
               
                const url = localUrl + "/edit/" + tenant.tenant_id;
                fetch(url, {
                  method: "POST",
                  body: JSON.stringify({
                    cat_id: i,
                    menu_id: v,
                    menu_quantity: parseInt(posts.quantity),
                  }),
                  headers: { "content-type": "application/JSON" },
                })
                  .then((response) => response.json())
                  .then((result) => {
                    if (result.status === "SUCCESS") {
                     
                      socket.emit("update category", result.data);
                      setInventoryData([result.data]);
                    } 
                  });
              }
            });
          }
          setItemval({ post });
        });
      });
    }
  }

  function handleChange(e) {
    setFormValues({ value: e.target.value });
  }

<<<<<<< HEAD
  function handlequantityvalChange(i,v,j){

    {
      categoryList.map((post, index) => {
        {
          if (post.id === i) {
            post.menu.map((posts, index) => {
              if (posts.id === v) {
                posts.quantity = j.target.value;
                return post;
              } else {
                return post;
              }
            });
          }

          console.log(post);
          setItemval({ post });
        }
=======
  function handlequantityvalChange(i, v, j) {
    {
      inventoryData.map((item) => {
        return item.map((post, index) => {
          if (post.category.id === i) {
            post.category.menu.map((posts, index) => {
              if (posts.id === v) {
                posts.quantity = j;
                const url = localUrl + "/edit/" + tenant.tenant_id;
                fetch(url, {
                  method: "POST",
                  body: JSON.stringify({
                    cat_id: i,
                    menu_id: v,
                    menu_quantity: parseInt(posts.quantity),
                  }),
                  headers: { "content-type": "application/JSON" },
                })
                  .then((response) => response.json())
                  .then((result) => {
                    if (result.status === "SUCCESS") {
                
                      socket.emit("update category", result.data);
                      setInventoryData([result.data]);
                    } 
                  });
              }
            });
          }
          setItemval({ post });
        });
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
      });
    }
  }

  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProductImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

<<<<<<< HEAD
  function handleRemoveCategory(e) {
    setRemoveCategoryOpen(false);
    console.log("nani", e);
  }

  //select drop down
  const minimalSelectClasses  = useMinimalSelectStyles();
=======
  //select drop down
  const minimalSelectClasses = useMinimalSelectStyles();
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

  // moves the menu below the select input
  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };

  const iconComponent = (props) => {
    return (
      <ExpandMoreRoundedIcon
        className={props.className + " " + minimalSelectClasses.icon}
      />
    );
  };

  // Notifications
  const [categoryAdded, setCategoryAdded] = useState(false);
  const [categoryEditted, setCategoryEditted] = useState(false);
  const [menuAdded, setMenuAdded] = useState(false);
  const [menuEditted, setMenuEditted] = useState(false);
  const [menuRemoved, setMenuRemoved] = useState(false);
  function handlenotification() {
    if (
      categoryAdded ||
      categoryEditted ||
      menuAdded ||
      menuEditted ||
      menuRemoved
    ) {
      setCategoryAdded(false);
      setCategoryEditted(false);
      setMenuAdded(false);
      setMenuEditted(false);
      setMenuRemoved(false);
    }
  }

  // Get Inventory Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenant.tenant_id != undefined) {
        const url = localUrl + "/category/" + tenant.tenant_id;

        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setInventoryData([result.data]);
              setInventoryRetrieved(() => true);
            } else {
              setInventoryRetrieved(() => false);
            }
          });
      }
    }
    return () => {
      mounted = false;
    };
  }, [tenant, inventoryRetrieved]);

  // socket connection
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("add category", (data) => handleCategoryAdded(data));
      socket.on("add order", (data) => handleOrderAdded(data));
      socket.on("update category", (data) => handleCategoryUpdated(data));
      socket.on("delete category", (data) => handleCategoryRemoved(data));

    }
  });

  function handleCategoryAdded(user) {


    if (inventoryRetrieved) {


      let newData = inventoryData.splice();

      newData.push(user);
      setInventoryData(newData);

    }
  }

  function handleOrderAdded(){
    if (inventoryRetrieved) {

    
  
      const url = localUrl + "/category/" + tenant.tenant_id;

      fetch(url, {
        method: "GET",
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "SUCCESS") {
            setInventoryData([result.data]);
            setInventoryRetrieved(() => true);
          } else {
            setInventoryRetrieved(() => false);
          }
        });
  
    
      console.log("NEW Inventory DATA IS!!!!!!!!!: ");
  
     
      }
    
  }

  function handleCategoryUpdated(user) {


    if (inventoryRetrieved) {


      let newData = inventoryData.splice();

      newData.push(user);
      setInventoryData(newData);

    }
  }

  function handleCategoryRemoved(user) {
   

    if (inventoryRetrieved) {
     

      let newData = inventoryData.splice();

      newData.push(user);
      setInventoryData(newData);
   
    }
  }

  async function handleAddCategory(name) {
    const url = localUrl + "/category/create/" + tenant.tenant_id;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        cat_name: name,
      }),
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status !== "FAILED") {
          setCategoryAdded(true);

          setTimeout(() => {
            setCategoryAdded(false);
          }, 3000);
      
          socket.emit("add category", result.data);
          setInventoryData([result.data]);

          setAddCategoryOpen(false);
          setValidCategoryName(true);
        } else {
    
          setValidCategoryName(false);
        }
      });
  }

  async function handleEditCategory() {
    if (editcategory) {
      const url = localUrl + "/category/edit/index/" + tenant.tenant_id;

      setEditCategory(false);
      setCategoryEditted(true);
      setTimeout(() => {
        setCategoryEditted(false);
      }, 3000);

      inventoryData[0].map(async (item, index) => {
   

        await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            cat_id: item.category.id,
            cat_index: index + 1,
          }),
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
       
            socket.emit("update category", result.data);
            setInventoryData([result.data]);
          });
      });
    } else {
      setEditCategory(true);
    }
  }

  async function handleRemoveCategory(id) {
    const url = localUrl + "/category/delete/" + tenant.tenant_id + "/" + id;
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
   
        socket.emit("delete category", result.data);
        setInventoryData([result.data]);
      });

    setRemoveCategoryOpen(false);
  }

  async function handleAddItem() {
    let formData = new FormData();
    const menuUrl = imageUrl + "/menu/" + tenant.tenant_id + "/" + itemName;
    var input = document.querySelector('input[type="file"]');
    formData.append("menu", input.files[0]);

    fetch(menuUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
   
      })
      .catch((error) => {
        console.error("Error Upload Logo:", error);
      });

    const url = localUrl + "/create/" + tenant.tenant_id;

    const payload = JSON.stringify({
      cat_id: categoryID,
      menu_name: itemName,
      menu_duration: itemDuration,
      menu_desc: itemDescription,
      menu_isRecommended: itemIsRecommended,
      menu_price: itemPrice,
      menu_quantity: itemQuantity,
      menu_isAvailable: itemQuantity > 0 ? true : false,
      menu_image:
        imageUrl + "/menu/render/" + tenant.tenant_id + "/" + itemName + ".jpg",
    });
  

    fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
     
        if (result.status === "SUCCESS") {
          setMenuAdded(true);
          setTimeout(() => {
            setMenuAdded(false);
          }, 3000); //wait 5 seconds

        
          socket.emit("add category", result.data);
          setInventoryData([result.data]);
     
          setAdditemopen(false);
          setProductImage();
          setItemIsRecommended();
          setValidCategoryName(true);
        } else {
   
          setValidCategoryName(false);
        }
      });
  }

  async function handleEditItem() {
    const url = localUrl + "/edit/" + tenant.tenant_id;

    let formData = new FormData();
    const menuUrl = imageUrl + "/menu/" + tenant.tenant_id + "/" + itemName;
    var input = document.querySelector('input[type="file"]');

    if(input.files[0] != undefined){
     
      formData.append("menu", input.files[0]);
 

      fetch(menuUrl, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {

        })
        .catch((error) => {
          console.error("Error Upload Logo:", error);
        });

        const payload = JSON.stringify({
          cat_id: categoryID,
          menu_id: itemID,
          menu_name: itemName,
          menu_duration: itemDuration,
          menu_desc: itemDescription,
          menu_isRecommended: itemIsRecommended,
          menu_price: itemPrice,
          menu_quantity: itemQuantity,
          menu_isAvailable: itemQuantity > 0 ? true : false,
          menu_image:
            imageUrl + "/menu/render/" + tenant.tenant_id + "/" + itemName + ".jpg",
        });

        fetch(url, {
          method: "POST",
          body: payload,
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setMenuEditted(true);
              setTimeout(() => {
                setMenuEditted(false);
              }, 3000);
            
              socket.emit("update category", result.data);
              setInventoryData([result.data]);
         
              setEditItemOpen(false);
              setProductImage();
              setItemIsRecommended();
              setValidCategoryName(true);
            } else {
  
              setValidCategoryName(false);
            }
          });

    } else {
      const payload = JSON.stringify({
        cat_id: categoryID,
        menu_id: itemID,
        menu_name: itemName,
        menu_duration: itemDuration,
        menu_desc: itemDescription,
        menu_isRecommended: itemIsRecommended,
        menu_price: itemPrice,
        menu_quantity: itemQuantity,
        menu_isAvailable: itemQuantity > 0 ? true : false,        
      });

      fetch(url, {
        method: "POST",
        body: payload,
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "SUCCESS") {
            setMenuEditted(true);
            setTimeout(() => {
              setMenuEditted(false);
            }, 3000);
 
            socket.emit("update category", result.data);
            setInventoryData([result.data]);

            setEditItemOpen(false);
            setProductImage();
            setItemIsRecommended();
            setValidCategoryName(true);
          } else {
           
            setValidCategoryName(false);
          }
        });
    }
    

    

   

   

    
  }

  async function handleRemoveItem() {
    const url = localUrl + "/delete/" + tenant.tenant_id + "/" + itemID;
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          setMenuRemoved(true);
          setTimeout(() => {
            setMenuRemoved(false);
          }, 3000); //wait 5 seconds
          socket.emit("delete category", result.data);
          setInventoryData([result.data]);
          setEditItemOpen(false);
          setProductImage();
          setItemIsRecommended();
          setValidCategoryName(true);
        } 
      });
  }

<<<<<<< HEAD
  const categoryList = state.items;

  const onMove = handleMove;
=======
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Inventory</div>

<<<<<<< HEAD
        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
      </div>

      <div className="inventorysection">
        <Modal open={addcatopen}>
          <Box className="modalbox">
            <div className="innerbox">
              <div className="modaltitle">Category Name</div>
              <div className="modalform">
                <form onSubmit={handleSubmit}>
=======
        <TopBar />
      </div>

      {inventoryRetrieved ? (
        <div className="inventorysection">
          <Modal open={addcategoryopen}>
            <Box className="modalbox">
              <div className="innerbox">
                <div className="modaltitle">Category Name</div>
                <div className="modalform">
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                  <div className="inputlabel">Category Name</div>
                  <input
                    type="text"
                    className="inputfile"
                    onChange={(e) => {
                      setNewCategoryName(e.target.value);
                      setValidCategoryName(true);
                    }}
                  />
<<<<<<< HEAD
                </form>
              </div>

    
              <div className="modalbutton">
                <button onClick={handleAddCatclose} className="cancelbutton">
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleAddCatclose}
                  className="savebutton"
                >
                  Save Category
                </button>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal open={additemopen}>
          <Box className="productmodalbox">
            <div className="innerbox">
              <div className="modaltitle">Product add</div>
              <div className="modalform">
                <form onSubmit={handleSubmit}>
                  <div className="productinputrow">
                    <div className="productinputtext">
                      <div className="inputlabel">Product Name</div>
                      <input
                        type="text"
                        className="inputfile"
                        onChange={handleChange}
                      />
                      <div className="inputlabel">Product Category</div>
                      <div className="catselector">
                      <Select
                            defaultValue=""
                        disableUnderline
                        classes={{ root: minimalSelectClasses.select }}
                        MenuProps={menuProps}
                        IconComponent={iconComponent}
                        value={val}
                        onChange={catvalchange}
                      >
                        {items.map((post, index) => (
                          <MenuItem value={index}>{post.name}</MenuItem>
                        ))}
                      </Select>
                      </div>
                      <div className="inputlabel">Product Price</div>
                      <div class="POC" data-placeholder="Rp.">
                        <input
                          type="text"
                          className="inputpricefile"
                          onChange={handleChange}
                          data-mask="000.000.000"
                          data-mask-reverse="true"
                        />
                      </div>
                    </div>
                    <div className="productinputimage">
                      <div className="inputlabel">Product Picture</div>
                      <div className="productimagepreview">
                      <img src={productimage} className="productimage" />
                      </div>
                      <div className="imagebuttoncontainer">
                        <div className="productimagebutton">
                          <label for="file-input">
                            <img src={inputimage} />
                          </label>

                          <input
                            id="file-input"
                            type="file"
                            className="productinputfile"
                            onChange={(handleChange, imageHandler)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="inputlabel">Product Detail</div>
                  <textarea
                    type="text"
                    className="inputdetailfile"
                    onChange={handleChange}
                  />

                  <div className="recommendcontainer">
                    <div className="recommendtext">
                      Do you recommend this product?
                    </div>
                    <div className="switchbutton">
                      <Switch
                        classes={iosStyles}
                        checked={!addtoggled}
                        onChange={(e) => setAddtoggled(!e.target.checked)}
                      />
                      <img src={recommended} className="recommendimage" />
                    </div>
                  </div>
                </form>
              </div>

              <div className="modalbutton">
                <button onClick={handleAdditemclose} className="cancelbutton">
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleAdditemclose}
                  className="savebutton"
                >
                  Save Product
                </button>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal open={edititemopen} >
          <Box className="productmodalbox">
            <div className="productinnerbox">
              <div className="modaltitle">Product Edit</div>
              <div className="modalform">
                <form onSubmit={handleSubmit}>
                  <div className="productinputrow">
                    <div className="productinputtext">
                      <div className="inputlabel">Product Name</div>
                      <input
                        type="text"
                        value={A}
                        className="inputfile"
                        onChange={handleChange}
                      />
                      <div className="inputlabel">Product Category</div>
                      <div className="catselector">
                      <Select
                        disableUnderline
                        classes={{ root: minimalSelectClasses.select }}
                        MenuProps={menuProps}
                        IconComponent={iconComponent}
                        value={val}
                        onChange={catvalchange}
                      >
                        {items.map((post, index) => (
                          <MenuItem value={index}>{post.name}</MenuItem>
                        ))}
                      </Select>
                      </div>
                      <div className="inputlabel">Product Price</div>
                      <div class="POC" data-placeholder="Rp.">
                        <input
                          type="text"
                          value={B}
                          className="inputpricefile"
                          onChange={handleChange}
                          data-mask="000.000.000"
                          data-mask-reverse="true"
                        />
                      </div>
                    </div>
                    <div className="productinputimage">
                      <div className="inputlabel">Product Picture</div>
                      <div className="productimagepreview">
                      <img src={productimage} className="productimage" />
                      </div>
                      <div className="imagebuttoncontainer">
                        <div className="productimagebutton">
                          <label for="file-input">
                            <img src={inputimage} />
                          </label>

                          <input
                            id="file-input"
                            type="file"
                            className="productinputfile"
                            onChange={(handleChange, imageHandler)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="inputlabel">Product Detail</div>
                  <textarea
                    type="text"
                    className="inputdetailfile"
                    value={C}
                    onChange={handleChange}
                  />

                  <div className="recommendcontainer">
                    <div className="recommendtext">
                      Do you recommend this product?
                    </div>
                    <div className="switchbutton">
                      <Switch
                        classes={iosStyles}
                        checked={edittoggled}
                        onChange={(e) => setEdittoggled(e.target.checked)}
                      />
                      <img src={recommended} className="recommendimage" />
                    </div>
                  </div>
             
                </form>
              </div>

              <div className="modalbutton">
                <button onClick={handleEdititemclose} className="cancelbutton">
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleEdititemclose}
                  className="savebutton"
                >
                  Save Product
                </button>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal open={removecategoryopen}>
          <Box className="removecatmodalbox">
            <div className="removecatinnerbox">
              <div className="removecatheading">
                <img src={removecat} className="removecatimage" />
                <div className="removecatmodaltitle">Remove Category</div>
              </div>
              <div className="removecatmodaltext">
                Are you sure to remove the{" "}
                <span style={{ color: "#f10c0c" }}>"{catname}"</span> category
                in your menu?
              </div>

              <div className="removecatmodalbuttoncontainer">
                <div>
                  <button
                    className="modalcancelbutton"
                    onClick={handleRemoveCatClose}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    className="modalconfirmbutton"
                    onClick={() => handleRemoveCategory({ catname })}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>

        <div className="inventorycontainergrid">
          {categoryList.map((item, index) => (
            <div className="categorycontainer" key={item.id}>
              <div className="inventorycatergoryheading">
                <div className="categoryname">{item.name}</div>
                <div className="categorynumber">
                  <div className="catdown">
                    <button
                      className={
                        index - 1 > 4 ? "catdownbutton" : "catdownbuttonactive"
                      }
                      onClick={() => onMove(item.id, DOWN)}
                      //disabled={index<=1? true: false}
                    >
                      <FontAwesomeIcon icon={faAngleDown} />
                    </button>
                  </div>
                  <div className="cattext">{index + 1}</div>
                  <div className="catup">
                    <button
                      className={
                        index + 1 <= 1 ? "catupbutton" : "catupbuttonactive"
                      }
                      onClick={() => onMove(item.id, UP)}
                      //disabled={index >= 5? true : false}
                    >
                      <FontAwesomeIcon icon={faAngleUp} />
                    </button>
                  </div>
                </div>
                <div className="categoryremove">
                  <button
                    className="buttonremove"
                    onClick={() => handleRemoveCat(item.name)}
                  >
                    Remove
                  </button>
                </div>

                <div className="additem">
                  <button className="add" onClick={handleAdditemopen}>
                    Add Item
=======
                  {ValidCategoryName ? (
                    <div className="noerrormessage">&nbsp;</div>
                  ) : (
                    <div className="errormessage">
                      Category name already exists!
                    </div>
                  )}
                </div>

                <div className="modalbutton">
                  <button
                    onClick={() => {
                      setAddCategoryOpen(false);
                    }}
                    className="cancelbutton"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => handleAddCategory(newCategoryName)}
                    className="savebutton"
                  >
                    Save Category
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                  </button>
                </div>
              </div>
            </Box>
          </Modal>

<<<<<<< HEAD
              <div className="catmenucontainer">
                {item.menu.map((post, index) => (
                  <div className="detailmenucontainer">
                    <div className="catmenuimagecontainer">
                      <img
                        src={
                          require("../../icons/Gurame Asam Manis.png")
                        }
                        className="menuimage"
                      />
                    </div>
                    <div className="catmenutext">
                      <div className="catmenutitle">{post.name}</div>
                      <div className="recommended">
                        {post.recommended === true ? (
                          <img src={recommended} />
                        ) : null}
                      </div>
                      <div className="catmenuprice">
                        <NumberFormat
                          value={post.price}
                          prefix="RP. "
                          decimalSeparator="."
                          thousandSeparator=","
                          displayType="text"
=======
          <Modal open={additemopen}>
            <Box className="productmodalbox">
              <div className="innerbox">
                <div className="modaltitle">Product add</div>
                <div className="modalform">
                  <form>
                    <div className="productinputrow">
                      <div className="productinputtext">
                        <div className="inputlabel">Product Name</div>
                        <input
                          type="text"
                          className="inputfile"
                          onChange={(e) => setItemName(e.target.value)}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                        />
                        {ValidCategoryName ? (
                          <div className="noerrormessage">&nbsp;</div>
                        ) : (
                          <div className="errormessage">
                            Category name already exists!
                          </div>
                        )}
                        <div className="inputlabel">Product Category</div>
                        <div className="catselector">
                          <Select
                            defaultValue=""
                            disableUnderline
                            classes={{ root: minimalSelectClasses.select }}
                            MenuProps={menuProps}
                            IconComponent={iconComponent}
                            value={categoryID}
                            onChange={(e) => setCategoryID(e.target.value)}
                          >
                            {inventoryRetrieved == true &&
                              inventoryData.map((post) => {
                       
                                return post.map((posts, index) => {
                             
                                  return (
                                    <MenuItem value={posts.category.id}>
                                      {posts.category.name}
                                    </MenuItem>
                                  );
                                });
                              })}
                          </Select>
                        </div>
                        <div className="inputlabel">Product Cooking Time</div>
                        <div class="MPOC" data-placeholder="Minutes"></div>
                        <input
                          type="text"
                          className="inputcookingtime"
                          onChange={(e) => setItemDuration(e.target.value)}
                        />

                        <div className="inputlabel">Product Price</div>
                        <div class="POC" data-placeholder="Rp.">
                          <input
                            type="text"
                            className="inputpricefile"
                            onChange={(e) => setItemPrice(e.target.value)}
                            data-mask="000.000.000"
                            data-mask-reverse="true"
                          />
                        </div>
                      </div>
<<<<<<< HEAD
                    </div>
                    <div
                      className={
                        post.quantity <= 0
                          ? "catquanbutton"
                          : "catquanbuttonactive"
                      }
                    >
                      <div className="decrement">
                        <button
                          className={
                            post.quantity <= 0 ? "negative" : "negativeactive"
                          }
                          disabled={post.quantity <= 0? true : false}
                          onClick={handleDecrement.bind(this, item.id, post.id)}
                        >
                          -
                        </button>
                      </div>
                      <div className="quanttext">
                      <input
                    type="text"
                    value=          {post.quantity}
                    className="inputquantityfile"
                    onChange={(e)=>handlequantityvalChange(item.id, post.id, post.quantity)}
                  />
                        </div>
                      <div className="increment">
                        <button
                          className={post.quantity <= 0 ? "plus" : "plusactive"}
                          onClick={handleIncrement.bind(this, item.id, post.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="editbutton">
                      <button
                        className="edit"
                        onClick={() =>
                          handlePassInfoShow(
                            post.name,
                            post.price,
                            post.recommended,
                            post.description,
                            post.uri,
                            item.id
                          )
                        }
                      >
                        Edit Item
                      </button>
=======
                      <div className="productinputimage">
                        <div className="inputlabel">Product Picture</div>
                        <div className="productimagepreview">
                          <img src={productImage} className="productimage" />
                        </div>
                        <div className="imagebuttoncontainer">
                          <div className="productimagebutton">
                            <label for="file-input">
                              <img src={inputimage} />
                            </label>

                            <input
                              id="file-input"
                              type="file"
                              name="menu"
                              className="productinputfile"
                              onChange={(handleChange, imageHandler)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputlabel">Product Detail</div>
                    <textarea
                      type="text"
                      className="inputdetailfile"
                      onChange={(e) => setItemDescription(e.target.value)}
                    />

                    <div className="recommendcontainer">
                      <div className="recommendtext">
                        Do you recommend this product?
                      </div>
                      <div className="switchbutton">
                        <Switch
                          classes={iosStyles}
                          checked={itemIsRecommended}
                          onChange={(e) => {
                            setItemIsRecommended(e.target.checked);
                  
                          }}
                        />
                        <img src={recommended} className="recommendimage" />
                      </div>
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
                    </div>
                  </form>
                </div>

                <div className="modalbutton">
                  <button
                    onClick={() => {
                      setAdditemopen(false);
                      setProductImage();
                      setItemIsRecommended();
                    }}
                    className="cancelbutton"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => handleAddItem()}
                    className="savebutton"
                  >
                    Save Product
                  </button>
                </div>
              </div>
            </Box>
          </Modal>

          <Modal open={edititemopen}>
            <Box className="productmodalbox">
              <div className="productinnerbox">
                <div className="modaltitle">Product Edit</div>
                {ValidCategoryName ? (
                  <div className="productnoerrormessage">&nbsp;</div>
                ) : (
                  <div className="producterrormessage">
                    Menu with these details already exists!
                  </div>
                )}
                <div className="modalform">
                  <form>
                    <div className="productinputrow">
                      <div className="productinputtext">
                        <div className="inputlabel">Product Name</div>
                        <input
                          type="text"
                          value={itemName}
                          className="inputfile"
                          onChange={(e) => {
                            setItemName(e.target.value);
                            setValidCategoryName(true);
                          }}
                        />

                        <div className="inputlabel">Product Category</div>
                        <div className="catselector">
                          <Select
                            disableUnderline
                            classes={{ root: minimalSelectClasses.select }}
                            MenuProps={menuProps}
                            IconComponent={iconComponent}
                            value={categoryID}
                            onChange={(e) => setCategoryID(e.target.value)}
                          >
                            {inventoryRetrieved == true &&
                              inventoryData.map((post) => {
                                return post.map((posts, index) => {
                                  return (
                                    <MenuItem value={posts.category.id}>
                                      {" "}
                                      {posts.category.name}
                                    </MenuItem>
                                  );
                                });
                              })}
                          </Select>
                        </div>
                        <div className="inputlabel">Product Cooking Time</div>
                        <div class="MPOC" data-placeholder="Minutes"></div>
                        <input
                          type="text"
                          className="inputcookingtime"
                          value={itemDuration}
                          onChange={(e) => {
                            setItemDuration(e.target.value);
                            setValidCategoryName(true);
                          }}
                        />
                        <div className="inputlabel">Product Price</div>
                        <div class="POC" data-placeholder="Rp.">
                          <input
                            type="text"
                            value={itemPrice}
                            className="inputpricefile"
                            onChange={(e) => setItemPrice(e.target.value)}
                            data-mask="000.000.000"
                            data-mask-reverse="true"
                          />
                        </div>
                      </div>
                      <div className="productinputimage">
                        <div className="inputlabel">Product Picture</div>
                        <div className="productimagepreview">
                          <img src={productImage} className="productimage" />
                        </div>
                        <div className="imagebuttoncontainer">
                          <div className="productimagebutton">
                            <label for="file-input">
                              <img src={inputimage} />
                            </label>

                            <input
                              id="file-input"
                              type="file"
                              name="menu"
                              className="productinputfile"
                              onChange={(handleChange, imageHandler)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="inputlabel">Product Detail</div>
                    <textarea
                      type="text"
                      className="inputdetailfile"
                      value={itemDescription}
                      onChange={(e) => {
                        setItemDescription(e.target.value);
                        setValidCategoryName(true);
                      }}
                    />

                    <div className="recommendcontainer">
                      <div className="recommendtext">
                        Do you recommend this product?
                      </div>
                      <div className="switchbutton">
                        <Switch
                          classes={iosStyles}
                          checked={itemIsRecommended}
                          onChange={(e) => {
                            setItemIsRecommended(e.target.checked);
                            setValidCategoryName(true);
                          }}
                        />
                        <img src={recommended} className="recommendimage" />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="modalbutton">
                  <button
                    onClick={() => {
                      setEditItemOpen(false);
                      setProductImage();
                      setItemIsRecommended();
                    }}
                    className="cancelbutton"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => handleRemoveItem()}
                    className="removebutton"
                  >
                    Remove Product
                  </button>
                  <button
                    type="submit"
                    onClick={() => handleEditItem()}
                    className="savebutton"
                  >
                    Save Product
                  </button>
                </div>
              </div>
            </Box>
          </Modal>

          <Modal open={removecategoryopen}>
            <Box className="removecatmodalbox">
              <div className="removecatinnerbox">
                <div className="removecatheading">
                  <img src={removecat} className="removecatimage" />
                  <div className="removecatmodaltitle">Remove Category</div>
                </div>
                <div className="removecatmodaltext">
                  Are you sure to remove the{" "}
                  <span style={{ color: "#f10c0c" }}>"{categoryName}"</span>{" "}
                  category in your menu?
                </div>

                <div className="removecatmodalbuttoncontainer">
                  <div>
                    <button
                      className="modalcancelbutton"
                      onClick={() => {
                        setRemoveCategoryOpen(false);
                        setCategoryName();
                        setCategoryID();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button
                      className="modalconfirmbutton"
                      onClick={() => handleRemoveCategory(categoryID)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>

          <div className="inventoryoutercontainer">
            <div
              className={
                categoryAdded ||
                categoryEditted ||
                menuAdded ||
                menuEditted ||
                menuRemoved
                  ? "inventorynotification"
                  : "hidden"
              }
            >
              <div className="notificationtextcontainer">
                <div className="notificationtext">
                  {categoryAdded
                    ? "New Category Added "
                    : categoryEditted
                    ? "Category Saved"
                    : menuAdded
                    ? "New Menu Added"
                    : menuEditted
                    ? "Menu Edited"
                    : " Menu Removed"}{" "}
                </div>
              </div>

              <div className="notificationclose">
                <button
                  className="notifclosebutton"
                  onClick={handlenotification}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
<<<<<<< HEAD
          ))}
          
        </div>
        <div className="addbutton">
            <button className="buttonadd" type="button" onClick={handleAddCatopen}>
            + Add New Category
            </button>
          </div>
      </div>
=======

            <div className="inventorycontainergrid">
              {inventoryRetrieved == true &&
                inventoryData.map((post) => {
                  return post.map((item, index) => {
                    return (
                      <div className="categorycontainer" key={item.category.id}>
                        <div className="inventorycatergoryheading">
                          <div className="categoryname">
                            {item.category.name}
                          </div>
                          {editcategory ? (
                            <>
                              <div className="categorynumber">
                                <div className="catdown">
                                  <button
                                    className={
                                      index + 2 > inventoryData[0].length
                                        ? "catdownbutton"
                                        : "catdownbuttonactive"
                                    }
                                    onClick={() => {
                                      handleMove(item.category.id, DOWN);
                                
                                    }}
                                    //disabled={index<=1? true: false}
                                  >
                                    <FontAwesomeIcon icon={faAngleDown} />
                                  </button>
                                </div>
                                <div className="cattext">{index + 1}</div>
                                <div className="catup">
                                  <button
                                    className={
                                      index + 1 <= 1
                                        ? "catupbutton"
                                        : "catupbuttonactive"
                                    }
                                    onClick={() =>
                                      handleMove(item.category.id, UP)
                                    }
                                    //disabled={index >= 5? true : false}
                                  >
                                    <FontAwesomeIcon icon={faAngleUp} />
                                  </button>
                                </div>
                              </div>
                              <div className="categoryremove">
                                <button
                                  className="buttonremove"
                                  onClick={() => {
                                    setRemoveCategoryOpen(() => true);
                                    setCategoryName(item.category.name);
                                    setCategoryID(item.category.id);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </>
                          ) : null}

                          <div className="additem">
                            <button
                              className="add"
                              onClick={() => {
                                setAdditemopen(true);
                                setCategoryID(item.category.id);
                              }}
                            >
                              Add Item
                            </button>
                          </div>
                        </div>

                        <div className="catmenucontainer">
                          {item.category.menu.length == 0 && (
                            <div className="emptymenu"> No item</div>
                          )}
                          {item.category.menu.map((post, index) => {
                            return (
                              <div className="detailmenucontainer">
                                <div className="catmenuimagecontainer">
                                  <img
                                    src={post.menuImage + "?time" + new Date()}
                                    className="menuimage"
                                  />
                                </div>
                                <div className="catmenutext">
                                  <div className="catmenutitle">
                                    {post.name}
                                  </div>
                                  <div className="recommended">
                                    {post.isRecommended === true ? (
                                      <img src={recommended} />
                                    ) : (
                                      "null"
                                    )}
                                  </div>
                                  {post.quantity == 0 ? (
                                    <div className="soldout">Sold Out</div>
                                  ) : (
                                    <div className="catmenuprice">
                                      <NumberFormat
                                        value={post.price}
                                        prefix="Rp. "
                                        decimalSeparator="."
                                        thousandSeparator=","
                                        displayType="text"
                                      />
                                    </div>
                                  )}
                                </div>
                                <div
                                  className={
                                    post.quantity <= 0
                                      ? "catquanbutton"
                                      : "catquanbuttonactive"
                                  }
                                >
                                  <div className="decrement">
                                    <button
                                      className={
                                        post.quantity <= 0
                                          ? "negative"
                                          : "negativeactive"
                                      }
                                      disabled={
                                        post.quantity <= 0 ? true : false
                                      }
                                      onClick={handleDecrement.bind(
                                        this,
                                        item.category.id,
                                        post.id
                                      )}
                                    >
                                      <FontAwesomeIcon
                                        className={
                                          post.quantity > 0
                                            ? "cartbuttontext"
                                            : "disabledcartbuttontext"
                                        }
                                        icon={faMinus}
                                      />
                                    </button>
                                  </div>
                                  <div className="quanttext">
                                    <input
                                      defaultValue={post.quantity}
                                      type="text"
                                      className="inputquantityfile"
                                      value={post.quantity}
                                      onChange={(e) =>
                                        handlequantityvalChange(
                                          item.category.id,
                                          post.id,
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="increment">
                                    <button
                                      className={
                                        post.quantity > 0
                                          ? "plus"
                                          : "plusactive"
                                      }
                                      onClick={handleIncrement.bind(
                                        this,
                                        item.category.id,
                                        post.id
                                      )}
                                    >
                                      <FontAwesomeIcon
                                        className={
                                          post.quantity > 0
                                            ? "cartbuttontext"
                                            : "disabledcartbuttontext"
                                        }
                                        icon={faPlus}
                                      />
                                    </button>
                                  </div>
                                </div>

                                <div className="editbutton">
                                  <button
                                    className="edit"
                                    onClick={() => {
                                      setItemID(post.id);
              
                                      handlePassInfoShow(
                                        post.name,
                                        post.menuImage,
                                        item.category.id,
                                        post.duration,
                                        post.price,
                                        post.isRecommended,
                                        post.description,
                                        post.quantity
                                      );
                                    }}
                                  >
                                    Edit Item
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  });
                })}
            </div>
          </div>

          <div className="buttongrid">
            <div className="inventorybuttoncontainer"></div>
            <div className="inventorybuttoncontainer">
              <button
                className={editcategory ? "buttonaddinactive" : "buttonadd"}
                disabled={editcategory ? true : false}
                type="button"
                onClick={() => setAddCategoryOpen(true)}
              >
                + Add New Category
              </button>
              <button
                className="buttonedit"
                type="button"
                onClick={handleEditCategory}
              >
                {editcategory ? "Save Category" : "Edit Category"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ThreeDots color="#f10c0c" height={80} width={80} />
        </div>
      )}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(InventoryPage);
