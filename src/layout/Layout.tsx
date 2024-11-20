import React from "react";
import { Inter } from "next/font/google";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "src/constants/theme";

const inter = Inter({
  subsets: ["latin-ext"],
});

const StyledLayoutWrapper = styled.div`
  background: #fff;
  /* background-image: radial-gradient(#ededed 2px, #ffffff 2px); */
  /* background-size: 40px 40px; */
  font-family: ${inter.style.fontFamily};
`;

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <StyledLayoutWrapper>{children}</StyledLayoutWrapper>
    </ThemeProvider>
  );
};

export default Layout;
