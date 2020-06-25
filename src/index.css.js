import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ul{
    list-style:none;
    margin:0;
    padding:0;
    li + li {
      margin-left: ${({ theme }) => theme.spacing.xs}px;
    }
  }
`;

export default GlobalStyles;
