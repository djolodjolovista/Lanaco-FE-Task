import React from 'react';
//@ts-ignore
import { ReactComponent as Invoices } from '../icons/invoices.svg';
//@ts-ignore
import { ReactComponent as Sellers } from '../icons/seller.svg';
//@ts-ignore
import { ReactComponent as Customers } from '../icons/customers.svg';
//@ts-ignore
import { ReactComponent as Add } from '../icons/add.svg';
//@ts-ignore
import { ReactComponent as Edit } from '../icons/edit.svg';
//@ts-ignore
import { ReactComponent as Delete } from '../icons/delete.svg';

const ICON_LIST = {
  invoices: Invoices,
  sellers: Sellers,
  customers: Customers,
  add: Add,
  delete: Delete,
  edit: Edit
};

export type IconKeys = keyof typeof ICON_LIST;

interface IconProps {
  icon: IconKeys;
  size?: string;
  color?: string;
  className?: string;
}

const Icon = (props: IconProps) => {
  const Component = ICON_LIST[props.icon];

  const style: React.CSSProperties = {};
  if (props.size) {
    Object.assign(style, { width: props.size, height: props.size });
  }

  if (props.color) {
    Object.assign(style, { color: props.color });
  }

  return (
    <>
      <Component className={props.className} style={style} />
    </>
  );
};

export default Icon;
