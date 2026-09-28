import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AddStudentScreen from '../screens/AddStudentScreen';
import EditStudentScreen from '../screens/EditStudentScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';
import StudentListScreen from '../screens/StudentListScreen';
import {colors} from '../utils/theme';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StudentList"
        screenOptions={{
          headerStyle: {backgroundColor: colors.primary},
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {fontWeight: '700'},
          contentStyle: {backgroundColor: colors.background},
        }}>
        <Stack.Screen
          name="StudentList"
          component={StudentListScreen}
          options={{title: 'Quản lý sinh viên'}}
        />
        <Stack.Screen
          name="StudentDetail"
          component={StudentDetailScreen}
          options={{title: 'Chi tiết sinh viên'}}
        />
        <Stack.Screen
          name="AddStudent"
          component={AddStudentScreen}
          options={{title: 'Thêm sinh viên'}}
        />
        <Stack.Screen
          name="EditStudent"
          component={EditStudentScreen}
          options={{title: 'Chỉnh sửa sinh viên'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
