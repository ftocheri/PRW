import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import TodoScreen from './screens/TodoScreen'

const TabNav = createBottomTabNavigator(
  {
    First: {
      path: '/',
      screen: HomeScreen,
    },
    Second: {
      path:'/sent',
      screen: TodoScreen,
    },
  },
  {
    initialRouteName: 'First'
  }
);

export default createAppContainer(TabNav)