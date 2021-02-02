export enum NodeType {
  ACQUIRER = '8',
  BILLER   = '7',
  CUSTOMER = '1',
  GLOBAL   = '0',
  LOCATION = '3',
  MERCHANT = '2',
  PHYSICAL = '6',
  TERMINAL = '4',
  UNKNOWN  = '10',
  VENDOR   = '5'
}

export function getNodeTypeByValue ( value: string ): NodeType {
  let nodeType: NodeType;

  Object.keys ( NodeType ).map ( key => {
    if ( NodeType[ key ] === value ) {
      nodeType = NodeType[ key ];
    }
  } );

  return nodeType;
}

export function getNodeTypeNameByValue ( value: string ): string {
  let name: string;

  Object.keys ( NodeType ).map ( key => {
    if ( NodeType[ key ] === value ) {
      name = key;
    }
  } );

  return name;
}
