import { gql } from "@apollo/client";	

export const IMG = gql`	
  query {	
    all_Img {	
      name	
      url	
      tags 
      format
      used
    }	
  }	
`;