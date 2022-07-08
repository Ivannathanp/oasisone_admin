import React, { useState, useEffect, useContext } from "react";
import "../TopBar/TopBar.css";
import "./InventoryPage.css";
import NumberFormat from "react-number-format";
import recommended from "../../icons/Recommend.png";
import removecat from "../../icons/RemoveCat.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faXmark,
  faMinus,
  faPlus,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@material-ui/core/Switch";
import { useIosSwitchStyles } from "./switch/index";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { connect } from "react-redux";
import { useMinimalSelectStyles } from "./select/index";
import TopBar from "../TopBar/TopBar";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";
import { debounce } from "lodash";
import Compressor from "compressorjs";

const UP = -1;
const DOWN = 1;

function InventoryPage({ tenant }) {
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

  const [removecategoryopen, setRemoveCategoryOpen] = useState(false);
  const [additemopen, setAdditemopen] = useState(false);
  const [itemName, setItemName] = useState();
  const [itemNameChanged, setItemNameChanged] = useState(false);
  const [itemDuration, setItemDuration] = useState();

  const [itemDescription, setItemDescription] = useState();

  const [itemIsRecommended, setItemIsRecommended] = useState(false);

  const [itemPrice, setItemPrice] = useState();

  const [itemQuantity, setItemQuantity] = useState(0);

  const [edititemopen, setEditItemOpen] = useState(false);
  const [edititemname, setEditItemName] = useState();

  const [productImage, setProductImage] = useState();
  const [itemval, setItemval] = useState([]);

  // Get Inventory Data

  useEffect(() => {
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
            setItemval([result.data]);
            setInventoryRetrieved(() => true);
          } else {
            setInventoryRetrieved(() => false);
          }
        });
    }
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
      setItemval(newData);
    }
  }
  function handleCategoryUpdated(user) {
    if (inventoryRetrieved) {
      let newData = inventoryData.splice();

      newData.push(user);
      setItemval(newData);
    }
  }
  function handleCategoryRemoved(user) {
    if (inventoryRetrieved) {
      let newData = inventoryData.splice();

      newData.push(user);
      setItemval(newData);
    }
  }

  function handleOrderAdded() {
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
            setItemval([result.data]);
            setInventoryRetrieved(() => true);
          } else {
            setInventoryRetrieved(() => false);
          }
        });
    }
  }

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
    setEditItemName(name);
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
      return;
    }

    const item = items[position];
    const newItems = items.filter((i) => i.category.id !== id);
    newItems.splice(position + direction, 0, item);

    setInventoryData([newItems]);
    setItemval([newItems]);
  }

  const debouncedSearch = debounce(async (i, v, posts) => {
    const url = localUrl + "/edit/" + tenant.tenant_id;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        cat_id: i,
        menu_id: v,
        menu_quantity: parseInt(posts),
      }),
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          setTimeout(() => {
            if (socket) {
              socket.emit("update category", result.data);
            }
          }, [1000]);
        }
      });
  }, 500);

  async function handleIncrement(i, v) {
    {
      inventoryData.map((item) => {
        return item.map((post, index) => {
          setItemval([item]);
          if (post.category.id === i) {
            post.category.menu.map((posts, index) => {
              if (posts.id === v) {
                posts.quantity = parseInt(posts.quantity) + 5;
                debouncedSearch(i, v, posts.quantity);
              }
            });
          }
        });
      });
    }
  }

  function handleDecrement(i, v) {
    {
      inventoryData.map((item) => {
        return item.map((post, index) => {
          if (post.category.id === i) {
            post.category.menu.map((posts, index) => {
              if (posts.id === v) {
                posts.quantity = parseInt(posts.quantity) - 5;

                if (posts.quantity <= 0) {
                  posts.quantity = 0;
                  debouncedSearch(i, v, 0);
                } else {
                  debouncedSearch(i, v, posts.quantity);
                }
              }
            });
          }
          setItemval([item]);
        });
      });
    }
  }

  function handleChange(e) {
    setFormValues({ value: e.target.value });
  }

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
                      if (socket) {
                        socket.emit("update category", result.data);
                        setInventoryData([result.data]);
                      }
                    }
                  });
              }
            });
          }
          setItemval([item]);
        });
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

  //select drop down
  const minimalSelectClasses = useMinimalSelectStyles();

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
          if (socket) {
            setCategoryAdded(true);

            setTimeout(() => {
              setCategoryAdded(false);
            }, 3000);

            socket.emit("add category", result.data);
            setInventoryData([result.data]);
            setItemval([result.data]);
            setAddCategoryOpen(false);
            setValidCategoryName(true);
          }
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
            if (socket) {
              socket.emit("update category", result.data);
              setInventoryData([result.data]);
              setItemval([result.data]);
            }
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
        if (socket) {
          socket.emit("delete category", result.data);
          setInventoryData([result.data]);
        }
      });

    setRemoveCategoryOpen(false);
  }

  async function handleAddItem() {
    const url = localUrl + "/create/" + tenant.tenant_id;
    const menuUrl = imageUrl + "/menu/" + tenant.tenant_id + "/" + itemName;
    var input = document.querySelector('input[type="file"]');
    const file = input.files[0];
    new Compressor(file, {
      quality: 0.5,

      success(result) {
        let formData = new FormData();

        formData.append("menu", result, result.name);

        fetch(menuUrl, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {})
          .catch((error) => {
            console.error("Error Upload Logo:", error);
          });
      },
    });

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
          if (socket) {
            setMenuAdded(true);
            setTimeout(() => {
              setMenuAdded(false);
            }, 3000);

            socket.emit("add category", result.data);
            setInventoryData([result.data]);
            
   
            setItemval([result.data]);
            setItemPrice();
            setAdditemopen(false);
            setProductImage();
            setItemIsRecommended();
            setValidCategoryName(true);
          }
        } else {
          setValidCategoryName(false);
        }
      });
  }

  async function handleEditItem() {
    const url = localUrl + "/edit/" + tenant.tenant_id;
    const menuUrl = imageUrl + "/menu/" + tenant.tenant_id + "/" + itemName;
    var input = document.querySelector('input[type="file"]');

    if (input.files[0] == undefined) {
      const payload = JSON.stringify({
        cat_id: categoryID,
        menu_id: itemID,
        menu_name: itemName,
        menu_image: productImage,
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
            if (socket) {
              setMenuEditted(true);
              setTimeout(() => {
                setMenuEditted(false);
              }, 3000);

              socket.emit("update category", result.data);
              setInventoryData([result.data]);
              setItemval([result.data]);
              setEditItemOpen(false);
              setProductImage();
              setItemIsRecommended();
              setValidCategoryName(true);
            }
          } else {
            setValidCategoryName(false);
          }
        });
    } else if (input.files[0] != undefined && edititemname == itemName) {
      const file = input.files[0];
      new Compressor(file, {
        quality: 0.5,

        success(result) {
          let formData = new FormData();

          formData.append("menu", result, result.name);

          fetch(menuUrl, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((result) => {})
            .catch((error) => {
              console.error("Error Upload Logo:", error);
            });
        },
      });

      const payload = JSON.stringify({
        cat_id: categoryID,
        menu_id: itemID,
        menu_duration: itemDuration,
        menu_desc: itemDescription,
        menu_isRecommended: itemIsRecommended,
        menu_price: itemPrice,
        menu_quantity: itemQuantity,
        menu_isAvailable: itemQuantity > 0 ? true : false,
        menu_image:
          imageUrl +
          "/menu/render/" +
          tenant.tenant_id +
          "/" +
          itemName +
          ".jpg",
      });

      fetch(url, {
        method: "POST",
        body: payload,
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "SUCCESS") {
            if (socket) {
              setMenuEditted(true);
              setTimeout(() => {
                setMenuEditted(false);
              }, 3000);

              socket.emit("update category", result.data);
              setInventoryData([result.data]);
              setItemval([result.data]);
              setEditItemOpen(false);
              setProductImage();
              setItemIsRecommended();
              setValidCategoryName(true);
            }
          } else {
            setValidCategoryName(false);
          }
        });
    } else if (input.files[0] != undefined && edititemname != itemName) {
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
          imageUrl +
          "/menu/render/" +
          tenant.tenant_id +
          "/" +
          itemName +
          ".jpg",
      });

      fetch(url, {
        method: "POST",
        body: payload,
        headers: { "content-type": "application/JSON" },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.status === "SUCCESS") {
            if (socket) {
              setMenuEditted(true);
              setTimeout(() => {
                setMenuEditted(false);
              }, 3000);

              socket.emit("update category", result.data);
              setInventoryData([result.data]);
              setItemval([result.data]);
              setEditItemOpen(false);
              setProductImage();
              setItemIsRecommended();
              setValidCategoryName(true);
            }
          } else {
            setValidCategoryName(false);
          }
        });

      const file = input.files[0];
      new Compressor(file, {
        quality: 0.5,

        success(result) {
          let formData = new FormData();

          formData.append("menu", result, result.name);

          fetch(menuUrl, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((result) => {})
            .catch((error) => {
              console.error("Error Upload Logo:", error);
            });
        },
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
          if (socket) {
            setMenuRemoved(true);
            setTimeout(() => {
              setMenuRemoved(false);
            }, 3000);
            socket.emit("delete category", result.data);
            setInventoryData([result.data]);
            setItemval([result.data]);
            setEditItemOpen(false);
            setProductImage();
            setItemIsRecommended();
            setItemPrice();
            setValidCategoryName(true);
          }
        }
      });
  }

  useEffect(() => {
    let found;
    if (itemNameChanged) {
      found =
        inventoryRetrieved == true &&
        inventoryData.some((post) => {
          return post.some((posts, index) => {
            return posts.category.menu.some((item) => {
              if (item.name == itemName) {
                if (item.id == itemID) {
                  setValidCategoryName(true);
                } else {
                  setValidCategoryName(false);
                }
              } else {
                setValidCategoryName(true);
              }
              return item.name == itemName;
            });
          });
        });
    }
  });

  return (
    <div className="container">
      <div className="topbar">
        <div className="left" style={{ color: tenant.profileColor }}>
          Inventory
        </div>

        <TopBar />
      </div>

      {inventoryRetrieved ? (
        <div className="inventorysection">
          <Modal open={addcategoryopen}>
            <Box className="modalbox">
              <div className="innerbox">
                <div className="modaltitle">Category Name</div>
                <div className="modalform">
                  <div className="inputlabel">Category Name</div>
                  <input
                    type="text"
                    className="inputfile"
                    onChange={(e) => {
                      setNewCategoryName(e.target.value);
                      setValidCategoryName(true);
                    }}
                  />
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
                    style={{ color: tenant.profileColor }}
                    onClick={() => {
                      setAddCategoryOpen(false);
                    }}
                    className="cancelbutton"
                  >
                    Cancel
                  </button>
                  <button
                    style={{ background: tenant.profileColor }}
                    type="submit"
                    onClick={() => handleAddCategory(newCategoryName)}
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
                  <form>
                    <div className="productinputrow">
                      <div className="productinputtext">
                        <div className="inputlabel">Product Name</div>
                        <input
                          type="text"
                          className="inputfile"
                          onChange={(e) => setItemName(e.target.value)}
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
                          type="number"
                          className="inputcookingtime"
                          onChange={(e) => setItemDuration(e.target.value)}
                        />

                        <div className="inputlabel">Product Price</div>
                        <div class="POC" data-placeholder="Rp.">
                          <NumberFormat
                            thousandsGroupStyle="thousand"
                            className="inputpricefile"
                            value={itemPrice}
                            decimalSeparator="."
                            displayType="input"
                            type="text"
                            thousandSeparator={true}
                            allowNegative={true}
                            onChange={(e) => setItemPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="productinputimage">
                        <div className="inputlabel">Product Picture</div>
                        <div className="productimagepreview">
                          <img src={productImage} className="productimage" />
                        </div>
                        <div className="imagebuttoncontainer">
                          <div
                            className="promoimagebutton"
                            style={{ background: tenant.profileColor }}
                          >
                            <label for="file-input">
                              <FontAwesomeIcon
                                icon={faPencil}
                                className="promoinput"
                              />
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
                      <div
                        className="recommendtext"
                        style={{ color: tenant.profileColor }}
                      >
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
                    </div>
                  </form>
                </div>

                <div className="modalbutton">
                  <button
                    style={{ color: tenant.profileColor }}
                    onClick={() => {
                      setAdditemopen(false);
                      setProductImage();
                      setItemIsRecommended();
                      setItemPrice();
                    }}
                    className="cancelbutton"
                  >
                    Cancel
                  </button>
                  <button
                    style={
                      itemName == "" ||
                      itemName == undefined ||
                      itemDuration == "" ||
                      itemDuration == undefined ||
                      itemDescription == "" ||
                      itemDescription == undefined ||
                      itemPrice == "" ||
                      itemPrice == undefined ||
                      productImage == undefined
                        ? { background: "#c4c4c4" }
                        : { background: tenant.profileColor }
                    }
                    disabled={
                      itemName == "" ||
                      itemName == undefined ||
                      itemDuration == "" ||
                      itemDuration == undefined ||
                      itemDescription == "" ||
                      itemDescription == undefined ||
                      itemPrice == "" ||
                      itemPrice == undefined ||
                      productImage == undefined
                        ? true
                        : false
                    }
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
                            setItemNameChanged(true);
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
                          type="number"
                          className="inputcookingtime"
                          value={itemDuration}
                          onChange={(e) => {
                            setItemDuration(e.target.value);
                            setValidCategoryName(true);
                          }}
                        />
                        <div className="inputlabel">Product Price</div>
                        <div class="POC" data-placeholder="Rp.">
                          <NumberFormat
                            thousandsGroupStyle="thousand"
                            className="inputpricefile"
                            value={itemPrice}
                            decimalSeparator="."
                            displayType="input"
                            type="text"
                            thousandSeparator={true}
                            allowNegative={true}
                            onChange={(e) => setItemPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="productinputimage">
                        <div className="inputlabel">Product Picture</div>
                        <div className="productimagepreview">
                          <img src={productImage} className="productimage" />
                        </div>
                        <div className="imagebuttoncontainer">
                          <div
                            className="promoimagebutton"
                            style={{ background: tenant.profileColor }}
                          >
                            <label for="file-input">
                              <FontAwesomeIcon
                                icon={faPencil}
                                className="promoinput"
                              />
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
                      <div
                        className="recommendtext"
                        style={{ color: tenant.profileColor }}
                      >
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
                    style={{ color: tenant.profileColor }}
                    onClick={() => {
                      setEditItemOpen(false);
                      setProductImage();
                      setItemIsRecommended();
                      setItemPrice();
                    }}
                    className="cancelbutton"
                  >
                    Cancel
                  </button>
                  <button
                    style={{ background: tenant.profileColor }}
                    type="submit"
                    onClick={() => handleRemoveItem()}
                    className="removebutton"
                  >
                    Remove Product
                  </button>
                  <button
                    disabled={ValidCategoryName ? false : true}
                    style={
                      ValidCategoryName
                        ? {
                            background: tenant.profileColor,
                          }
                        : { background: "#c4c4c4" }
                    }
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
                  <div
                    className="removecatmodaltitle"
                    style={{ color: tenant.profileColor }}
                  >
                    Remove Category
                  </div>
                </div>
                <div className="removecatmodaltext">
                  Are you sure to remove the{" "}
                  <span style={{ color: tenant.profileColor }}>
                    "{categoryName}"
                  </span>{" "}
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
                      style={{ background: tenant.profileColor }}
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

          <div
            style={{ background: tenant.profileColor }}
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
              <button className="notifclosebutton" onClick={handlenotification}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>

          <div className="inventorycontainergrid">
            <div className="innerinventorycontainergrid">
              {itemval != [] &&
                itemval.map((post) => {
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
                                    style={
                                      index + 2 > inventoryData[0].length
                                        ? null
                                        : { color: tenant.profileColor }
                                    }
                                    className={
                                      index + 2 > inventoryData[0].length
                                        ? "catdownbutton"
                                        : "catdownbuttonactive"
                                    }
                                    onClick={() => {
                                      handleMove(item.category.id, DOWN);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faAngleDown} />
                                  </button>
                                </div>
                                <div className="cattext">{index + 1}</div>
                                <div className="catup">
                                  <button
                                    style={
                                      index + 1 <= 1
                                        ? null
                                        : { color: tenant.profileColor }
                                    }
                                    className={
                                      index + 1 <= 1
                                        ? "catupbutton"
                                        : "catupbuttonactive"
                                    }
                                    onClick={() =>
                                      handleMove(item.category.id, UP)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faAngleUp} />
                                  </button>
                                </div>
                              </div>
                              <div className="categoryremove">
                                <button
                                  style={{ color: tenant.profileColor }}
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
                              style={{ color: tenant.profileColor }}
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

                        <div
                          className="catmenucontainer"
                          style={{ borderColor: tenant.profileColor }}
                        >
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
                                  style={
                                    post.quantity > 0
                                      ? { background: tenant.profileColor }
                                      : null
                                  }
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
                                        style={
                                          post.quantity > 0
                                            ? { color: tenant.profileColor }
                                            : null
                                        }
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
                                        style={
                                          post.quantity > 0
                                            ? { color: tenant.profileColor }
                                            : null
                                        }
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
                                    style={{ color: tenant.profileColor }}
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
                style={
                  editcategory ? null : { background: tenant.profileColor }
                }
                className={editcategory ? "buttonaddinactive" : "buttonadd"}
                disabled={editcategory ? true : false}
                type="button"
                onClick={() => setAddCategoryOpen(true)}
              >
                + Add New Category
              </button>
              <button
                style={{ background: tenant.profileColor }}
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
          <ThreeDots color={tenant.profileColor} height={80} width={80} />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(InventoryPage);
