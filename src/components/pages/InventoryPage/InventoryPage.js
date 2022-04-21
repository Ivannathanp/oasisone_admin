import React, { useState } from "react";
import "../TopBar.css";
import "./InventoryPage.css";
import NumberFormat from "react-number-format";
import recommended from "../../icons/Recommend.png";
import inputimage from "../../icons/Edit Profile Pict.png";
import removecat from "../../icons/RemoveCat.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@material-ui/core/Switch";
import { useIosSwitchStyles } from "./switch/index";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import { connect } from "react-redux";
import { useMinimalSelectStyles } from "./select/index";
const UP = -1;
const DOWN = 1;

function InventoryPage({ tenant }) {
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
    {
      id: 5,
      name: "Apels",
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
     {
      id: 6,
      name: "Apels",
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
      ],
    },
    {
      id: 7,
      name: "Apels",
      menu: [
        {
          id: 1,
          name: "Sayur Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "werwrewerwerwer",
          recommended: true,
        }
      ],
    },
    {
      id: 8,
      name: "Apels",
      menu: [
        {
          id: 1,
          name: "Sayur Asam Manis",
          uri: "../../icons/Gurame Asam Manis.png",
          price: 65000,
          quantity: 10,
          description: "werwrewerwerwer",
          recommended: true,
        }
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

  const [additemopen, setAdditemopen] = useState(false);
  const handleAdditemopen = () => setAdditemopen(true);
  const handleAdditemclose = () => setAdditemopen(false);

  const [addtoggled, setAddtoggled] = useState(false);

  console.log("C s is:", C);
  const iosStyles = useIosSwitchStyles();

  console.log("Edittoggled is:", edittoggled);

  function handleMove(id, direction) {
    const { items } = state;

    const position = items.findIndex((i) => i.id === id);
    if (position < 0) {
      throw new Error("Given item not found.");
    } else if (
      (direction === UP && position === 0) ||
      (direction === DOWN && position === items.length - 1)
    ) {
      return; // canot move outside of array
    }

    const item = items[position]; // save item for later
    const newItems = items.filter((i) => i.id !== id); // remove item from array
    newItems.splice(position + direction, 0, item);

    setState({ items: newItems });
  
  }
  console.log("state",state)
  const [itemval, setItemval] = useState();
console.log("item val", itemval)

  function handleIncrement(i, v) {
    console.log("category is:", i);
    console.log("menuID is:", v);
    console.log("increment clicked");

    {
      categoryList.map((post, index) => {
        {
          if (post.id === i) {
            post.menu.map((posts, index) => {
              if (posts.id === v) {
                posts.quantity = posts.quantity + 1;
                return post;
              } else {
                return post;
              }
            });
          }

          console.log(post);
          setItemval({ post });
        }
      });
    }
  }

  function handleDecrement(i, v) {
    console.log("category is:", i);
    console.log("menuID is:", v);
    console.log("decrement clicked");

    {
      categoryList.map((post, index) => {
        {
          if (post.id === i) {
            post.menu.map((posts, index) => {
              if (posts.id === v) {
                posts.quantity = posts.quantity - 1;
                return post;
              } else {
                return post;
              }
            });
          }

          console.log(post);
          setItemval({ post });
        }
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(formValues));
  }

  function handleChange(e) {
    setFormValues({ value: e.target.value });
  }

  // function handlequantityvalChange(i,v,j){

  //   {
  //     categoryList.map((post, index) => {
  //       {
  //         if (post.id === i) {
  //           post.menu.map((posts, index) => {
  //             if (posts.id === v) {
  //               posts.quantity = j.target.value;
  //               return post;
  //             } else {
  //               return post;
  //             }
  //           });
  //         }

  //         console.log(post);
  //         //setItemval({ post });
  //       }
  //     });
  //   }
  // }

  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProductimage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  function handleRemoveCategory(e) {
    setRemoveCategoryOpen(false);
    console.log("nani", e);
  }

  //select drop down
  const minimalSelectClasses  = useMinimalSelectStyles();

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

  const catvalchange = (e) => {
    setVal(e.target.value);
  };

  const categoryList = state.items;

  const onMove = handleMove;
  
  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Inventory</div>

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
                  <div className="inputlabel">Category Name</div>
                  <input
                    type="text"
                    className="inputfile"
                    onChange={handleChange}
                  />
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

<div className="inventoryoutercontainer">  <div className="inventorycontainergrid" >
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
                  </button>
                </div>
              </div>

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
                        />
                      </div>
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
                    //onChange={(e)=>handlequantityvalChange(item.id, post.id, post.quantity)}
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
      </div>
       </div>
      

      <div className="buttongrid">
      <div className="categorycontainer"></div>
           <div className="inventorybuttoncontainer">
            <button className="buttonadd" type="button" onClick={handleAddCatopen}>
            + Add New Category
            </button>
            <button className="buttonedit" type="button" onClick={handleAddCatopen}>
           Edit Category
            </button>
          </div>
      </div>
        </div>
       
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(InventoryPage);
