import { StackNavigationOptions, StackScreenProps } from '@react-navigation/stack'

export enum StackScreen {
  HOME = 'HOME',
  DETAIL = 'DETAIL',
}

export type StackParamsList = {
  [StackScreen.HOME]: undefined;
  [StackScreen.DETAIL]: {productId: number};
};

export type StackScreenOptions = (
  props: StackScreenProps<StackParamsList>
) => StackNavigationOptions

export type StackNavigationProp<RouteName extends keyof StackParamsList> =
  StackScreenProps<StackParamsList, RouteName>
