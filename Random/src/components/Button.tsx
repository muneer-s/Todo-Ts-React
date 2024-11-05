import { ReactNode } from 'react';


type Button = {
    children:ReactNode;
    className?:string;
    onClick?:()=>void;
}
const Button = ({children,className,onClick}:Button) => {
  return (
<button type='submit' className={className} onClick={onClick}>{children}</button>  )
}

export default Button

