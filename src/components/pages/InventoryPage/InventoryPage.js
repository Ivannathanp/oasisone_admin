import React, { useState } from "react";
import "../TopBar.css";
import "./InventoryPage.css";
import logo from "../../icons/Logo.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NumberFormat from "react-number-format";
import recommended from "../../icons/Recommend.png";
import inputimage from "../../icons/Edit Profile Pict.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Switch from "@material-ui/core/Switch";
import { useIosSwitchStyles } from "./switch/index";

import { useOutlineSelectStyles } from "./select/index";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

const UP = -1;
const DOWN = 1;

export default function FruitList() {
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
  const [formValues, setFormValues] = useState("");

  const [catopen, setCatopen] = useState(false);
  const handleCatopen = () => setCatopen(true);
  const handleCatclose = () => setCatopen(false);

  const [A, setA] = useState(null);
  const [B, setB] = useState(null);
  const [C, setC] = useState(null);
  const [val, setVal] = useState(null);

  const [edititemopen, setEdititemopen] = useState(false);
  const [edittoggled, setEdittoggled] = useState(null);
  const [productimage, setProductimage] = useState();

  function handlePassInfoShow(name, price, recommend, description, picture, category) {
    setEdititemopen(true);
    setA(name);
    setB(price);
    setC(description);
    setVal(category - 1);
    setProductimage(picture);
    setEdittoggled(recommend);
  }

  console.log("pict", productimage)

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

  const [itemval, setItemval] = useState();

  function handleIncrement(i, v) {
    console.log("i is:", i);
    console.log("v is:", v);
    console.log("decrement clicked");

    {
      fruitList.map((post, index) => {
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

    console.log("newdata is", itemval);
  }

  function handleDecrement(i, v) {
    console.log("i is:", i);
    console.log("v is:", v);
    console.log("decrement clicked");

    {
      fruitList.map((post, index) => {
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

    console.log("newdata is", itemval);
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(formValues));
  }

  function handleChange(e) {
    setFormValues({ value: e.target.value });
  }

  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProductimage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  //select drop down
  

  const outlineSelectClasses = useOutlineSelectStyles();

  // moves the menu below the select input
  const menuProps = {
    classes: {
      paper: outlineSelectClasses.paper,
      list: outlineSelectClasses.list,
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
        className={props.className + " " + outlineSelectClasses.icon}
      />
    );
  };

  const catvalchange = (e) => {
    setVal(e.target.value);
  };

  const fruitList = state.items;
  const onMove = handleMove;
  return (
    <div className="container">
      <div className="topbar">
        <div className="left">Inventory</div>

        <div className="right">
          <div className="imagecontainer">
            <img src={logo} className="image" />
          </div>
          <div className="text">Telaga Seafood</div>
        </div>
      </div>

      <div className="inventorysection">
        <Modal open={catopen} onClose={handleCatclose}>
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
                <button onClick={handleCatclose} className="cancelbutton">
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleCatclose}
                  className="savebutton"
                >
                  Save Category
                </button>
              </div>
            </div>
          </Box>
        </Modal>

        <Modal open={additemopen} onClose={handleAdditemclose}>
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
                      <Select
                        disableUnderline
                        classes={{ root: outlineSelectClasses.select }}
                        MenuProps={menuProps}
                        IconComponent={iconComponent}
                        value={val}
                        onChange={catvalchange}
                      >
                        {items.map((post, index) => (
                          <MenuItem value={index}>{post.name}</MenuItem>
                        ))}
                      </Select>
                      <div className="inputlabel">Product Price</div>
                      <input
                        type="number"
                        className="inputfile"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="productinputimage">
                      <div className="inputlabel">Product Picture</div>
                      <img src={productimage} className="productimage" />
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
                  <input
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

        <Modal open={edititemopen} onClose={handleEdititemclose}>
          <Box className="productmodalbox">
            <div className="innerbox">
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
                      <Select
                        disableUnderline
                        classes={{ root: outlineSelectClasses.select }}
                        MenuProps={menuProps}
                        IconComponent={iconComponent}
                        value={val}
                        onChange={catvalchange}
                      >
                        {items.map((post, index) => (
                          <MenuItem value={index}>{post.name}</MenuItem>
                        ))}
                      </Select>
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
                      <img src={productimage} className="productimage" />
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
                  <input
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

        <div className="inventorycontainergrid">
          {fruitList.map((item, index) => (
            <div className="categorycontainer" key={item.id}>
              <div className="inventorycatergoryheading">
                <div className="categoryname">
                  {item.name}
                </div>
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
                          require("../../icons/Gurame Asam Manis.png").default
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
                          value="121"
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
                          onClick={handleDecrement.bind(this, item.id, post.id)}
                        >
                          -
                        </button>
                      </div>
                      <div className="quanttext">{post.quantity}</div>
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
                            item.id,
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
          <div className="addbutton">
            <button className="buttonadd" type="button" onClick={handleCatopen}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
