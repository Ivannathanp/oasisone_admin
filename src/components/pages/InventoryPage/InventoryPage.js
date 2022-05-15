import React, { useState, useEffect } from "react";
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

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { connect } from "react-redux";
import { useMinimalSelectStyles } from "./select/index";
import TopBar from "../TopBar/TopBar";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";

const UP = -1;
const DOWN = 1;

function InventoryPage({ tenant }) {
  const localUrl = process.env.REACT_APP_MENUURL;
  const imageUrl = process.env.REACT_APP_IMAGEURL;

  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryRetrieved, setInventoryRetrieved] = useState(false);

  const [addcategoryopen, setAddCategoryOpen] = useState(false);
  const [editcategory, setEditCategory] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState();
  const [categoryName, setCategoryName] = useState();
  const [categoryID, setCategoryID] = useState();
  const [itemID, setItemID] = useState();

  const [removecategoryopen, setRemoveCategoryOpen] = useState(false);
  const [additemopen, setAdditemopen] = useState(false);

  const [itemName, setItemName] = useState();
  const [itemDuration, setItemDuration] = useState();
  const [itemDescription, setItemDescription] = useState();
  const [itemIsRecommended, setItemIsRecommended] = useState(false);
  const [itemPrice, setItemPrice] = useState();
  const [itemQuantity, setItemQuantity] = useState(0);

  const [edititemopen, setEditItemOpen] = useState(false);

  const [productImage, setProductImage] = useState();

  function handlePassInfoShow(
    name,
    menuImage,
    category,
    cookingtime,
    price,
    recommend,
    description,
  ) {
    setEditItemOpen(true);
    setItemName(name);
    setItemDuration(cookingtime);
    setItemPrice(price);
    setItemDescription(description);
    setCategoryID(category);
    setProductImage(menuImage);
    setItemIsRecommended(recommend);
  }
  const iosStyles = useIosSwitchStyles();

  function handleMove(id, direction) {
    const items = inventoryData;
    console.log("inventory", items);

    const position = items.findIndex((i) => i.category.id === id);
    console.log(position);

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

    setInventoryData(newItems);
  }

  const [itemval, setItemval] = useState([]);

  function handleIncrement(i, v) {
    {
      inventoryData.map((post, index) => {
        {
          if (post.category.id === i) {
            post.category.menu.map((posts, index) => {
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
                      console.log(result);
                    } else {
                      console.log(result);
                    }
                  });
              }
            });
          }
          setItemval({ post });
        }
      });
    }
  }

  function handleDecrement(i, v) {
    {
      inventoryData.map((post, index) => {
        {
          if (post.category.id === i) {
            post.category.menu.map((posts, index) => {
              if (posts.id === v) {
                posts.quantity = parseInt(posts.quantity) - 1;
                console.log(posts.quantity);
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
                      console.log(result);
                    } else {
                      console.log(result);
                    }
                  });
              }
            });
          }
          setItemval({ post });
        }
      });
    }
  }

  function handleChange(e) {
    setFormValues({ value: e.target.value });
  }

  function handlequantityvalChange(i, v, j) {
    {
      inventoryData.map((post, index) => {
        {
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
                      console.log(result);
                    } else {
                      console.log(result);
                    }
                  });
              }
            });
          }
          setItemval({ post });
        }
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
  function handlenotification(){
    if(categoryAdded || categoryEditted || menuAdded || menuEditted || menuRemoved){
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
              setInventoryData(() => result.data);
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

  async function handleAddCategory(name) {
    setCategoryAdded(true);
 
    setTimeout(() => {
      setCategoryAdded(false);
    }, 3000);

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
        if (result.status === "SUCCESS") {
          console.log(result);
        } else {
          console.log(result);
        }
      });

    setAddCategoryOpen(false);
  }

  async function handleEditCategory() {
    if (editcategory) {
      const url = localUrl + "/category/edit/index/" + tenant.tenant_id;

      setEditCategory(false);
      setCategoryEditted(true);
      setTimeout(() => {
        setCategoryEditted(false);
      }, 3000); 

      inventoryData.map(async (item, index) => {
        console.log(index);
        console.log(item.category.id);

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
            if (result.status === "SUCCESS") {
              console.log(result);
            } else {
              console.log(result);
            }
          });
      });
    } else {
      setEditCategory(true);
    }
  }

  async function handleRemoveCategory(id) {
    const url = localUrl + "/category/delete/" + id;
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          console.log(result);
        } else {
          console.log(result);
        }
      });

    setRemoveCategoryOpen(false);
  }

  async function handleAddItem() {
    setMenuAdded(true);
    setTimeout(() => {
      setMenuAdded(false);
    }, 3000); //wait 5 seconds

    let formData = new FormData();
    const menuUrl = imageUrl + "/menu/" + tenant.tenant_id + "/" + itemName;
    var input = document.querySelector('input[type="file"]')
    formData.append("menu", input.files[0]);


    fetch(menuUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
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
      menu_image : imageUrl + "/menu/render/" + tenant.tenant_id + "/" + itemName + ".jpg"
    });
    console.log(payload);

    fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "SUCCESS") {
          console.log(result);
        } else {
          console.log(result);
        }
      });

    setAdditemopen(false);
    setProductImage();
    setItemIsRecommended();
  }

  async function handleEditItem() {
    setMenuEditted(true);
    setTimeout(() => {
      setMenuEditted(false);
    }, 3000);

    let formData = new FormData();
    const menuUrl = imageUrl + "/menu/" + tenant.tenant_id + "/" + itemName;
    var input = document.querySelector('input[type="file"]')
    formData.append("menu", input.files[0]);


    fetch(menuUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Error Upload Logo:", error);
      });

    const url = localUrl + "/edit/" + tenant.tenant_id;
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
      menu_image : imageUrl + "/menu/render/" + tenant.tenant_id + "/" + itemName + ".jpg"
    });

    fetch(url, {
      method: "POST",
      body: payload,
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          console.log(result);
        } else {
          console.log(result);
        }
      });

    setEditItemOpen(false);
    setProductImage();
    setItemIsRecommended();
  }

  async function handleRemoveItem() {
    setMenuRemoved(true);
    setTimeout(() => {
      setMenuRemoved(false);
    }, 3000); //wait 5 seconds

    const url = localUrl + "/delete/" + itemID;
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS") {
          console.log(result);
        } else {
          console.log(result);
        }
      });

    setEditItemOpen(false);
    setProductImage();
    setItemIsRecommended();
  }

  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Inventory</div>

        <TopBar />
      </div>

{inventoryRetrieved? (  <div className="inventorysection">
        <Modal open={addcategoryopen}>
          <Box className="modalbox">
            <div className="innerbox">
              <div className="modaltitle">Category Name</div>
              <div className="modalform">
                <div className="inputlabel">Category Name</div>
                <input
                  type="text"
                  className="inputfile"
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
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
                            inventoryData.map((post, index) => (
                              <MenuItem value={post.category.id}>
                                {post.category.name}
                              </MenuItem>
                            ))}
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
                          console.log("checked", e.target.checked);
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
              <div className="modalform">
                <form>
                  <div className="productinputrow">
                    <div className="productinputtext">
                      <div className="inputlabel">Product Name</div>
                      <input
                        type="text"
                        value={itemName}
                        className="inputfile"
                        onChange={(e) => setItemName(e.target.value)}
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
                            inventoryData.map((post, index) => (
                              <MenuItem value={post.category.id}>
                                {" "}
                                {post.category.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </div>
                      <div className="inputlabel">Product Cooking Time</div>
                      <div class="MPOC" data-placeholder="Minutes"></div>
                      <input
                        type="text"
                        className="inputcookingtime"
                        value={itemDuration}
                        onChange={(e) => setItemDuration(e.target.value)}
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
                        onChange={(e) => setItemIsRecommended(e.target.checked)}
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
            className={categoryAdded || categoryEditted || menuAdded || menuEditted || menuRemoved ? "inventorynotification" : "hidden"}
          >

            <div className="notificationtextcontainer">
              <div className="notificationtext">{categoryAdded? "New Category Added " : categoryEditted? "Category Saved" : menuAdded? "New Menu Added" : menuEditted? "Menu Edited" : " Menu Removed" }   </div>
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

          <div className="inventorycontainergrid">
            {inventoryRetrieved == true &&
              inventoryData.map((item, index) => {
                return (
                  <div className="categorycontainer" key={item.category.id}>
                    <div className="inventorycatergoryheading">
                      <div className="categoryname">{item.category.name}</div>
                      {editcategory ? (
                        <>
                          <div className="categorynumber">
                            <div className="catdown">
                              <button
                                className={
                                  index + 2 > inventoryData.length
                                    ? "catdownbutton"
                                    : "catdownbuttonactive"
                                }
                                onClick={() => {
                                  handleMove(item.category.id, DOWN);
                                  console.log("item id", item.category.id);
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
                                onClick={() => handleMove(item.category.id, UP)}
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
                                src={post.menuImage}
                                className="menuimage"
                              />
                            </div>
                            <div className="catmenutext">
                              <div className="catmenutitle">{post.name}</div>
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
                                  disabled={post.quantity <= 0 ? true : false}
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
                                    post.quantity > 0 ? "plus" : "plusactive"
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
                                    post.description
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
      </div>):(
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
    
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(InventoryPage);
