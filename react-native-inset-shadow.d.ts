declare module 'react-native-inset-shadow' {
    import { ViewProps } from 'react-native';
  
    export interface InsetShadowProps extends ViewProps {
      shadowRadius?: number;
      shadowOpacity?: number;
      elevation?: number;
      containerStyle?: object;
      shadowColor?: string;
      insetColor?: string;
      borderRadius?: number;
      shadowOffset?: number;
      top?: boolean;
      bottom?: boolean;
      left?: boolean;
      right?: boolean;
    }
  
    const InsetShadow: React.FC<InsetShadowProps>;
  
    export default InsetShadow;
  }
  