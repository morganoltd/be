import { gql } from "@apollo/client";	

export const PREMIUM = gql`	
  query {	
    all_Premium {	
      name	
      url	
      tags 
      format
      used
    }	
  }	
`;