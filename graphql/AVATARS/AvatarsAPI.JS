import { gql } from "@apollo/client";	

export const AVATARS = gql`	
  query {	
    All_Avatars {	
      name	
      url	
      tags 
    }	
  }	
`;