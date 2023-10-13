import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./Select.scss";

export default function Select({ value = "", onChange = () => {}, label, placeholder = label, options = [], margin = "", padding = "" }) {
  const customRenderValue = (val) => {
    if (val != null && val !== "") {
      return val;
    }
    return <div className="select-placeholder">{placeholder}</div>;
  };

  return (
    <FormControl className="mui-custom-select" sx={{ margin, padding }} fullWidth>
      <FormLabel className="mb-2">{label}</FormLabel>
      <MuiSelect value={value} displayEmpty onChange={onChange} label="" renderValue={customRenderValue}>
        {options.map((item, index) => (
          <MenuItem key={index} value={item}>
            <div className="custom-select-menu-item">{item}</div>
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
