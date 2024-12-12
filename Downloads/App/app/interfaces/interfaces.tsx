//dropdown
export interface getMapperDetailsDto{
  ufkey?:string;
  componentName?:string;
  controlName?:string;
  category?:string;
  code?:any;
  bindtranValue?:any;
} 

//group,page
export interface uf_authorizationCheckDto{
    key:string;
    nodeName?:string;
    isTable?:boolean;
    screenNames?:string;
}
  //table
export interface uf_fetchActionDetailsDto{
    key?:string;
    groupName?:string;
    controlName?:string;
  }
export interface uf_fetchRuleDetailsDto{
    key?:string;
    groupName?:string;
    controlName?:string;
  }
export interface te_refreshDto{
    key?:string;
    upId?:string;
  }
export interface api_paginationDto{
    key?:string;
    page?:number;
    count?:number;
    filterDetails?:any;
  }
export interface uf_paginationDataFilterDto{
    data?:any;
    key?:string;
  }
  //button
export interface uf_getPFDetailsDto{
  key?:string;
  groupName?:string;
  controlName?:string;
  isTable?:Boolean
}
export interface uf_initiatePfDto{
  key?:string;
}
export interface te_eventEmitterDto {
  data?:any;
  event?:string;
  url?:string;
  key?:any;
  breakPoint?:string;
  nodeId?:string;
  nodeName?:string;
  nodeType?:string;
}
export interface uf_ifoDto{
  formData?:any;
  key?:string;
  groupName?:string;
  controlName?:string;
  isTable?:Boolean
}

export interface te_updateDto{
  data?:any;
  key?:string;
  upId?:string;
  tableName?:string;
  primaryKey?:number[];
  lockDetails?:any;
  param?:string;
  url?:string;
}
//page
export interface te_peStreamDto{
    key:string;
    name:string;
    mode:string;
}

export interface te_dfDto{
    key:string;
  }

export interface TopContentProps {
    columns?: any
    filterValue?: string
    setRefetch?: any
    setFilterValue?: any
    setPage?: any
    filterColumn?: string
    setFilterColumn?: any
    paginationData?:any
    onSearch?:any
  }

export interface api_signinDto {
    client: string, 
    username: string, 
    password: string
}


