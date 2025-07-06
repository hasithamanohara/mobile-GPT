import { NavigatorScreenParams } from '@react-navigation/native';

export type StudentBottomTabParamList = {
  Home: undefined;
  Course: undefined;
  GPT: undefined;
  Account: undefined;
};

export type InstructorBottomTabParamList = {
  InstructorHome: undefined;
  InstructorCourses: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  EditAccount: undefined;

  StudentMain: NavigatorScreenParams<StudentBottomTabParamList>;
  InstructorMain: NavigatorScreenParams<InstructorBottomTabParamList>;
  
  CreateCourse: undefined;
  CourseDetail: { courseId: string };
  EditCourse: { courseId: string };
  DeleteCourse: { courseId: string };
};