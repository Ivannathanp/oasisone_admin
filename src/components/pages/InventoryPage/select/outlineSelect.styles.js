
export default () => ({
  select: {
    display: 'flex',
    minWidth: 240,
    background: '#F8FAFB',
    borderStyle:'none',
    borderRadius: 8,
    paddingLeft: 24,
    paddingTop: 10,
    paddingBottom: 10,
    height: 10,
    marginBottom:'5%',
    boxShadow: 'none',
    "&:focus":{
      borderRadius: 8,
      background: '#F8FAFB',
    },
    '&[aria-expanded="true"]':{
      background: '#F8FAFB'
    },
    "& > div":{
      display:'inline-flex' // this shows the icon in the SelectInput but not the dropdown
    }
  },
  icon:{
    color: '#949494',
    right: 12,
    top: 10,
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  paper: {
    borderRadius: 4,
    marginTop: 8
  },
  list: {
    paddingTop:0,
    paddingBottom:0,

    background:'white',
    "& li":{
      paddingTop:12,
      paddingBottom:12,
    },
    "& li:hover":{
      background: '#c4c4c4'
    },
    "& li.Mui-selected":{
      color:'black',
      background: '#F8FAFB'
    },
    "& li.Mui-selected:hover":{
      background: '#c4c4c4'
    }
  },
  listIcon: {
    minWidth: 32,
    display: 'none' // hide the ListItemIcon in the dropdown
  }
});