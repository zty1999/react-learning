// import { ThemeProvider } from "styled-components";
// 使用 mui 框架，解决 pxToRem of undefined 报错  需使用 mui 提供 themeprovider
import { ThemeProvider, useTheme ,createTheme} from "@mui/material/styles";
const theme = createTheme({
  // color: {
  //   primaryColor: "#ff385c",
  //   secondaryColor: "#00848A"
  // },
  // text: {
  //   primaryColor: "#484848",
  //   secondaryColor: "#222"
  // },
  // mixin: {
  //   boxShadow: `
  //     transition: box-shadow 200ms ease;
  //     &:hover {
  //       box-shadow: 0 2px 4px rgba(0,0,0,.18);
  //     }
  //   `  
  // }
});


export default theme
