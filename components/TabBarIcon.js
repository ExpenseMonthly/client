import React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  const { Icon, name, focused } = props
  return (
    <Icon
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
